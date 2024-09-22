import {Logger} from '../../logger/index.js';
import {UiTracer} from '../ui_tracer.js';

export class UiCli {
  readonly #uiTracer = new UiTracer();
  readonly #logcatLogger: Logger;

  constructor(logcatLogger: Logger) {
    this.#logcatLogger = logcatLogger;
  }

  traceClicks(): void {
    this.#uiTracer.traceClicks(
        (view, listener) => this.#logcatLogger.log(
            `View clicked: view=${view}, listener=${listener}`),
    );
  }

  traceTouches(): void {
    this.#uiTracer.traceTouches(
        (view, event) => this.#logcatLogger.log(
            `View touched: view=${view}, event=${event}`),
    );
  }
}
