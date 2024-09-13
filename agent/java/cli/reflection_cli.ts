import {Logger} from '../../logger/index.js';
import {Reflection} from '../reflection.js';
import {JavaObject} from '../types/index.js';

export class ReflectionCli {
  readonly #reflection = new Reflection();
  readonly #consoleLogger: Logger;

  constructor(consoleLogger: Logger) {
    this.#consoleLogger = consoleLogger;
  }

  listClassMethods(name: string, regex?: string): void {
    this.#reflection.forEachClassMethod(Java.use(name), (method, _) => {
      method.overloads.forEach(
          (overload: Java.Wrapper) => this.#consoleLogger.log(overload));
    }, regex);
  }

  getClassInstances(name: string): JavaObject[] {
    return this.#reflection.getClassInstances(name);
  }

  dumpObjectField(instance: JavaObject, name: string): void {
    this.#consoleLogger.logField(
        instance.getClass(), name,
        this.#reflection.getObjectField(instance, name));
  }

  dumpAllObjectFields(
      instance: JavaObject,
      ): void {
    for (const field of instance.getClass().getDeclaredFields()) {
      this.dumpObjectField(instance, field.getName());
    }
  }
}
