import * as lang from '../lang/index.js';

import {Collection} from './collection.js';

export interface Map extends lang.Object {
  get(key: lang.Object): lang.Object;
  put(key: lang.Object, value: lang.Object): lang.Object;
  values(): Collection;
}
