import {Logger} from '../../logger/index.js';
import {JavaProcess} from '../java_process.js';
import {Tracer} from '../tracer.js';

export class TracingCli {
  readonly #tracer = new Tracer();
  readonly #process = new JavaProcess();
  readonly #consoleLogger: Logger;
  readonly #logcatLogger: Logger;

  constructor(consoleLogger: Logger, logcatLogger: Logger) {
    this.#consoleLogger = consoleLogger;
    this.#logcatLogger = logcatLogger;
  }

  traceMethod(
      className: string, methodName: string, backtrace: boolean = false) {
    const clazz = Java.use(className);

    const method = clazz[methodName];
    if (typeof method === 'undefined') {
      return;
    }

    this.#tracer.traceMethod(
        clazz,
        method,
        backtrace,
        overload => this.#consoleLogger.log(`Start tracing: ${overload}`),
        trace => this.#logcatLogger.logFromThread(
            trace, this.#process.getCurrentThreadId()),
    );
  }
}
