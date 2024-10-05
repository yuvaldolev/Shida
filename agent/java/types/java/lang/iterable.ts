import * as util from '../util/index.js';

import * as object from './object.js';

export interface Iterable extends object.Object {
  iterator(): util.Iterator;
}
