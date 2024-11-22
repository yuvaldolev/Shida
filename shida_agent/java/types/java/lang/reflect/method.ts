import {Executable} from './executable.js';

export interface Method extends Executable {
  getName(): string;
}
