import {JavaField} from './java_field.js';

export type JavaClass = {
  getDeclaredField: (name: string) => JavaField;
};
