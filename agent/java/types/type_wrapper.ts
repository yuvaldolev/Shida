import {Type} from './type.js';

export interface TypeWrapper extends Type {
  [name: string]: any;
}
