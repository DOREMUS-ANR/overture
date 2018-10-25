API documentation
==================

## Vocabulary

`api/vocabulary/:voc_name`

**URI parameters**
- `voc_name` The name of the target vocabulary (i.e. `key` for http://data.doremus.org/vocabulary/key). The names `genre` and `mop` target the whole family of interlinked vocabularies of genres and mop. See the [vocabularies list](http://data.doremus.org/vocabularies/).

**Query parameters**
- `lang` Set the language preference through the [Accept-Language standard](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4). i.e. `en;q=1, it;q=0.7 *;q=0.1`
- `format` Output format among `json` (default) and `json-ld`.
- `q` Search for a particular string. The results are ordered according to a similarity measure based on the Levenshtein distance. The search is multi-language. In case `lang` is set, the specified language are prioritized in the measure.
- `autocomplete` The search accept only labels that includes the `q` value. The goal is not to find the best matches, but to give good suggestions to the user.

**Examples**

- http://overture.doremus.org/api/vocabulary/key
- http://overture.doremus.org/api/vocabulary/key&format=json-ld
- http://overture.doremus.org/api/vocabulary/mop?q=piano
- http://overture.doremus.org/api/vocabulary/mop?q=piano&autocomplete
- http://overture.doremus.org/api/vocabulary/mop?q=sopvano&lang=it
