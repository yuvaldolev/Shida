import {ClassRetriever} from './class_retriever.js';
import * as types from './types/index.js';

export class Tracer {
  private readonly classRetriever = new ClassRetriever();
  private readonly logClass: types.LogType;
  private readonly exceptionClass: types.Type;

  constructor() {
    this.logClass = this.classRetriever.retrieve('android.util.Log');
    this.exceptionClass = this.classRetriever.retrieve('java.lang.Exception')
  }

  traceMethod(
      clazz: types.Type, method: Java.MethodDispatcher, backtrace: boolean,
      onStartTracing: (overload: Java.Method) => void,
      onErrorTracing: (overload: Java.Method, error: any) => void,
      onTrace: (trace: string) => void): void {
    method.overloads.forEach(
        (overload: Java.Method) => this.traceMethodOverload(
            clazz, method, overload, backtrace, onStartTracing, onErrorTracing,
            onTrace));
  }

  private traceMethodOverload(
      clazz: types.Type, method: Java.MethodDispatcher, overload: Java.Method,
      backtrace: boolean, onStartTracing: (overload: Java.Method) => void,
      onErrorTracing: (overload: Java.Method, error: any) => void,
      onTrace: (trace: string) => void): void {
    const tracer = this;

    try {
      overload.implementation = function(...args: any[]) {
        const returnValue = method.apply(this, args);

        let trace = `${clazz.class.getSimpleName()}.${overload.methodName}(`;

        for (let argumentIndex = 0; argumentIndex < args.length;
             ++argumentIndex) {
          if (argumentIndex > 0) {
            trace = `${trace}, `;
          }

          trace = `${trace}${args[argumentIndex]}`;
        }

        trace = `${trace})`;

        if ('void' !== overload.returnType.className) {
          trace = `${trace} => ${returnValue}`;
        }

        if (backtrace) {
          trace = `${trace}\nBacktrace:\n${tracer.getBacktrace()}`;
        }

        onTrace(trace);

        return returnValue;
      };
    } catch (e) {
      onErrorTracing(overload, e);
      return;
    }

    onStartTracing(overload);
  }

  private getBacktrace(): string {
    const backtrace =
        this.logClass.getStackTraceString(this.exceptionClass.$new());
    const lines = backtrace.split('\n');
    lines.splice(0, 1);

    return lines.join('\n');
  }
}
