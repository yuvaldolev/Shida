import {DocumentClass} from './documentation/index.js';
import {JavaCli, JavaInitializer} from './java/index.js';
import {ConsoleSink, LogcatSink, Logger} from './logger/index.js';

@DocumentClass('Shida', 'Shida APIs')
export class ShidaCli {
  readonly java?: JavaCli = undefined;

  readonly #javaInitializer = new JavaInitializer();
  readonly #consoleLogger: Logger;

  constructor() {
    this.#javaInitializer.initialize();

    this.#consoleLogger = new Logger(new ConsoleSink());
    const logcatLogger = new Logger(new LogcatSink('shida'));

    if (Java.available) {
      this.java = new JavaCli(this.#consoleLogger, logcatLogger);
    }
  }
}
