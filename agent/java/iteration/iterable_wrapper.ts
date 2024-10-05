import * as types from '../types/index.js';

import {IteratorWrapper} from './iterator_wrapper.js';

export class IterableWrapper implements Iterable<Java.Wrapper> {
  private javaIterable: types.Iterable;
  private clazz: Java.Wrapper;

  static from(javaIterable: types.Iterable, clazz: Java.Wrapper):
      IterableWrapper {
    return new IterableWrapper(javaIterable, clazz);
  }

  [Symbol.iterator](): IteratorWrapper {
    return new IteratorWrapper(this.javaIterable.iterator(), this.clazz);
  }

  forEach(callback: (item: Java.Wrapper) => void) {
    for (const item of this) {
      callback(item);
    }
  }

  private constructor(javaIterable: types.Iterable, clazz: Java.Wrapper) {
    this.javaIterable = javaIterable;
    this.clazz = clazz;
  }
}
