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
        let image = value.image || author.image;
        if (author['@type'] == 'Role') author = author.composer || author.author;
        if (author.name) author = author.name;
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
      case 'http://data.doremus.org/ontology#M42_Performed_Expression_Creation':
      case 'http://erlangen-crm.org/efrbroo/F31_Performance':
      case 'MusicEvent':
        let perf = value.performer;
        if (perf && !Array.isArray(perf)) perf = [perf];

        if (value.time) date = moment(value.time).year();
        if (value.startDate) date = value.startDate;

        let _super =  [];
        if (date) _super.push(date)
        if(value.place || value.placeURI)
          _super.push(value.place || value.placeURI)

        let title = value.title;
        if (!title) {
          title = 'Performance'
          if (value.activities) title += ' by ' + toActorList(value.activities)
          else if(value.actorName)  title += ' by ' + value.actorName
        }


        return {
          super: _super.join(', '),
          title: title,
          image: 'static/img/performance_placeholder.png',
          tag: value.isPremiere ? 'premiere' : null
        }
      case 'http://erlangen-crm.org/efrbroo/F30_Publication_Event':
        return {
          super: `${value.time ? moment(value.time).year() : ''}${separator(value)}${value.place || value.placeURI || ''}`,
          title: value.title || (value.activities ? toActorList(value.activities || perf) : 'Publication'),
          tag: value.isPrincepsPub ? 'princeps publication' : null
        }
    }
  }
}

function separator(value) {
  return value.time && value.placeURI ? ', ' : '';
}

function extractValue(input){
  if(!input || !input['@value']) return input;
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
