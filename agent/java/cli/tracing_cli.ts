import {DocumentClass, DocumentMethod} from '../../documentation/index.js';
import {Logger} from '../../logger/index.js';
import {ClassRetriever} from '../class_retriever.js';
import {Hooker} from '../hooker.js';
import {JavaProcess} from '../java_process.js';
import {Reflection} from '../reflection.js';
import {LogFilter, LogTracer, MethodTracer} from '../tracing/index.js';
import * as types from '../types/index.js';

@DocumentClass('Tracing', 'Trace Java class methods')
export class TracingCli {
  readonly LOG_PRIORITY_VERBOSE = LogTracer.LOG_PRIORITY_VERBOSE;
  readonly LOG_PRIORITY_DEBUG = LogTracer.LOG_PRIORITY_DEBUG;
  readonly LOG_PRIORITY_INFO = LogTracer.LOG_PRIORITY_INFO;
  readonly LOG_PRIORITY_WARN = LogTracer.LOG_PRIORITY_WARN;
  readonly LOG_PRIORITY_ERROR = LogTracer.LOG_PRIORITY_ERROR;

  readonly #methodTracer = new MethodTracer();
  readonly #logTracer = new LogTracer(
      trace => this.#logcatLogger.logFromThread(
          trace, this.#process.getCurrentThreadId()),
  );
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

  @DocumentMethod(
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
    const clazz =
        this.#classRetriever.retrieve<types.FridaJavaTypeWrapper>(className);

    const method = clazz[methodName];
    if (typeof method === 'undefined') {
      return;
    }

    this.#methodTracer.trace(
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

  @DocumentMethod(
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

  @DocumentMethod(
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
          type: 'RegExp',
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
  traceClassMethods(name: string, regex?: RegExp, backtrace: boolean = false):
      void {
    this.#reflection.forEachClassMethod(
        this.#classRetriever.retrieve(name),
        (_, method) => this.traceMethod(name, method.getName(), backtrace),
        regex);
  }

  @DocumentMethod(
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
    const clazz =
        this.#classRetriever.retrieve<types.FridaJavaTypeWrapper>(className);

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

  @DocumentMethod(
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
          type: 'RegExp',
          optional: true,
          description: `Regex to filter methods to stop tracing.
If not specified, all method traces will be stopped`,
        },
      ],
      )
  stopTracingClassMethods(name: string, regex?: RegExp): void {
    this.#reflection.forEachClassMethod(
        this.#classRetriever.retrieve(name),
        (_, method) => this.stopTracingMethod(name, method.getName()),
        regex,
    );
  }

  @DocumentMethod(
      'Trace Logs according to filters and display a backtrace of the method that logged them',
      [
        {
          name: 'messageRegex',
          type: 'RegExp',
          optional: false,
          description: 'Regex to filter log messages',
        },
        {
          name: 'tagRegex',
          type: 'RegExp',
          optional: true,
          description: `Regex to filter log tags.
If not specified, logs will not be filtered by tag`,
        },
        {
          name: 'minimumPriority',
          type: 'number',
          optional: true,
          description: `Minimum priority to filter logs.
Logs with priority below this will not be logged.
If not specified, logs will not be filtered by minimum priority`,
        },
        {
          name: 'maximumPriority',
          type: 'number',
          optional: true,
          description: `Maximum priority to filter logs.
Logs with priority above this will not be logged.
If not specified, logs will not be filtered by maximum priority`
        },
      ],
      )
  traceLog(
      messageRegex: RegExp,
      tagRegex?: RegExp,
      minimumPriority?: number,
      maximumPriority?: number,
      ): void {
    this.#logTracer.trace(
        new LogFilter(messageRegex, tagRegex, minimumPriority, maximumPriority),
    );
  }
}
