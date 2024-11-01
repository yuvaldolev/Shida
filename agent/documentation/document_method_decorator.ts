import {DocumentationInitializer} from './documentation_initializer.js';
import {MethodDocumentationDescriptor} from './method_documentation_descriptor.js';
import {MethodParameterDocumentationDescriptor} from './method_parameter_documentation_descriptor.js';
import {MethodReturnValueDocumentationDescriptor} from './method_return_value_documentation_descriptor.js';

export function DocumentMethod(
    description: string, parameters?: MethodParameterDocumentationDescriptor[],
    returnValue?: MethodReturnValueDocumentationDescriptor): Function {
  return function(
      _target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const documentation_initializer = new DocumentationInitializer();
    documentation_initializer.initialize();

    // @ts-ignore
    global._shidaDocumentation.methods.set(
        descriptor.value,
        new MethodDocumentationDescriptor(
            propertyKey, description, parameters, returnValue),
    );
  }
}
