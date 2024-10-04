import {JavaObject} from '../index.js';

import {AccessibleObject} from './accessible_object.js';

export interface Field extends AccessibleObject {
  get(obj: JavaObject): JavaObject;
  getName(): string;
}
