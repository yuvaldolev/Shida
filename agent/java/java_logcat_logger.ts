import {LogcatLogger} from '../logger/index.js';

export class JavaLogcatLogger implements LogcatLogger {
  private readonly logClass = Java.use('android.util.Log');

  log(tag: string, message: string): void {
    this.logClass.v(tag, message);
  }
}
