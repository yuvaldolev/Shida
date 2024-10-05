import {documentClass, documentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {ClassRetriever} from '../class_retriever.js';
import {Hooker} from '../hooker.js';
import {JavaProcess} from '../java_process.js';
import {Reflection} from '../reflection.js';
import {Tracer} from '../tracer.js';
import * as types from '../types/index.js';

@documentClass('Tracing', 'Trace Java class methods')
export class TracingCli {
  readonly #tracer = new Tracer();
  readonly #reflection = new Reflection();
  readonly #hooker = new Hooker();
  readonly #process = new JavaProcess();
  readonly #classRetriever = new ClassRetriever();
  readonly #consoleLogger: Logger;
  readonly #logcatLogger: Logger;

  constructor(consoleLogger: Logger, logcatLogger: Logger) {
    this.#consoleLogger = consoleLogger;
    this.#logcatLogger = logcatLogger;
  }

  @documentMethod(
      `Trace a class method.
Log each method invocation with the arguments and return value`,
      [
        {
          name: 'className',
          type: 'string',
          optional: false,
          description: 'Name of class to trace',
        },
        {
          name: 'methodName',
          type: 'string',
          optional: false,
          description: 'Name of method to trace',
        },
        {
          name: 'backtrace',
          type: 'boolean',
          optional: true,
          description: 'Display a backtrace after each trace',
          defaultValue: false,
        },
      ],
      )
  traceMethod(
      className: string, methodName: string, backtrace: boolean = false): void {
    const clazz = this.#classRetriever.retrieve<types.TypeWrapper>(className);

    const method = clazz[methodName];
    if (typeof method === 'undefined') {
      return;
    }

    this.#tracer.traceMethod(
        clazz,
        method,
        backtrace,
        overload => this.#consoleLogger.log(`Started tracing ${overload}`),
        (overload, error) =>
            this.#consoleLogger.log(`Failed tracing ${overload}: ${error}`),
        trace => this.#logcatLogger.logFromThread(
            trace, this.#process.getCurrentThreadId()),
    );
  }

  @documentMethod(
      `Trace all class constructors.
Log each constructor invocation with the arguments and return value`,
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Name of class to trace',
        },
        {
          name: 'backtrace',
          type: 'boolean',
          optional: true,
          description: 'Display a backtrace after each trace',
          defaultValue: false,
        },
      ],
      )
  traceClassConstructors(name: string, backtrace: boolean = false): void {
    this.traceMethod(name, '$init', backtrace);
  }

  @documentMethod(
      `Trace all class methods.
Log each method invocation with the arguments and return value`,
      [
        {
          name: 'name',
          type: 'string',
          optional: false,
          description: 'Name of class to trace',
        },
        {
          name: 'regex',
          type: 'string',
          optional: true,
          description: `Regex to filter methods to trace.
  If not specified, all methods will be traced`,
        },
        {
          name: 'backtrace',
          type: 'boolean',
          optional: true,
          description: 'Display a backtrace after each trace',
          defaultValue: false,
        },
      ],
      )
  traceClassMethods(name: string, regex?: string, backtrace: boolean = false):
      void {
    this.#reflection.forEachClassMethod(
        this.#classRetriever.retrieve(name),
        (_, method) => this.traceMethod(name, method.getName(), backtrace),
        regex);
  }

  @documentMethod(
      'Stop tracing a class method',
      [
        {
          name: 'className',
          type: 'string',
          optional: false,
          description: 'Name of class to stop tracing',
        },
        {
          name: 'methodName',
          type: 'string',
          optional: false,
          description: 'Name of method to stop tracing',
        },
      ],
      )
  stopTracingMethod(className: string, methodName: string): void {
    const clazz = this.#classRetriever.retrieve<types.TypeWrapper>(className);

    const method = clazz[methodName];
    if (typeof method === 'undefined') {
      return;
    }

    this.#hooker.unhookMethod(
        method,
        overload => this.#consoleLogger.log(`Unhooked ${overload}`),
        (overload, error) =>
            this.#consoleLogger.log(`Failed tracing ${overload}: ${error}`),
    );
  }

  @documentMethod(
      'Stop tracing all class methods',
      [
        {
          name: 'className',
          type: 'string',
          optional: false,
          description: 'Name of class to stop tracing',
        },
        {
          name: 'regex',
          type: 'string',
          optional: true,
          description: `Regex to filter methods to stop tracing.
  If not specified, all method traces will be stopped`,
        },
      ],
      )
  stopTracingClassMethods(name: string, regex?: string) {
    this.#reflection.forEachClassMethod(
        this.#classRetriever.retrieve(name),
        (_, method) => this.stopTracingMethod(name, method.getName()),
        regex,
    );
  }
}
