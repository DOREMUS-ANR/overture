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
    return new Promise(resolve => {
      let key = api + '?' + JSON.stringify(params);
      this.cache.get(key, (err, data) => {
        resolve(data);
      });
    });
  }

  set(api, params, value) {
    if (params.nocache) return Promise.resolve(value);
    return new Promise((resolve) => {
      let key = api + '?' + JSON.stringify(params);
      this.cache.set(key, value, () => resolve(value));
    });
  }
}
