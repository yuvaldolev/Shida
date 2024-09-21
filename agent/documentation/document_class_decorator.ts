import {ClassDocumentationDescriptor} from './class_documentation_descriptor.js';
import {DocumentationInitializer} from './documentation_initializer.js';

export function documentClass(name: string, description: string): any {
  return function(clazz: any) {
    const documentation_initializer = new DocumentationInitializer();
    documentation_initializer.initialize();

    // @ts-ignore
    global._shida_documentation.classes.set(
        clazz.prototype,
        new ClassDocumentationDescriptor(name, description),
    );
  }
}
