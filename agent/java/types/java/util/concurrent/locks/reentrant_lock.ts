import * as lang from '../../../lang/index.js';

export interface ReentrantLock extends lang.Object {
  lock(): void;
  unlock(): void;
}
