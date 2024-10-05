import * as types from '../types/index.js';

import {IteratorWrapper} from './iterator_wrapper.js';

export class IterableWrapper<T extends types.Object> implements Iterable<T> {
  private javaIterable: types.Iterable;
  private clazz: types.Type;

  static from<T extends types.Object>(
      javaIterable: types.Iterable, clazz: types.Type): IterableWrapper<T> {
    return new IterableWrapper<T>(javaIterable, clazz);
  }

  [Symbol.iterator](): IteratorWrapper<T> {
    return new IteratorWrapper<T>(this.javaIterable.iterator(), this.clazz);
  }

  forEach(callback: (item: T) => void) {
    for (const item of this) {
      callback(item);
    }
  }

  private constructor(javaIterable: types.Iterable, clazz: types.Type) {
    this.javaIterable = javaIterable;
    this.clazz = clazz;
  }
}
