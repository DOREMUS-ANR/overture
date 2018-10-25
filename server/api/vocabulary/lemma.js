import acceptLanguage from 'accept-language-parser';
import stringSim from 'similarity';

function move(array, oldIndex, newIndex) {
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function asArray(input) {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  return [input];
}

const DEFAULT_OPTIONS = {
  unique: true,
  includesUntagged: false,
};

function computeSimilarityScore(l, q, accepted, autocomplete, lowerBound) {
  let value = l['@value'] || l;
  if (!value || typeof value !== 'string') return 0;
  value = value.toLowerCase();
  if (autocomplete && !value.includes(q)) return 0;

  const curlang = l['@language'];
  let langQuality = accepted ? 0.6 : 1; // untagged values
  if (accepted && curlang) {
    langQuality = accepted.filter(a => a.code.startsWith(curlang))
      .map(a => a.quality)[0] || lowerBound;
  }

  const score = stringSim(q, value);
  const startQual = value.startsWith(q) ? 1 : 0.7;
  return score * langQuality * startQual;
}

export default class Lemma {
  constructor(data, score) {
    this.data = data;
    this.prefLabel = asArray(data.prefLabel);
    this.altLabel = asArray(data.altLabel);
    this.id = data['@id'];
    this.score = score;

    if (this.data.exactMatch && Array.isArray(this.data.exactMatch)) {
      this.data.exactMatch.forEach((x) => {
        this.prefLabel.push(...asArray(x.prefLabel));
        this.altLabel.push(...asArray(x.altLabel));
      });
    }

    this.labels = this.prefLabel.concat(this.altLabel);
    this.untagged = this.labels.filter(x => !x['@language']);
  }


  flatten(lang = 'en') {
    const l = {
      id: this.id,
      label: this.pickBestLang(lang, {
        unique: true,
      }),
      confidence: this.score,
    };
    return l;
  }

  pickBestLang(accepted, options = {}, array = null) {
    const opt = Object.assign(options, DEFAULT_OPTIONS);
    const list = array || this.prefLabel;
    if (!list || !list.length) return opt.unique ? null : [];
    let label;

    if (list.length === 1) {
      label = list[0]['@value'] || list[0];
      return opt.unique ? label : [label];
    }

    const first = accepted.substring(0, 2);

    let available = list.map(x => x['@language'])
      .filter(x => x);

    if (available.includes('en')) {
      available = move(available, available.indexOf('en'), 0);
    }

    const best = acceptLanguage.pick(available, accepted, {
      loose: true,
    });

    const pickUntagged = available.includes(null) &&
      (!best || (!best.startsWith(first) && !best.startsWith('en')));

    if (pickUntagged) label = this.untagged;
    else {
      label = list.filter(x => x['@language'] === best);
      if (opt.includesUntagged) label = label.concat(this.untagged);
    }
    if (!label.length) {
      // prefer latin transliterations
      label = list.filter(x => x['@language'] &&
        x['@language'].toLowerCase().endsWith('latn'));
    }
    if (!label.length) label = [list[0]];

    label = label.map(l => l['@value'] || l);

    return opt.unique ? label[0] : label;
  }

  similarTo(q, lang, autocomplete = false) {
    q = q.toLowerCase();
    let lowerBound = 0.2;
    let accepted;
    if (lang) {
      accepted = acceptLanguage.parse(lang);
      lowerBound = Math.min(accepted.map(a => a.quality)) > 0.3 ? 0.2 : 0.05;
    }
    const scores = this.prefLabel
      .map(l => computeSimilarityScore(l, q, accepted, autocomplete, lowerBound));

    const altScores = this.altLabel
      .map(l => computeSimilarityScore(l, q, accepted, autocomplete, lowerBound))
      .map(l => l * 0.7);

    return Math.max(...scores.concat(altScores));
  }
}
