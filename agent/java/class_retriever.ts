import * as types from './types/index.js';

export class ClassRetriever {
  retrieve<T extends types.Type = types.Type>(name: string): T {
    return Java.use(name) as unknown as T;
  }
}
