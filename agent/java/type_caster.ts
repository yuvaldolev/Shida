import * as types from './types/index.js';

export class TypeCaster {
  cast<T extends types.Object>(object: any, clazz: types.Type): T {
    return Java.cast(object, clazz as unknown as Java.Wrapper) as unknown as T;
  }
}
