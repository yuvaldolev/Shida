import * as types from './types/index.js';

export class Hooker {
  unhookMethod(
      method: types.FridaJavaOverloadedMethod,
      onUnhook?:
          (overload: types.FridaJavaMethod<any[], any, types.Object>) => void,
      onError?:
          (overload: types.FridaJavaMethod<any[], any, types.Object>,
           error: any) => void): void {
    method.overloads.forEach(
        (overload: types.FridaJavaMethod<any[], any, types.Object>) =>
            Hooker.unhookMethodOverload(overload, onUnhook, onError));
  }

  private static unhookMethodOverload(
      overload: types.FridaJavaMethod<any[], any, types.Object>,
      onUnhook?:
          (overload: types.FridaJavaMethod<any[], any, types.Object>) => void,
      onError?:
          (overload: types.FridaJavaMethod<any[], any, types.Object>,
           error: any) => void): void {
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
