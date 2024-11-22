import {FridaJavaField} from '../../frida_java_field.js';
import {FridaJavaMethod} from '../../frida_java_method.js';
import {FridaJavaType} from '../../frida_java_type.js';
import * as java from '../../java/index.js';

export interface View$ListenerInfo extends java.Object {
  mOnClickListener: FridaJavaField<java.Object>;
}

export interface View extends java.Object {
  mListenerInfo: FridaJavaField<View$ListenerInfo>;
}

export interface ViewType extends FridaJavaType<View> {
  performClick: FridaJavaMethod<[], boolean, View>;
  onTouchEvent: FridaJavaMethod<[java.Object], boolean, View>;
}
