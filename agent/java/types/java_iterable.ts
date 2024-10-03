import {JavaIterator} from './java_iterator.js';

export type JavaIterable = {
  iterator: () => JavaIterator;
};
