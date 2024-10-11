import {FridaJavaMethod} from '../../frida_java_method.js';
import {FridaJavaType} from '../../frida_java_type.js';
import * as java from '../../java/index.js';

export interface View extends java.Object {}

export interface ViewType extends FridaJavaType {
  performClick: FridaJavaMethod<[], boolean, View>;
  onTouchEvent: Java.MethodDispatcher;
}
