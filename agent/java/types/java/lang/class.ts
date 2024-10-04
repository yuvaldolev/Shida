import {JavaObject} from './java_object.js';
import {Field, Method} from './reflect/index.js';

export interface Class extends JavaObject {
  getDeclaredField(name: string): Field;
  getDeclaredFields(): Field[];
  getDeclaredMethods(): Method[];
  getSimpleName(): string;
  getSuperclass(): Class;
}
