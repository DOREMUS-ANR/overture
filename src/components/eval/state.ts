export class State {
  modified: boolean = false;
  loaded: boolean = false;

  seed: string;
  trash: string[] = [];
  rec: string[] = [];

  constructor(seed: string) {
    this.seed = seed;
  }

  static from(obj: any): State {
    let s = new State(obj.seed)
    s.trash = obj.trash;
    s.rec = obj.rec;
    s.modified = obj.modified;

    s.loaded = true;
    return s;
  }

}
