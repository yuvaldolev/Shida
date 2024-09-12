export class JavaInitializer {
  initialize(): void {
    if (!Java.available) {
      return;
    }

    Java.perform(() => {});
  }
}
