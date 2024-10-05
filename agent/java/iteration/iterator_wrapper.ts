import * as types from '../types/index.js';

export class IteratorWrapper implements Iterator<Java.Wrapper> {
  private javaIterator: types.Iterator;
  private clazz: Java.Wrapper;

  constructor(javaIterator: types.Iterator, clazz: Java.Wrapper) {
    this.javaIterator = javaIterator;
    this.clazz = clazz;
  }

  next(): IteratorResult<Java.Wrapper> {
    if (!this.javaIterator.hasNext()) {
      return {
        done: true,
        value: null,
      };
    }

    return {
      done: false,
      value: Java.cast(this.javaIterator.next(), this.clazz),
    };
  }
}
