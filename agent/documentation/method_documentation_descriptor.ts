import {MethodParameterDocumentationDescriptor} from './method_parameter_documentation_descriptor.js';
import {MethodReturnValueDocumentationDescriptor} from './method_return_value_documentation_descriptor.js';

export class MethodDocumentationDescriptor {
  private readonly name: string;
  private readonly description: string;
  private readonly parameters?: MethodParameterDocumentationDescriptor[];
  private readonly returnValue?: MethodReturnValueDocumentationDescriptor;

  constructor(
      name: string, description: string,
      parameters?: MethodParameterDocumentationDescriptor[],
      returnValue?: MethodReturnValueDocumentationDescriptor) {
    this.name = name;
    this.description = description;
    this.parameters = parameters;
    this.returnValue = returnValue;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getParameters(): MethodParameterDocumentationDescriptor[]|undefined {
    return this.parameters;
  }

  getReturnValue(): MethodReturnValueDocumentationDescriptor|undefined {
    return this.returnValue;
  }
}
