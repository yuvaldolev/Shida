import {View} from './view.js';

export interface ViewGroup extends View {
  getChildAt(index: number): View;
  getChildCount(): number;
}
