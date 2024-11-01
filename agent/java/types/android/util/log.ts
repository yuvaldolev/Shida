import {FridaJavaMethod} from '../../frida_java_method.js';
import {FridaJavaType} from '../../frida_java_type.js';
import {Throwable} from '../../java/index.js';

export interface LogType extends FridaJavaType {
  getStackTraceString(tr: Throwable): string;
  println_native: FridaJavaMethod<[number, number, string, string], number>,
}
