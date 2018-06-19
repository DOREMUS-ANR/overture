Philharmonie Live API
=====================

Retrieve recommendation on a pool of Video Concert from Philharmonie de Paris, on the base of a seed (concert or work). It works on the `http://data.doremus.org/philharmonie` graph on the [DOREMUS Triplestore](http://data.doremus.org/sparql).
The output are the suggested tracks for the given seed.

**`GET`** http://overture.doremus.org/api/pplive/:seedType/:seedId

###### URI Parameters

| name     | range           | description       |
|----------|-----------------|-------------------|
|`seedType`| [work, concert] | The type of seed. _work_ pick `F22_Self-Contained_Expression`, _concert_ `F31_Performance` |
|`seedId`| int | The id of the seed, that should be linked through `dct:identifier` to a resource of the correct type (Philharmonie ID). |



###### Query Parameters

| name     | range           | description       |
|----------|-----------------|-------------------|
| `n`      | int, default: 5 | Number of recommendation to retrieve for each type. |

###### Output


```
{
"seed": "http://data.doremus.org/expression/9dade3d9-a4b3-3d18-bfd5-6bdc8686237a",
"results": [
    {
    "match": "similar",
    "item": [
        {
        "work": "http://data.doremus.org/expression/c04dbd4c-34a9-326d-8dad-aa961195f451",
        "score": 0.9861464513985257,
        "@type": "VideoObject",
        "id": "1035082",
        "doremus_uri": "http://data.doremus.org/manifestation/c2f77921-8c50-3ed8-8984-6a97f458e488"
        },
         ...
    ]
]
```

- `seed` is the DOREMUS id corresponding of the given seed
- `results` packs 6 different `match`-groups of recommendation:
  - `genre`, `period`, `composer`, `casting` focus on similarity on a single dimension (euclidean in the embeddings space);
  - `similar` rank over similarity on all dimensions (DOREMUS algorithm);
  - `surprise` is the reverse ranking of `similar`.
- `items` contains a number `n` or recommendation, of which is given:
  - `work`, DOREMUS id of the work (F22);
  - `score`, similarity between 0 and 1;
  - `@type`, always `VideoObject`;
  - `id` Philharmonie id of the track;
  - `doremus_uri` DOREMUS id of the track.

**Examples**
- http://overture.doremus.org/api/pplive/concert/0907954?n=3
- http://overture.doremus.org/api/pplive/work/0757511?n=3
