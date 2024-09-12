import {JavaLogcatLogger} from '../java/index.js';
import {NativeLogcatLogger} from '../native/index.js';

import {LogcatLogger} from './logcat_logger.js';
import {Sink} from './sink.js';

export class LogcatSink implements Sink {
  private readonly tag: string;
  private readonly logger: LogcatLogger;

  constructor(tag: string) {
    this.tag = tag;

    if (Java.available) {
      this.logger = new JavaLogcatLogger();
    } else {
      this.logger = new NativeLogcatLogger();
    }
  }

  write(log: string): void {
    this.logger.log(this.tag, log);
  }
}
