export class JavaLogcatLogger {
  private readonly logClass = Java.use('android.util.Log');

  log(tag: string, message: string): void {
    this.logClass.v(tag, message);
  }
}
