export class JavaProcess {
  private readonly processClass: Java.Wrapper = Java.use('android.os.Process');

  getCurrentThreadId(): number {
    return this.processClass.myTid();
  }
}
