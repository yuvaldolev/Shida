import {DocumentClass, DocumentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {ClassRetriever} from '../class_retriever.js';
import {Reflection} from '../reflection.js';
import {Stringifier} from '../stringifier.js';
import * as types from '../types/index.js';

@DocumentClass(
    'Reflection', 'Perform Reflection-based operations on Java types')
export class ReflectionCli {
  readonly #reflection = new Reflection();
  readonly #stringifier = new Stringifier();
  readonly #classRetriever = new ClassRetriever();
  readonly #consoleLogger: Logger;

  constructor(consoleLogger: Logger) {
    this.#consoleLogger = consoleLogger;
  }

  @DocumentMethod(
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
    // const clazz = this.#classRetriever.retrieve(name);
    // clazz.$init.overloads.forEach(
    //     (overload: types.FridaJavaMethodOverload) =>
    //         this.#consoleLogger.log(overload));
  }

  @DocumentMethod(
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
    this.#reflection.forEachClassMethod(
        this.#classRetriever.retrieve(name), (method, _) => {
          method.overloads.forEach(
              (overload: types.FridaJavaMethodOverload) =>
                  this.#consoleLogger.log(overload));
        }, regex);
  }

  @DocumentMethod(
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
        'type': 'Object[]',
        description: 'The retrieved class instances',
      },
      )
  getClassInstances(name: string): types.Object[] {
    return this.#reflection.getClassInstances(name);
  }

  @DocumentMethod(
      'Dumps an object field and its value to the console',
      [
        {
          name: 'object',
          type: 'Object',
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
  dumpObjectField(object: types.Object, name: string): void {
    this.#consoleLogger.logField(
        object.getClass().getSimpleName(),
        name,
        this.#stringifier.stringify(
            this.#reflection.getObjectField(object, name)),
    );
  }

  @DocumentMethod(
      'Dumps all object fields and their values to the console',
      [
        {
          name: 'object',
          type: 'Object',
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
  dumpAllObjectFields(object: types.Object, regex?: string): void {
    this.#reflection.forEachObjectField(
        object,
        (field, value) => this.#consoleLogger.logField(
            object.getClass().getSimpleName(), field.getName(),
            this.#stringifier.stringify(value)),
        regex,
    );
  }
}
