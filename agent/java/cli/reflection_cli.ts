import {Logger} from '../../logger/index.js';
import {manClass, manMethod} from '../../man/index.js';
import {Reflection} from '../reflection.js';
import {JavaObject} from '../types/index.js';

@manClass('Performs Reflection-based operations on Java types')
export class ReflectionCli {
  readonly #reflection = new Reflection();
  readonly #consoleLogger: Logger;

  constructor(consoleLogger: Logger) {
    this.#consoleLogger = consoleLogger;
  }

  @manMethod(
      'Lists a class\'s constructors',
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'The class\'s name',
        },
      ],
      )
  listClassConstructors(name: string): void {
    const clazz = Java.use(name);
    clazz.$init.overloads.forEach(
        (overload: Java.Method) => this.#consoleLogger.log(overload));
  }

  @manMethod(
      'Lists a class\'s methods',
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'The class\'s name',
        },
        {
          name: 'regex',
          type: 'string',
          optional: true,
          description: 'Regex to filter the class methods',
        },
      ],
      )
  listClassMethods(name: string, regex?: string): void {
    this.#reflection.forEachClassMethod(Java.use(name), (method, _) => {
      method.overloads.forEach(
          (overload: Java.Wrapper) => this.#consoleLogger.log(overload));
    }, regex);
  }

  @manMethod(
      'Retieves all instances of a class from the JVM',
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'The class\'s name',
        },
      ],
      {
        'type': 'JavaObject[]',
        description: 'The retrieved class instances',
      },
      )
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
