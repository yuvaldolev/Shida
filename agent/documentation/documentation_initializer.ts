export class DocumentationInitializer {
  initialize(): void {
    // @ts-ignore
    if (typeof global._shidaDocumentation !== 'undefined') {
      return;
    }

    // @ts-ignore
    global._shidaDocumentation = {classes: new Map(), methods: new Map()};
  }
}
