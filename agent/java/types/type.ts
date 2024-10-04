import {Class} from './java/lang/index.js';

export interface Type {
  $alloc: Java.MethodDispatcher;
  $className: string;
  $init: Java.MethodDispatcher;
  $new: Java.MethodDispatcher;
  $ownMembers: string[];
  $super: Type;

  class: Class;

  $dispose(): void;
}
