import {JavaCli, JavaInitializer} from './java/index.js';
import {ConsoleSink, LogcatSink, Logger} from './logger/index.js';

export class ShidaCli {
  readonly java?: JavaCli = undefined;

  readonly #javaInitializer = new JavaInitializer();

  constructor() {
    this.#javaInitializer.initialize();

    const logcatLogger = new Logger(new LogcatSink('shida'));
    const consoleLogger = new Logger(new ConsoleSink());

    if (Java.available) {
      this.java = new JavaCli(logcatLogger, consoleLogger);
    }
  }
}
