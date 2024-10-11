import {FridaJavaField} from '../../frida_java_field.js';
import {FridaJavaType} from '../../frida_java_type.js';
import * as java from '../../java/index.js';

import {Activity} from './activity.js';

export interface ActivityThread extends java.Object {
  mActivities: FridaJavaField<java.Map>;
}

export interface ActivityThreadType extends FridaJavaType {
  currentActivityThread(): ActivityThread;
}

export interface ActivityThread$ActivityClientRecord extends java.Object {
  activity: FridaJavaField<Activity>;
  paused: FridaJavaField<boolean>;
}
