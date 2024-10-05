import * as object from './object.js';
import {Field, Method} from './reflect/index.js';

export interface Class extends object.Object {
  getDeclaredField(name: string): Field;
  getDeclaredFields(): Field[];
  getDeclaredMethods(): Method[];
  getSimpleName(): string;
  getSuperclass(): Class;
}
