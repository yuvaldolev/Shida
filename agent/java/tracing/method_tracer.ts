import * as types from '../types/index.js';

import {Backtracer} from './backtracer.js';

export class MethodTracer {
  private readonly backtracer = new Backtracer();

  trace(
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
          trace = `${trace}\nBacktrace:\n${tracer.backtracer.getBacktrace()}`;
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
}
