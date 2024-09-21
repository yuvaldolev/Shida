import {documentClass, documentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {Reflection} from '../reflection.js';
import {JavaObject} from '../types/index.js';

@documentClass(
    'Reflection', 'Perform Reflection-based operations on Java types')
export class ReflectionCli {
  readonly #reflection = new Reflection();
  readonly #consoleLogger: Logger;

  constructor(consoleLogger: Logger) {
    this.#consoleLogger = consoleLogger;
  }

  @documentMethod(
      'Lists class constructors',
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Class name',
        },
      ],
      )
  listClassConstructors(name: string): void {
    const clazz = Java.use(name);
    clazz.$init.overloads.forEach(
        (overload: Java.Method) => this.#consoleLogger.log(overload));
  }

  @documentMethod(
      'Lists class methods',
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Class name',
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

  @documentMethod(
      'Retieves all class instances from the JVM',
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Class name',
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

  @documentMethod(
      'Dumps an object field and its value to the console',
      [
        {
          name: 'instance',
          type: 'JavaObject',
          optional: false,
          description: 'Instance to dump',
        },
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Name of field to dump',
        },
      ],
      )
  dumpObjectField(instance: JavaObject, name: string): void {
    this.#consoleLogger.logField(
        instance.getClass(), name,
        this.#reflection.getObjectField(instance, name));
  }

  @documentMethod(
      'Dumps all object fields and their values to the console',
      [
        {
          name: 'instance',
          type: 'JavaObject',
          optional: false,
          description: 'Instance to dump',
        },
      ],
      )
  dumpAllObjectFields(
      instance: JavaObject,
      ): void {
    for (const field of instance.getClass().getDeclaredFields()) {
      this.dumpObjectField(instance, field.getName());
    }
  }
}
