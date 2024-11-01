import {ClassRetriever} from './class_retriever.js';
import * as types from './types/index.js';

export class ReentrantLock {
  private javaReentrantLock: types.ReentrantLock;

  constructor() {
    const classRetriever = new ClassRetriever();

    const reentrantLockClass =
        classRetriever.retrieve<types.FridaJavaType<types.ReentrantLock>>(
            'java.util.concurrent.locks.ReentrantLock');
    this.javaReentrantLock = reentrantLockClass.$new();
  }

  lock(): void {
    this.javaReentrantLock.lock();
  }

  unlock(): void {
    this.javaReentrantLock.unlock();
  }

  runExclusive(callback: () => void) {
    this.lock();

    try {
      callback();
    } finally {
      this.unlock();
    }
  }
}
