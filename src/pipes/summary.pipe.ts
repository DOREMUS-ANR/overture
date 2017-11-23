import { PipeTransform, Pipe } from '@angular/core';
import * as moment from 'moment';

// Entity to summary for visualisation

@Pipe({ name: 'summary' })
export class SummaryPipe implements PipeTransform {
  transform(value, eclass: string): any {
    if (!value) return null;
    let date;
    switch (eclass) {
      case 'expression':
      case 'MusicComposition':
        let id = value.id || value['@id'].replace('http://data.doremus.org/expression/', '')

        let author = value.composer || value.author;
        if (author['@type'] == 'Role') author = author.composer || author.author;
        if (author.name) author = author.name;
        if (author['@value']) author = author['@value'];

        date = value.dateCreated ? value.dateCreated + ', ' : '';

        return {
          id,
          link: ['/expression', id],
          title: value.title || value.name,
          super: date + author,
          small: value.alternativeHeadline,
          image: value.image,
          source: value.sourceOrganization
        }
      case 'event':
      case 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation':
      case 'http://erlangen-crm.org/efrbroo/F31_Performance':
      case 'MusicEvent':
        let perf = value.performer;
        if (perf && !Array.isArray(perf)) perf = [perf];

        if (value.time)
          date = moment(value.time).year();
        if (value.startDate)
          date = value.startDate;

        date = date ? date + ', ' : '';

        return {
          super: date + (value.place || value.placeURI || ''),
          title: value.title || (value.activities ? toActorList(value.activities || perf) : 'Performance'),
          image: 'static/img/performance_placeholder.png'
        }
      case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
        return {
          super: `${value.time ? moment(value.time).year() : ''}${separator(value)}${value.place || value.placeURI || ''}`,
          title: value.title || (value.activities ? toActorList(value.activities || perf) : 'Publication')
        }
    }
  }
}

function separator(value) {
  return value.time && value.placeURI ? ', ' : '';
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
