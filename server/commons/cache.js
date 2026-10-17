import NodeCache from 'node-cache';

export default class Cache {
  constructor() {
    let cacheOpt = {
      stdTTL: 3600,
      checkperiod: 600
    };
    if (process.env.NODE_ENV === 'development') {
      cacheOpt = {
        stdTTL: 100,
        checkperiod: 120
      };
    }
    this.cache = new NodeCache(cacheOpt);
  }

  get(api, params) {
    let key = api + '?' + JSON.stringify(params);
    return this.cache.get(key);
  }

  set(api, params, value) {
    if (value && !params.nocache) {
      let key = api + '?' + JSON.stringify(params);
      this.cache.set(key, value);
    }
    return value;
  }
}
