import * as java from '../../java/index.js';
import {Type} from '../../type.js';

export interface ActivityThreadType extends Type {
  currentActivityThread(): ActivityThread;
}

export interface ActivityThread extends java.Object {
  mActivities;
}
