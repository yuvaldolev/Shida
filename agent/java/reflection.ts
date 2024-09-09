import {JavaObject} from './types/index.js';

export class Reflection {
  getObjectField(instance: JavaObject, fieldName: string): object {
    const field = instance.getClass().getDeclaredField(fieldName);
    const accessible = field.isAccessible();

    try {
      field.setAccessible(true);
      return field.get(instance);
    } finally {
      field.setAccessible(accessible);
    }
  }
}
