import {Logger} from '../../logger/index.js';

import {ReflectionCli} from './reflection_cli.js';

export class JavaCli {
  readonly reflection: ReflectionCli;

  constructor(logcatLogger: Logger, consoleLogger: Logger) {
    this.reflection = new ReflectionCli(consoleLogger);
  }
}
