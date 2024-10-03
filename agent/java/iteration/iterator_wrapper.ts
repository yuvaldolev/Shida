import {JavaIterator} from '../types/index.js';

export class IteratorWrapper implements Iterator<Java.Wrapper> {
  private javaIterator: JavaIterator;
  private clazz: Java.Wrapper;

  constructor(javaIterator: JavaIterator, clazz: Java.Wrapper) {
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
