import {JavaIterable} from '../types/index.js';

import {IteratorWrapper} from './iterator_wrapper.js';

export class IterableWrapper implements Iterable<Java.Wrapper> {
  private javaIterable: JavaIterable;
  private clazz: Java.Wrapper;

  static from(javaIterable: JavaIterable, clazz: Java.Wrapper):
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

  private constructor(javaIterable: JavaIterable, clazz: Java.Wrapper) {
    this.javaIterable = javaIterable;
    this.clazz = clazz;
  }
}
