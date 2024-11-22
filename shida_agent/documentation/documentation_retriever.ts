import {ClassDocumentationGenerator} from './class_documentation_generator.js';
import {MethodDocumentationGenerator} from './method_documentation_generator.js';

export class DocumentationRetriever {
  private readonly classDocumentationGenerator =
      new ClassDocumentationGenerator();
  private readonly methodDocumentationGenerator =
      new MethodDocumentationGenerator();

  retrieve(o: any): string {
    const prototype = Object.getPrototypeOf(o);

    // @ts-ignore
    if (global._shdoc.classes.has(prototype)) {
      return this.classDocumentationGenerator.generate(
          o,
          // @ts-ignore
          global._shdoc.classes.get(prototype),
      );
    }

    // @ts-ignore.
    if (global._shdoc.methods.has(o)) {
      return this.methodDocumentationGenerator.generate(
          // @ts-ignore
          global._shdoc.methods.get(o),
      );
    }

    return '';
  }
}
