import {JavaClass, JavaObject} from '../java/types/index.js';

import {Sink} from './sink.js';

export class Logger {
  static readonly COLOR_PREFIX = '\x1b[3';
  static readonly COLOR_SUFFIX = 'm';
  static readonly COLORS = [
    '4;01',
    '6;01',
    '7;11',
    '2;01',
    '5;01',
    '1;01',
    '3;01',
  ];
  static readonly RESET_COLOR = '\x1b[39;49;00m';

  private readonly sink: Sink;

  constructor(sink: Sink) {
    this.sink = sink;
  }

  log(message: any): void {
    this.sink.write(message.toString());
  }

  logColor(message: string, color: string) {
    this.log(message.split('\n')
                 .map(
                     line => `${Logger.COLOR_PREFIX}${color}${
                         Logger.COLOR_SUFFIX}${line}${Logger.RESET_COLOR}`)
                 .join('\n'));
  }

  logField(clazz: JavaClass, name: string, value: JavaObject): void {
    this.log(`${clazz.getSimpleName()}.${name} = ${value}`);
  }

  logFromThread(message: any, threadId: number): void {
    this.logColor(message, Logger.COLORS[threadId % Logger.COLORS.length]);
  }
}
