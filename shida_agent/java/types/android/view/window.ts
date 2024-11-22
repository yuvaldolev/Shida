import * as java from '../../java/index.js';

import {View} from './view.js';

export interface Window extends java.Object {
  getDecorView(): View;
}
