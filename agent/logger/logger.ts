import {Sink} from './sink.js';

export class Logger {
  private readonly sink: Sink;

  constructor(sink: Sink) {
    this.sink = sink;
  }

  log(message: any) {
    this.sink.write(message.toString());
  }
}
