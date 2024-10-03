import {documentClass, documentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {Reflection} from '../reflection.js';
import {Stringifier} from '../stringifier.js';

@documentClass(
    'Reflection', 'Perform Reflection-based operations on Java types')
export class ReflectionCli {
  readonly #reflection = new Reflection();
  readonly #stringifier = new Stringifier();
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
        'type': 'Java.Wrapper[]',
        description: 'The retrieved class instances',
      },
      )
  getClassInstances(name: string): Java.Wrapper[] {
    return this.#reflection.getClassInstances(name);
  }

  @documentMethod(
      'Dumps an object field and its value to the console',
      [
        {
          name: 'o',
          type: 'Java.Wrapper',
          optional: false,
          description: 'Object to dump',
        },
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Name of field to dump',
        },
      ],
      )
  dumpObjectField(o: Java.Wrapper, name: string): void {
    this.#consoleLogger.logField(
        o.getClass().getSimpleName(),
        name,
        this.#stringifier.stringify(this.#reflection.getObjectField(o, name)),
    );
  }

  @documentMethod(
      'Dumps all object fields and their values to the console',
      [
        {
          name: 'o',
          type: 'Java.Wrapper',
          optional: false,
          description: 'Object to dump',
        },
        {
          name: 'regex',
          type: 'string',
          optional: true,
          description: 'Regex to filter the objects fields',
        },
      ],
      )
  dumpAllObjectFields(o: Java.Wrapper, regex?: string): void {
    this.#reflection.forEachObjectField(
        o,
        (field, value) => this.#consoleLogger.logField(
            o.getClass().getSimpleName(), field.getName(),
            this.#stringifier.stringify(value)),
        regex,
    );
  }
}
