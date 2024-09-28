import {ClassDocumentationDescriptor} from './class_documentation_descriptor.js';

export class ClassDocumentationGenerator {
  generate(o: any, descriptor: ClassDocumentationDescriptor): string {
    let documentation = `\nClass: ${descriptor.getName()}\n\n`;
    documentation = `${documentation}${descriptor.getDescription()}.\n`;

    const prototype = Object.getPrototypeOf(o);

    let attributeNames = Object.getOwnPropertyNames(o);
    if (0 !== attributeNames.length) {
      documentation = `${documentation}\n${
          ClassDocumentationGenerator.generateAttributesDocumentation(
              o, attributeNames)}`;
    }

    let methodNames = Object.getOwnPropertyNames(prototype).filter(
        property => property !== 'constructor');
    if (0 !== methodNames.length) {
      documentation = `${documentation}\n${
          ClassDocumentationGenerator.generateMethodsDocumentation(
              prototype, methodNames)}`;
    }

    return documentation;
  }

  private static generateAttributesDocumentation(
      o: any, attributeNames: string[]): string {
    let documentation = 'Attributes\n';
    documentation = `${documentation}----------\n`;

    for (const attributeName of attributeNames) {
      documentation = `${documentation}${
          ClassDocumentationGenerator.generateAttributeDocumentation(
              o, attributeName)}`;
    }

    return documentation;
  }

  private static generateMethodsDocumentation(
      prototype: any, methodNames: string[]): string {
    let documentation = 'Methods\n';
    documentation = `${documentation}-------\n`;

    for (const methodName of methodNames) {
      documentation = `${documentation}${
          ClassDocumentationGenerator.generateMethodDocumentation(
              prototype, methodName)}`;
    }

    return documentation;
  }

  private static generateAttributeDocumentation(o: any, attributeName: string) {
    let documentation = attributeName;

    const attribute = o[attributeName];
    const prototype = Object.getPrototypeOf(attribute);

    // @ts-ignore
    if (global._shida_documentation.classes.has(prototype)) {
      documentation = `${documentation}\n  ${
          // @ts-ignore
          global._shida_documentation.classes.get(prototype)
              .getDescription()}.`;
    }

    documentation = `${documentation}\n`;

    return documentation;
  }

  private static generateMethodDocumentation(
      prototype: any, methodName: string) {
    let documentation = methodName;

    const method = prototype[methodName];

    // @ts-ignore
    if (global._shida_documentation.methods.has(method)) {
      // @ts-ignore
      const description = global._shida_documentation.methods.get(method)
                              .getDescription()
                              .split('\n')
                              .map((line: string) => `  ${line}`)
                              .join('\n');

      documentation = `${documentation}\n${description}.`;
    }

    documentation = `${documentation}\n`;

    return documentation;
  }
}
