export class DocumentationInitializer {
  initialize(): void {
    // @ts-ignore
    if (typeof global._shida_documentation !== 'undefined') {
      return;
    }

    // @ts-ignore
    global._shida_documentation = {classes: new Map(), methods: new Map()};
  }
}
