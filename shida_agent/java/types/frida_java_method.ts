export type MethodImplementation<Arguments extends any[], ReturnType, This> =
    (this: This, ...args: Arguments) => ReturnType;

export interface FridaJavaMethodOverload<
    Arguments extends any[] = any[], ReturnType = any, This = any> {
  methodName: string;
  returnType: Java.Type;
  argumentTypes: Java.Type[];

  (...args: Arguments): ReturnType;

  implementation: MethodImplementation<Arguments, ReturnType, This>|null;
}

export interface FridaJavaOverloadedMethod {
  methodName: string;
  overloads: FridaJavaMethodOverload[];

  overload<Arguments extends any[], ReturnType, This = null>(...args: string[]):
      FridaJavaMethodOverload<Arguments, ReturnType, This>;
}

export interface FridaJavaMethod<Arguments extends any[], ReturnType,
                                                   This = null> extends
    FridaJavaMethodOverload<Arguments, ReturnType, This>,
    FridaJavaOverloadedMethod {}
