import {ClassRetriever} from '../class_retriever.js';
import {ReentrantLock} from '../reentrant_lock.js';
import * as types from '../types/index.js';

import {LogFilter} from './log_filter.js';

export class LogTracer {
  static readonly LOG_PRIORITY_VERBOSE = 2;
  static readonly LOG_PRIORITY_DEBUG = 3;
  static readonly LOG_PRIORITY_INFO = 4;
  static readonly LOG_PRIORITY_WARN = 5;
  static readonly LOG_PRIORITY_ERROR = 6;

  private readonly filters: LogFilter[] = [];
  private readonly filtersLock = new ReentrantLock();
  private readonly logClass: types.LogType;

  constructor() {
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
    }
  }

  private traceLog(priority: number, tag: string, message: string): void {
    let trace: string|null = null;

    for (const filter of this.filters) {
      if (!filter.matches(priority, tag, message)) {
        continue;
      }

      if (null === trace) {
        trace = buildTrace(priority, tag, message);
      }

      filter.onMatch(trace);
    }
  }
}
