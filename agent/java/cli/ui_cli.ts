import {DocumentClass, DocumentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {Stringifier} from '../stringifier.js';
import {UiDumper, UiTracer} from '../ui/index.js';

@DocumentClass('UI', 'Trace UI events')
export class UiCli {
  readonly #uiTracer = new UiTracer();
  readonly #uiDumper = new UiDumper();
  readonly #stringifier = new Stringifier();
  readonly #consoleLogger: Logger;
  readonly #logcatLogger: Logger;

  constructor(consoleLogger: Logger, logcatLogger: Logger) {
    this.#consoleLogger = consoleLogger;
    this.#logcatLogger = logcatLogger;
  }

  @DocumentMethod(
      `Trace UI clicks.
Log each click on a View`,
      )
  traceClicks(): void {
    this.#uiTracer.traceClicks(
        (view, listener) => this.#logcatLogger.log(`View clicked: view=${
            this.#stringifier.stringify(
                view)}, listener=${this.#stringifier.stringify(listener)}`),
    );
  }

  @DocumentMethod(
      `Trace UI touches.
Log each touch on a View`,
      )
  traceTouches(): void {
    this.#uiTracer.traceTouches(
        (view, event) => this.#logcatLogger.log(
            `View touched: view=${this.#stringifier.stringify(view)}, event=${
                this.#stringifier.stringify(event)}`),
    );
  }

  @DocumentMethod('Stop tracing UI clicks')
  stopTracingClicks(): void {
    this.#uiTracer.stopTracingClicks();
  }

  @DocumentMethod('Stop tracing UI touches')
  stopTracingTouches(): void {
    this.#uiTracer.stopTracingTouches();
  }

  @DocumentMethod(
      'Dump the top Activity, including its name, fragments and view tree')
  dumpTopActivity(): void {
    this.#consoleLogger.log(`\n${this.#uiDumper.dumpTopActivity()}\n`);
  }
}
