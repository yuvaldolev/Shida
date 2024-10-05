import {FridaJavaType} from './frida_java_type.js';

export interface FridaJavaTypeWrapper extends FridaJavaType {
  [name: string]: any;
}
