import {Class} from './java/lang/index.js';

export interface FridaJavaType {
  $alloc: Java.MethodDispatcher;
  $className: string;
  $init: Java.MethodDispatcher;
  $new: Java.MethodDispatcher;
  $ownMembers: string[];
  $super: FridaJavaType;

  class: Class;

  $dispose(): void;
}
