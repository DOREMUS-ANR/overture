SELECT DISTINCT ?cityUri ?cityName (sql:BEST_LANGMATCH (?cityName, 'en, en-gb;q=0.8, fr;q=0.7, *;q=0.1', '')) as ?bestCityName
WHERE
  {
    ?cityUri ?predicate ?value.
    ?cityUri a <http://dbpedia.org/ontology/City>.
    ?value bif:contains "London".
    OPTIONAL
      {
        ?cityUri rdfs:label ?cityName
      }
  };
