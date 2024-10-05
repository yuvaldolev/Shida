import * as lang from '../lang/index.js';

export interface Iterator {
  hasNext(): boolean;
  next(): lang.Object;
}
