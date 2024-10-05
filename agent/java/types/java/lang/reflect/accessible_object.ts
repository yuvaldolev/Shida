import * as object from '../object.js';

export interface AccessibleObject extends object.Object {
  isAccessible(): boolean;
  setAccessible(flag: boolean): void;
}
