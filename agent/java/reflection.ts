import {JavaMethod} from './types/index.js';

export class Reflection {
  getClassInstances(name: string): Java.Wrapper[] {
    const instances: Java.Wrapper[] = [];
    Java.choose(name, {
      onMatch: (instance) => {
        instances.push(instance);
      },
      onComplete: () => {},
    });

    return instances;
  }

  forEachClassMethod(
      clazz: Java.Wrapper,
      callback: (method: Java.Wrapper, reflectedMethod: JavaMethod) => void,
      regex?: string): void {
    for (const reflectedMethod of clazz.class.getDeclaredMethods()) {
      if ((typeof regex !== 'undefined') &&
          (null == reflectedMethod.getName().match(regex))) {
        continue;
      }

      const method = clazz[reflectedMethod.getName()];
      if (typeof method === 'undefined') {
        continue;
      }

      callback(method, reflectedMethod);
    }
  }
}
