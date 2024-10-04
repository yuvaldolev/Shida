import {Type} from './types/index';

export class ClassRetriever {
  retrieve<T extends Type = Type>(name: string): T {
    return Java.use(name) as unknown as T;
  }
}
