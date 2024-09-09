import {Reflection} from '../reflection.js';
import {JavaObject} from '../types/index.js';

export class ReflectionCli {
  readonly #reflection = new Reflection();

  constructor() {
    Java.perform(() => {});
  }

  dumpObjectField(instance: JavaObject, fieldName: string): void {
    console.log(this.#reflection.getObjectField(instance, fieldName));
  }
}
