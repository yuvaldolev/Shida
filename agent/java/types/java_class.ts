import {JavaField} from './java_field.js';
import {JavaMethod} from './java_method.js';

export type JavaClass = {
  getDeclaredField: (name: string) => JavaField;
  getDeclaredFields: () => JavaField[];
  getDeclaredMethods: () => JavaMethod[];
  getSimpleName: () => string;
};
