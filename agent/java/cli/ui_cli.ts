import {documentClass, documentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {UiTracer} from '../ui_tracer.js';

@documentClass('UI', 'Trace UI events')
export class UiCli {
  readonly #uiTracer = new UiTracer();
  readonly #logcatLogger: Logger;

  constructor(logcatLogger: Logger) {
    this.#logcatLogger = logcatLogger;
  }

  @documentMethod(
      `Trace UI clicks.
Log each click on a View`,
      )
  traceClicks(): void {
    this.#uiTracer.traceClicks(
        (view, listener) => this.#logcatLogger.log(
            `View clicked: view=${view}, listener=${listener}`),
    );
  }

  @documentMethod(
      `Trace UI touches.
Log each touch on a View`,
      )
  traceTouches(): void {
    this.#uiTracer.traceTouches(
        (view, event) => this.#logcatLogger.log(
            `View touched: view=${view}, event=${event}`),
    );
  }

  @documentMethod('Stop tracing UI clicks')
  stopTracingClicks(): void {
    this.#uiTracer.stopTracingClicks();
  }

  @documentMethod('Stop tracing UI touches')
  stopTracingTouches(): void {
    this.#uiTracer.stopTracingTouches();
  }
}
