import {JavaClass, JavaMethod, JavaObject} from './types/index.js';

export class Reflection {
  private readonly objectClass = Java.use('java.lang.Object').class;

  getObjectField(instance: JavaObject, fieldName: string): JavaObject|null {
    let clazz = instance.getClass();

    while (clazz != null) {
      try {
        return this.getObjectDeclaredField(clazz, instance, fieldName);
      } catch (e) {
        clazz = clazz.getSuperclass();
      }
    }

    throw new Error(`No field '${fieldName}' in object ${instance}`);
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

  private getObjectDeclaredField(
      clazz: JavaClass, instance: JavaObject, fieldName: string): JavaObject
      |null {
    const field = clazz.getDeclaredField(fieldName);
    const accessible = field.isAccessible();

    try {
      field.setAccessible(true);
      return field.get(instance);
    } finally {
      field.setAccessible(accessible);
    }
  }
}
