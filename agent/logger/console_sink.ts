import {Sink} from './sink.js';

export class ConsoleSink implements Sink {
  write(log: string): void {
    console.log(log);
  }
}
