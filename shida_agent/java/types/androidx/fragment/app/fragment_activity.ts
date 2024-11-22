import {Activity} from '../../../android/index.js';

import {FragmentManager} from './fragment_manager.js';

export interface FragmentActivity extends Activity {
  getSupportFragmentManager(): FragmentManager;
}
