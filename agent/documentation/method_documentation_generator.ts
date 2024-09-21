import {MethodDocumentationDescriptor} from './method_documentation_descriptor.js';
import {MethodParameterDocumentationDescriptor} from './method_parameter_documentation_descriptor.js';
import {MethodReturnValueDocumentationDescriptor} from './method_return_value_documentation_descriptor.js';

export class MethodDocumentationGenerator {
  generate(descriptor: MethodDocumentationDescriptor): string {
    let documentation = `\nMethod: ${descriptor.getName()}\n\n`;
    documentation = `${documentation}${descriptor.getDescription()}.\n`;

    const parameters = descriptor.getParameters();
    if (0 !== parameters.length) {
      documentation = `${documentation}\n${
          MethodDocumentationGenerator.generateParametersDocumentation(
              parameters)}`;
    }

    const returnValue = descriptor.getReturnValue();
    if (typeof returnValue !== 'undefined') {
      documentation = `${documentation}\n${
          MethodDocumentationGenerator.generateReturnValueDocumentation(
              returnValue)}`;
    }

    return documentation;
  }

  private static generateParametersDocumentation(
      parameters: MethodParameterDocumentationDescriptor[]): string {
    let documentation = 'Parameters\n';
    documentation = `${documentation}----------\n`;

    for (const parameter of parameters) {
      documentation = `${documentation}${
          MethodDocumentationGenerator.generateParameterDocumentation(
              parameter)}`;
    }

    return documentation;
  }

  private static generateReturnValueDocumentation(
      returnValue: MethodReturnValueDocumentationDescriptor): string {
    let documentation = 'Returns\n';
    documentation = `${documentation}-------\n`;
    documentation = `${documentation}${returnValue.type}\n`;
    documentation = `${documentation}  ${returnValue.description}.\n`;

    return documentation;
  }

  private static generateParameterDocumentation(
      parameter: MethodParameterDocumentationDescriptor): string {
    let documentation = `${parameter.name} : ${parameter.type}`

    if (parameter.optional) {
      documentation = `${documentation}, optional`;
    }

    documentation = `${documentation}\n  ${parameter.description}.\n`;

    if (typeof parameter.defaultValue !== 'undefined') {
      documentation =
          `${documentation}  By default, ${parameter.defaultValue}.\n`;
    }

    return documentation;
  }
}
