export class Stringifier {
  private readonly toStringMethod = Java.use('java.lang.Object').toString;

  stringify(o: any): string {
    try {
      if (null === o) {
        return 'null';
      }

      return this.toStringMethod.call(o);
    } catch (e) {
      return o.toString();
    }
  }
}
