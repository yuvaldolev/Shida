import * as _ from 'lodash-es';

import {ClassRetriever} from '../class_retriever.js';
import {ReentrantLock} from '../reentrant_lock.js';
import * as types from '../types/index.js';

import {Backtracer} from './backtracer.js';
import {LogFilter} from './log_filter.js';

export class LogTracer {
  static readonly LOG_PRIORITY_VERBOSE = 2;
  static readonly LOG_PRIORITY_DEBUG = 3;
  static readonly LOG_PRIORITY_INFO = 4;
  static readonly LOG_PRIORITY_WARN = 5;
  static readonly LOG_PRIORITY_ERROR = 6;

  private readonly filtersLock = new ReentrantLock();
  private readonly backtracer = new Backtracer();
  private readonly onTrace: (trace: string) => void;
  private readonly logClass: types.LogType;
  private filters: LogFilter[] = [];

  constructor(onTrace: (trace: string) => void) {
    this.onTrace = onTrace;

    const classRetriever = new ClassRetriever();
    this.logClass = classRetriever.retrieve('android.util.Log');
  }

  trace(filter: LogFilter): void {
    this.filtersLock.runExclusive(() => {
      if (0 === this.filters.length) {
        this.hookPrintlnNative();
      }

      this.filters.push(filter);
    });
  }

  untrace(filter: LogFilter): void {
    this.filtersLock.runExclusive(() => {
      this.filters = this.filters.filter(item => !_.isEqual(item, filter));
    });
  }

  private static priorityToString(priority: number): string {
    switch (priority) {
      case LogTracer.LOG_PRIORITY_VERBOSE: {
        return 'V';
      }

      case LogTracer.LOG_PRIORITY_DEBUG: {
        return 'D';
      }

      case LogTracer.LOG_PRIORITY_INFO: {
        return 'I';
      }

      case LogTracer.LOG_PRIORITY_WARN: {
        return 'W';
      }

      case LogTracer.LOG_PRIORITY_ERROR: {
        return 'E';
      }
    }

    throw new Error(`unsupported log priority: ${priority}`);
  }

  private hookPrintlnNative(): void {
    const logTracer = this;

    const printlnNativeMethod = this.logClass.println_native;
    printlnNativeMethod.implementation = function(
        bufID: number, priority: number, tag: string, msg: string) {
      const returnValue = printlnNativeMethod.call(
          logTracer.logClass, bufID, priority, tag, msg);

      logTracer.filtersLock.runExclusive(() => {
        logTracer.traceLog(priority, tag, msg);
      });

      return returnValue;
    };
  }

  private traceLog(priority: number, tag: string, message: string): void {
    try {
      for (const filter of this.filters) {
        if (!filter.matches(priority, tag, message)) {
          continue;
        }

        const trace = this.buildTrace(priority, tag, message);
        this.onTrace(trace);

        break;
      }
    } catch (e) {
      // Nothing to do if tracing fails.
    }
  }

  private buildTrace(priority: number, tag: string, message: string): string {
    const trace: string[] = [];

    trace.push(`${LogTracer.priorityToString(priority)} ${tag} : ${message}`);
    trace.push('Backtrace:');
    trace.push(this.backtracer.getBacktrace());

    return trace.join('\n');
  }
}
