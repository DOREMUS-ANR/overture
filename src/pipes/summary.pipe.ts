import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

// Entity to summary for visualisation

@Pipe({ name: 'summary' })
export class SummaryPipe implements PipeTransform {
  transform(value, eclass: string): any {
    if(!value) return null;

    switch (eclass) {
      case 'expression':
      case 'MusicComposition':
        let id = value.id || value['@id'].replace('http://data.doremus.org/expression/', '')

        let author = value.composer || value.author;
        if (author['@type'] == 'Role') author = author.composer || author.author;
        if (author.name) author = author.name;
        if (author['@value']) author = author['@value'];

        return {
          id,
          link: ['/expression', id],
          title: value.title || value.name,
          super: author,
          small: value.alternativeHeadline,
          image: value.image
        }
      case 'event':
      case 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation':
      case 'http://erlangen-crm.org/efrbroo/F31_Performance':
      case 'MusicEvent':
        let perf = value.performer;
        if (perf && !Array.isArray(perf)) perf = [perf];

        return {
          super: `${value.time ? moment(value.time).year() : ''}${separator(value)}${toActorList(value.activities || perf)}`,
          title: value.place ? `Performance at ${value.place}` : 'Performance'
        }
      case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
        return {
          super: `${value.time ? moment(value.time).year() : ''}${separator(value)}${toActorList(value.activities)}`,
          title: value.place ? `Publication at ${value.place}` : 'Publication'
        }

    }

  }
}

function separator(value) {
  return value.time && value.activities ? ', ' : '';
}
function toActorList(activities = []) {
  return activities.map(a => {
    let p = a && a.actor;
    if (a['@type'] == 'Role') {
      p = a.performer.name;
      if (a.roleName) p += ` (${a.roleName})`
    }
    return p;
  }).join(', ');
}
