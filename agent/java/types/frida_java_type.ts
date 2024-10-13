import {FridaJavaMethod} from './frida_java_method.js';
import * as java from './java/index.js';

export interface FridaJavaType {
  $alloc: FridaJavaMethod<[], java.Object>;
  $className: string;
  $init: FridaJavaMethod<any[], void, java.Object>;
  $new: FridaJavaMethod<any[], java.Object>;
  $ownMembers: string[];
  $super: FridaJavaType;

  class: java.Class;

  $dispose(): void;
}

export interface FridaJavaTypeWrapper extends FridaJavaType {
  [name: string]: any;
}
