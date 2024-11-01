export class DocumentationInitializer {
  initialize(): void {
    // @ts-ignore
    if (typeof global._shdoc !== 'undefined') {
      return;
    }

    // @ts-ignore
    global._shdoc = {classes: new Map(), methods: new Map()};
  }
}
