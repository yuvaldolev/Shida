export class Hooker {
  unhookMethod(
      method: Java.Wrapper, onUnhook: (overload: Java.Wrapper) => void,
      onError: (overload: Java.Wrapper, error: any) => void): void {
    method.overloads.forEach(
        (overload: Java.Wrapper) =>
            Hooker.unhookMethodOverload(overload, onUnhook, onError));
  }

  private static unhookMethodOverload(
      overload: Java.Wrapper, onUnhook: (overload: Java.Wrapper) => void,
      onError: (overload: Java.Wrapper, error: any) => void): void {
    try {
      overload.implementation = null;
      onUnhook(overload);
    } catch (e) {
      onError(overload, e);
    }
  }
}