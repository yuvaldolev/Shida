import {Logger} from '../../logger/index.js';
import {Hooker} from '../hooker.js';
import {JavaProcess} from '../java_process.js';
import {Reflection} from '../reflection.js';
import {Tracer} from '../tracer.js';

export class TracingCli {
  readonly #tracer = new Tracer();
  readonly #reflection = new Reflection();
  readonly #hooker = new Hooker();
  readonly #process = new JavaProcess();
  readonly #consoleLogger: Logger;
  readonly #logcatLogger: Logger;

  constructor(consoleLogger: Logger, logcatLogger: Logger) {
    this.#consoleLogger = consoleLogger;
    this.#logcatLogger = logcatLogger;
  }

  /**
   * Traces a class method - including all its overloads.
   * @param className - The name of the class of which method will be traced.
   * @param methodName - The name of the method to trace.
   * @param backtrace - Whether to display a backtrace after each trace. By
   * default, false.
   */
  traceMethod(
      className: string, methodName: string, backtrace: boolean = false): void {
    const clazz = Java.use(className);

    const method = clazz[methodName];
    if (typeof method === 'undefined') {
      return;
    }

    this.#tracer.traceMethod(
        clazz,
        method,
        backtrace,
        overload => this.#consoleLogger.log(`Started tracing ${overload}`),
        (overload, error) =>
            this.#consoleLogger.log(`Failed tracing ${overload}: ${error}`),
        trace => this.#logcatLogger.logFromThread(
            trace, this.#process.getCurrentThreadId()),
    );
  }

  traceClassConstructors(name: string, backtrace: boolean = false): void {
    this.traceMethod(name, '$init', backtrace);
  }

  traceClassMethods(name: string, regex?: string, backtrace: boolean = false):
      void {
    this.#reflection.forEachClassMethod(
        Java.use(name),
        (_, method) => this.traceMethod(name, method.getName(), backtrace),
        regex);
  }

  stopTracingMethod(className: string, methodName: string): void {
    const clazz = Java.use(className);

    const method = clazz[methodName];
    if (typeof method === 'undefined') {
      return;
    }

    this.#hooker.unhookMethod(
        method,
        overload => this.#consoleLogger.log(`Unhooked ${overload}`),
        (overload, error) =>
            this.#consoleLogger.log(`Failed tracing ${overload}: ${error}`),
    );
  }

  stopTracingClassMethods(name: string, regex?: string) {
    this.#reflection.forEachClassMethod(
        Java.use(name),
        (_, method) => this.stopTracingMethod(name, method.getName()),
        regex,
    );
  }
}
