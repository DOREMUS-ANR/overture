export class State {
  modified: boolean = false;
  loaded: boolean = false;
  explain: boolean;
  flat: boolean;

  seed: string;
  trash: string[] = [];
  rec: string[] = [];

  constructor(seed: string, explain = false, flat = false) {
    this.seed = seed;
    this.explain = explain;
    this.flat = flat;
  }

  static from(obj: any): State {
    let s = new State(obj.seed, obj.explain, obj.flat)
    s.trash = obj.trash;
    s.rec = obj.rec;
    s.modified = obj.modified;

    s.loaded = true;
    return s;
  }

}
