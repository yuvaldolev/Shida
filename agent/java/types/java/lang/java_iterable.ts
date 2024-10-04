import {JavaIterator} from '../util/java_iterator.js';

export interface JavaIterable {
  iterator(): JavaIterator;
}
