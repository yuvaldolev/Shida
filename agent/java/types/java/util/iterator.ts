import * as lang from '../lang/index.js';

export interface Iterator extends lang.Object {
  hasNext(): boolean;
  next(): lang.Object;
}
