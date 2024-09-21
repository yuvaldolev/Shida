import {JavaCli, JavaInitializer} from './java/index.js';
import {ConsoleSink, LogcatSink, Logger} from './logger/index.js';
import {ManPage} from './man/index.js';

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

  man(manPage: ManPage): void {
    this.#consoleLogger.log(manPage._manPage);
  }
}
