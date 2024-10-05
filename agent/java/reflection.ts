import * as types from './types/index.js';

export class Reflection {
  getObjectField(object: types.Object, fieldName: string): types.Object|null {
    let clazz = object.getClass();
    while (clazz != null) {
      try {
        const field = clazz.getDeclaredField(fieldName);
        return this.getObjectFieldValue(object, field);
      } catch (e) {
        clazz = clazz.getSuperclass();
      }
    }
    throw new Error(`No field '${fieldName}' in object ${object}`);
  }

  forEachObjectField(
      object: types.Object, callback: (field: types.Field, value: any) => void,
      regex?: string): void {
    let clazz = object.getClass();

    while (clazz != null) {
      for (const field of clazz.getDeclaredFields()) {
        if ((typeof regex !== 'undefined') &&
            (null === field.getName().match(regex))) {
          continue;
        }

        callback(field, this.getObjectFieldValue(object, field));
      }

      clazz = clazz.getSuperclass();
    }
  }

  getClassInstances<T = types.Object>(name: string): T[] {
    const instances: T[] = [];
    Java.choose(name, {
      onMatch: instance => {
        instances.push(instance as unknown as T);
      },
      onComplete: () => {},
    });

    return instances;
  }

  forEachClassMethod(
      clazz: types.FridaJavaTypeWrapper,
      callback:
          (method: Java.MethodDispatcher,
           reflectedMethod: types.Method) => void,
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

  private getObjectFieldValue(object: types.Object, field: types.Field):
      types.Object|null {
    const accessible = field.isAccessible();

    try {
      field.setAccessible(true);
      return field.get(object);
    } finally {
      field.setAccessible(accessible);
    }
  }
}
