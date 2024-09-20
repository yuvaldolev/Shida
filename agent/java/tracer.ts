export class Tracer {
  private readonly logClass = Java.use('android.util.Log');
  private readonly exceptionClass = Java.use('java.lang.Exception');

  traceMethod(
      clazz: Java.Wrapper, method: Java.Wrapper, backtrace: boolean,
      onStartTracing: (overload: Java.Wrapper) => void,
      onErrorTracing: (overload: Java.Wrapper, error: any) => void,
      onTrace: (trace: string) => void): void {
    method.overloads.forEach(
        (overload: Java.Wrapper) => this.traceMethodOverload(
            clazz, method, overload, backtrace, onStartTracing, onErrorTracing,
            onTrace));
  }

  private traceMethodOverload(
      clazz: Java.Wrapper, method: Java.Wrapper, overload: Java.Wrapper,
      backtrace: boolean, onStartTracing: (overload: Java.Wrapper) => void,
      onErrorTracing: (overload: Java.Wrapper, error: any) => void,
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
