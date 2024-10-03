import {JavaMethod} from './types/index.js';

export class Reflection {
  getObjectField(o: Java.Wrapper, fieldName: string): Java.Wrapper|null {
    let clazz = o.getClass();
    while (clazz != null) {
      try {
        const field = clazz.getDeclaredField(fieldName);
        return this.getObjectFieldValue(o, field);
      } catch (e) {
        clazz = clazz.getSuperclass();
      }
    }
    throw new Error(`No field '${fieldName}' in object ${o}`);
  }

  forEachObjectField(
      o: Java.Wrapper, callback: (field: Java.Wrapper, value: any) => void,
      regex?: string): void {
    let clazz = o.getClass();

    while (clazz != null) {
      for (const field of clazz.getDeclaredFields()) {
        if ((typeof regex !== 'undefined') &&
            (null === field.getName().match(regex))) {
          continue;
        }

        callback(field, this.getObjectFieldValue(o, field));
      }

      clazz = clazz.getSuperclass();
    }
  }

  getClassInstances(name: string): Java.Wrapper[] {
    const instances: Java.Wrapper[] = [];
    Java.choose(name, {
      onMatch: instance => {
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
          (null === reflectedMethod.getName().match(regex))) {
        continue;
      }

      const method = clazz[reflectedMethod.getName()];
      if (typeof method === 'undefined') {
        continue;
      }

      callback(method, reflectedMethod);
    }
  }

  private getObjectFieldValue(o: Java.Wrapper, field: Java.Wrapper):
      Java.Wrapper|null {
    const accessible = field.isAccessible();

    try {
      field.setAccessible(true);
      return field.get(o);
    } finally {
      field.setAccessible(accessible);
    }
  }
}
