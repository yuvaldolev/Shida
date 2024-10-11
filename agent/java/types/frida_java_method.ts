import * as java from './java/index.js';

export interface FridaJavaMethod<
    Arguments extends any[], ReturnType, This extends java.Object|null = null> {
  methodName: string;
  returnType: Java.Type;
  argumentTypes: Java.Type[];

  (...args: Arguments): ReturnType;

  implementation: (this: This, ...args: Arguments) => ReturnType | null;
}

export interface FridaJavaOverloadedMethod<This extends java.Object|null =
                                                            null> {
  methodName: string;
  overloads: FridaJavaMethod<any[], any, This>;

  overload<Arguments extends any[], ReturnType>(...args: Arguments): ReturnType;
}
