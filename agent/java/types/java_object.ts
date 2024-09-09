import {JavaClass} from './java_class.js';

export type JavaObject = {
  getClass: () => JavaClass;
};
