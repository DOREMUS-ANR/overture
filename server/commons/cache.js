import NodeCache from 'node-cache';

export default class Cache {
  constructor() {
    this.cache = new NodeCache();
  }

  get(api, params) {
    return new Promise((resolve, reject) => {
      let key = api + '?' + JSON.stringify(params);
      this.cache.get(key, (err, data) => {
        return (err || !data) ? reject() : resolve(data);
      });
    });
  }

  set(api, params, value) {
    return new Promise((resolve) => {
      let key = api + '?' + JSON.stringify(params);
      this.cache.set(key, value, () => resolve(value));
    });
  }
}
