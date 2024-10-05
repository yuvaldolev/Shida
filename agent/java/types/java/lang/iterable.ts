import * as util from '../util/index.js';

export interface Iterable {
  iterator(): util.Iterator;
}
