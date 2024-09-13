import {JavaClass, JavaObject} from '../java/types/index.js';

import {Sink} from './sink.js';

export class Logger {
  private readonly sink: Sink;

  constructor(sink: Sink) {
    this.sink = sink;
  }

  log(message: any) {
    this.sink.write(message.toString());
  }

  logField(clazz: JavaClass, name: string, value: JavaObject) {
    this.log(`${clazz.getSimpleName()}.${name} = ${value}`);
  }
}
