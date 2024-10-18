import {ClassDocumentationDescriptor} from './class_documentation_descriptor.js';
import {DocumentationInitializer} from './documentation_initializer.js';

export function DocumentClass(name: string, description: string): any {
  return function(clazz: any) {
    const documentation_initializer = new DocumentationInitializer();
    documentation_initializer.initialize();

    // @ts-ignore
    global._shidaDocumentation.classes.set(
        clazz.prototype,
        new ClassDocumentationDescriptor(name, description),
    );
  }
}
