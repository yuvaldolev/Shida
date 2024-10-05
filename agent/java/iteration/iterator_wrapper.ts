import {TypeCaster} from '../type_caster.js';
import * as types from '../types/index.js';

export class IteratorWrapper<T extends types.Object> implements Iterator<T> {
  private typeCaster: TypeCaster = new TypeCaster();
  private javaIterator: types.Iterator;
  private clazz: types.Type;

  constructor(javaIterator: types.Iterator, clazz: types.Type) {
    this.javaIterator = javaIterator;
    this.clazz = clazz;
  }

  next(): IteratorResult<T> {
    if (!this.javaIterator.hasNext()) {
      return {
        done: true,
        value: null,
      };
    }

    return {
      done: false,
      value: this.typeCaster.cast<T>(this.javaIterator.next(), this.clazz),
    };
  }
}
