import {JavaObject} from '../java_object';

export interface AccessibleObject extends JavaObject {
  isAccessible(): boolean;
  setAccessible(flag: boolean): void;
}
