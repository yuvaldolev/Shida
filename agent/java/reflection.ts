import {JavaMethod, JavaObject} from './types/index.js';

export class Reflection {
  getObjectField(instance: JavaObject, fieldName: string): JavaObject {
    const field = instance.getClass().getDeclaredField(fieldName);
    const accessible = field.isAccessible();

    try {
      field.setAccessible(true);
      return field.get(instance);
    } finally {
      field.setAccessible(accessible);
    }
  }

  getClassInstances(name: string): JavaObject[] {
    const instances: JavaObject[] = [];
    Java.choose(name, {
      onMatch: (instance) => {
        instances.push(instance as unknown as JavaObject);
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
