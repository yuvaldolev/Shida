import * as object from '../object.js';

import {AccessibleObject} from './accessible_object.js';

export interface Field extends AccessibleObject {
  get(obj: object.Object): object.Object;
  getName(): string;
}
