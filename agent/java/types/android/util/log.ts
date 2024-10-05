import {FridaJavaType} from '../../frida_java_type.js';
import {Throwable} from '../../java/index.js';

export interface LogType extends FridaJavaType {
  getStackTraceString(tr: Throwable): string;
}
