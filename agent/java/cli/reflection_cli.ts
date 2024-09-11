import {Logger} from '../../logger/index.js';
import {Reflection} from '../reflection.js';
import {JavaObject} from '../types/index.js';

export class ReflectionCli {
  readonly #reflection = new Reflection();
  readonly #consoleLogger: Logger;

  constructor(consoleLogger: Logger) {
    this.#consoleLogger = consoleLogger;
  }

  dumpObjectField(instance: JavaObject, fieldName: string): void {
    this.#consoleLogger.log(
        this.#reflection.getObjectField(instance, fieldName));
  }
}
