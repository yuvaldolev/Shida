import {Logger} from '../../logger/index.js';

import {ReflectionCli} from './reflection_cli.js';
import {TracingCli} from './tracing_cli.js';

export class JavaCli {
  readonly reflection: ReflectionCli;
  readonly tracing: TracingCli;

  constructor(consoleLogger: Logger, logcatLogger: Logger) {
    this.reflection = new ReflectionCli(consoleLogger);
    this.tracing = new TracingCli(consoleLogger, logcatLogger);
  }
}
