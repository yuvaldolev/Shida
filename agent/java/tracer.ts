import {ClassRetriever} from './class_retriever.js';
import * as types from './types/index.js';

export class Tracer {
  private readonly classRetriever = new ClassRetriever();
  private readonly logClass: types.LogType;
  private readonly exceptionClass: types.FridaJavaType;

  constructor() {
    this.logClass = this.classRetriever.retrieve('android.util.Log');
    this.exceptionClass = this.classRetriever.retrieve('java.lang.Exception')
  }

  traceMethod(
      clazz: types.FridaJavaType,
      method: types.FridaJavaMethod<any[], any, types.Object>,
      backtrace: boolean,
      onStartTracing: (overload: types.FridaJavaMethodOverload) => void,
      onErrorTracing:
          (overload: types.FridaJavaMethodOverload, error: any) => void,
      onTrace: (trace: string) => void): void {
    method.overloads.forEach(
        (overload: types.FridaJavaMethodOverload) => this.traceMethodOverload(
            clazz, method, overload, backtrace, onStartTracing, onErrorTracing,
            onTrace));
  }

  traceLog(
      onTrace: (trace: string) => void,
      message_regex: string,
      minimum_log_level?: number,
      maximum_log_level?: number,
      tag_regex?: string,
  ) {
    const logClass = this.logClass;
    const println_native = this.logClass.println_native;
    println_native.implementation = function(
        bufID: number, priority: number, tag: string, msg: string) {
      onTrace(tag);
      const returnValue =
          println_native.call(logClass, bufID, priority, tag, msg);
      onTrace(msg);
      return returnValue;
    }
  }

  private traceMethodOverload(
      clazz: types.FridaJavaType,
      method: types.FridaJavaMethod<any[], any, types.Object>,
      overload: types.FridaJavaMethodOverload, backtrace: boolean,
      onStartTracing: (overload: types.FridaJavaMethodOverload) => void,
      onErrorTracing:
          (overload: types.FridaJavaMethodOverload, error: any) => void,
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
