import {FridaJavaMethod} from './frida_java_method.js';
import * as java from './java/index.js';

export interface FridaJavaType<T = java.Object> {
  $alloc: FridaJavaMethod<[], T>;
  $className: string;
  $init: FridaJavaMethod<any[], void, T>;
  $new: FridaJavaMethod<any[], T>;
  $ownMembers: string[];
  $super: FridaJavaType;

  class: java.Class;

  $dispose(): void;
}

export interface FridaJavaTypeWrapper extends FridaJavaType {
  [name: string]: any;
}
