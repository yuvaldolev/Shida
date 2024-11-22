import {LogcatLogger} from '../logger/index.js';

export class NativeLogcatLogger implements LogcatLogger {
  static readonly LOGCAT_PRIORITY_VERBOSE = 2;

  private readonly androidLogWriteFunction = new NativeFunction(
      Module.findExportByName('liblog.so', '__android_log_write')!,
      'int',
      ['int', 'pointer', 'pointer'],
  );

  log(tag: string, message: string): void {
    this.androidLogWriteFunction(
        NativeLogcatLogger.LOGCAT_PRIORITY_VERBOSE, Memory.allocUtf8String(tag),
        Memory.allocUtf8String(message));
  }
}
