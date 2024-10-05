import * as java from '../../java/index.js';
import {Window} from '../view/index.js';

import {FragmentManager} from './fragment_manager.js';

export interface Activity extends java.Object {
  getFragmentManager(): FragmentManager;
  getWindow(): Window;
}
