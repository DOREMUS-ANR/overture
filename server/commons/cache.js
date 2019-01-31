import NodeCache from 'node-cache';

export default class Cache {
  constructor() {
    let cacheOpt = {};
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
      this.cache.get(key);
  }

  set(api, params, value) {
    if (value && !params.nocache) {
      let key = api + '?' + JSON.stringify(params);
      this.cache.set(key, value);
    }
    return value;
  }
}
