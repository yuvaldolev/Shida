import {JavaObject} from './java_object.js';

export type JavaField = {
  get: (obj: JavaObject) => JavaObject; getName: () => string;
  isAccessible: () => boolean;
  setAccessible: (flag: boolean) => void;
};
