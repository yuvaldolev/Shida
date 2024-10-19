import * as types from './types/index.js';

export class ClassRetriever {
  retrieve<T = types.FridaJavaType>(name: string): T {
    return Java.use(name) as unknown as T;
  }
}
