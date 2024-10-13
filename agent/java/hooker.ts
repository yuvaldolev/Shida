import * as types from './types/index.js';

export class Hooker {
  unhookMethod(
      method: types.FridaJavaOverloadedMethod,
      onUnhook?: (overload: types.FridaJavaMethodOverload) => void,
      onError?: (overload: types.FridaJavaMethodOverload, error: any) => void):
      void {
    method.overloads.forEach(
        (overload: types.FridaJavaMethodOverload) =>
            Hooker.unhookMethodOverload(overload, onUnhook, onError));
  }

  private static unhookMethodOverload(
      overload: types.FridaJavaMethodOverload,
      onUnhook?: (overload: types.FridaJavaMethodOverload) => void,
      onError?: (overload: types.FridaJavaMethodOverload, error: any) => void):
      void {
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
