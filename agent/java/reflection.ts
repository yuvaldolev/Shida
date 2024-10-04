import {TypeWrapper} from './types/index';
import {JavaObject} from './types/java/lang/index';
import {Field, Method} from './types/java/lang/reflect/index';

export class Reflection {
  getObjectField(object: JavaObject, fieldName: string): JavaObject|null {
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
      object: JavaObject, callback: (field: Field, value: any) => void,
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

  getClassInstances<T = any>(name: string): T[] {
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
      clazz: TypeWrapper,
      callback:
          (method: Java.MethodDispatcher, reflectedMethod: Method) => void,
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

  private getObjectFieldValue(object: JavaObject, field: Field): JavaObject
      |null {
    const accessible = field.isAccessible();

    try {
      field.setAccessible(true);
      return field.get(object);
    } finally {
      field.setAccessible(accessible);
    }
  }
}
