import {documentClass} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';

import {ReflectionCli} from './reflection_cli.js';
import {TracingCli} from './tracing_cli.js';
import {UiCli} from './ui_cli.js';

@documentClass('Java', 'Shida Java APIs')
export class JavaCli {
  readonly reflection: ReflectionCli;
  readonly tracing: TracingCli;
  readonly ui: UiCli;

  constructor(consoleLogger: Logger, logcatLogger: Logger) {
    this.reflection = new ReflectionCli(consoleLogger);
    this.tracing = new TracingCli(consoleLogger, logcatLogger);
    this.ui = new UiCli(consoleLogger, logcatLogger);
  }
}
