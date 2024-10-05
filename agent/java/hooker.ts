export class Hooker {
  unhookMethod(
      method: Java.MethodDispatcher, onUnhook?: (overload: Java.Method) => void,
      onError?: (overload: Java.Method, error: any) => void): void {
    method.overloads.forEach(
        (overload: Java.Method) =>
            Hooker.unhookMethodOverload(overload, onUnhook, onError));
  }

  private static unhookMethodOverload(
      overload: Java.Method, onUnhook?: (overload: Java.Method) => void,
      onError?: (overload: Java.Method, error: any) => void): void {
    try {
      overload.implementation = null;

      if (typeof onUnhook !== 'undefined') {
        onUnhook(overload);
      }
    } catch (e) {
      if (typeof onError === 'undefined') {
        throw e;
      } else {
        onError(overload, e);
      }
    }
  }
}
