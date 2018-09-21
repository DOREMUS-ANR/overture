import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

// Entity to summary for visualisation

@Pipe({ name: 'summary' })
export class SummaryPipe implements PipeTransform {
  transform(value, eclass: string): any {
    if (!value) return null;
    var date, id;
    switch (eclass) {
      case 'expression':
      case 'MusicComposition':
        id = value.id || value['@id'].replace('http://data.doremus.org/expression/', '')

        let author = value.composer || value.author;
        if (author['@type'] == 'Role') author = author.composer || author.author;
        let image = value.image || author.image || author.pic;
        if (author.name) author = author.name;
        if (author.label) author = author.label;
        date = value.dateCreated ? value.dateCreated + ', ' : '';

        return {
          id,
          link: ['/expression', id],
          title: extractValue(value.title || value.name),
          super: date + extractValue(author),
          small: value.alternativeHeadline,
          image,
          source: value.sourceOrganization
        }
      case 'event':
      case 'MusicEvent':
        id = value['@id'].replace('http://data.doremus.org/performance/', '')

        let perf = value.performer;
        if (perf && !Array.isArray(perf)) perf = [perf];

        if (value.startDate) date = value.startDate;

        let _super = [];
        if (date) _super.push(date)
        let _loc = value.location && value.location.name;
        if (_loc) _super.push(_loc['@value'] || _loc)

        let title = value.name;
        if (!title) {
          title = 'Performance'
          if (value.activities) title += ' by ' + toActorList(value.activities)
          else if (value.actorName) title += ' by ' + value.actorName
        }

        return {
          super: _super.join(', '),
          title,
          link: ['/performance', id],
          image: 'static/img/performance_placeholder.png',
          tag: value.firstPerformance ? 'premiere' : null
        }
      case 'PublicationEvent':
        id = value['@id'].replace('http://data.doremus.org/publication/', '')

        return {
          link: ['/publication', id],
          super: `${value.date ? moment(value.date).year() : ''}${separator(value)}${(value.location && value.location.name) || ''}`,
          title: value.name || value.description || 'Publication',
          tag: value.firstPublication ? 'princeps publication' : null
        }
      default:
        console.log("I should not arrive here.", eclass, value)
    }
  }
}

function separator(value) {
  return value.time && value.placeURI ? ', ' : '';
}

function extractValue(input) {
  if (!input || !input['@value']) return input;
  return input['@value'];
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
