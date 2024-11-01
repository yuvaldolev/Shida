import {ClassRetriever} from '../class_retriever.js';
import * as types from '../types/index.js';

export class Backtracer {
  private readonly logClass: types.LogType;
  private readonly exceptionClass: types.FridaJavaType<types.Throwable>;

  constructor() {
    const classRetriever = new ClassRetriever();

    this.logClass = classRetriever.retrieve('android.util.Log');
    this.exceptionClass = classRetriever.retrieve('java.lang.Exception');
  }

  getBacktrace(): string {
    const backtrace =
        this.logClass.getStackTraceString(this.exceptionClass.$new());
    const lines = backtrace.split('\n');
    lines.splice(0, 1);

    return lines.join('\n');
  }
}
