import * as types from './types/index.js';

export class ClassRetriever {
  retrieve<T extends types.FridaJavaType = types.FridaJavaType>(name: string): T {
    return Java.use(name) as unknown as T;
  }
}
