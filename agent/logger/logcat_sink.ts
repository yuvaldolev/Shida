import {JavaLogcatLogger} from '../java/index.js';
import {NativeLogcatLogger} from '../native/index.js';

import {Sink} from './sink.js';

export class LogcatSink implements Sink {
  private readonly javaLogcatLogger = new JavaLogcatLogger();
  private readonly nativeLogcatLogger = new NativeLogcatLogger();
  private readonly tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  write(log: string): void {
    if (Java.available) {
      this.javaLogcatLogger.log(this.tag, log);
      return;
    }

    this.nativeLogcatLogger.log(this.tag, log);
  }
}
