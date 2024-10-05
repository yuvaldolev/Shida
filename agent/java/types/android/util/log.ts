import {Throwable} from '../../java/index.js';
import {Type} from '../../type.js';

export interface LogType extends Type {
  getStackTraceString(tr: Throwable): string;
}
