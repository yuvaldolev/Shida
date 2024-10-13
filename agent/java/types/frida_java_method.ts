import * as java from './java/index.js';

export interface FridaJavaOverloadedMethod {
  methodName: string;
  overloads: FridaJavaMethod<any[], any, java.Object>[];

  overload<Arguments extends any[], ReturnType, This extends java.Object|null>(
      ...args: string[]): FridaJavaMethod<Arguments, ReturnType, This>;
}

type MethodImplementation<Arguments extends any[], ReturnType,
                                            This extends java.Object|null> =
    (this: This, ...args: Arguments) => ReturnType;

export interface FridaJavaMethod<
    Arguments extends any[], ReturnType, This extends
        java.Object|null = null> extends FridaJavaOverloadedMethod {
  methodName: string;
  returnType: Java.Type;
  argumentTypes: Java.Type[];

  (...args: Arguments): ReturnType;

  implementation: MethodImplementation<Arguments, ReturnType, This>|null;
}
