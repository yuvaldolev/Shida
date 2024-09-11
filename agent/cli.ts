import {JavaCli} from './java/index.js';
import {ConsoleSink, LogcatSink, Logger} from './logger/index.js';

export class ShidaCli {
  readonly java?: JavaCli = undefined;

  private readonly logcatLogger = new Logger(new LogcatSink('shida'));
  private readonly consoleLogger = new Logger(new ConsoleSink());

  constructor() {
    if (Java.available) {
      Java.perform(() => {});
      this.java = new JavaCli(this.logcatLogger, this.consoleLogger);
    }
  }
}
