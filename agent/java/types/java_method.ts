import {JavaClass} from './index.js';

export type JavaMethod = {
  getName: () => string; getReturnType: () => JavaClass;
};
