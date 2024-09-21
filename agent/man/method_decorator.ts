type Parameter = {
  name: string,
  type: string,
  optional: boolean,
  description: string,
  defaultValue?: any,
};

type ReturnValue = {
  type: string,
  description: string,
};

function generateReturnValueMan(returnValue: ReturnValue): string {
  let manPage = 'Returns\n';
  manPage = `${manPage}-------\n`;
  manPage = `${manPage}${returnValue.type}\n`;
  manPage = `${manPage}  ${returnValue.description}.\n`;

  return manPage;
}

function generateParametersMan(parameters: Parameter[]): string {
  let manPage = 'Parameters\n';
  manPage = `${manPage}----------\n`;

  for (const parameter of parameters!) {
    manPage = `${manPage}${parameter.name} : ${parameter.type}`;
    if (parameter.optional) {
      manPage = `${manPage}, optional`;
    }

    manPage = `${manPage}\n  ${parameter.description}.\n`;

    if (typeof parameter.defaultValue !== 'undefined') {
      manPage = `${manPage}  By default, ${parameter.defaultValue}.\n`;
    }
  }

  return manPage;
}

function generateManPage(
    description: string, parameters: Parameter[],
    returnValue?: ReturnValue): string {
  let manPage = `\n${description}.\n`;

  if (0 !== parameters.length) {
    manPage = `${manPage}\n${generateParametersMan(parameters)}`;
  }

  if (typeof returnValue !== 'undefined') {
    manPage = `${manPage}\n${generateReturnValueMan(returnValue)}`;
  }

  return manPage;
}

export function manMethod(
    description: string, parameters: Parameter[],
    returnValue?: ReturnValue): Function {
  return function(
      _target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value._description = description;
    descriptor.value._manPage =
        generateManPage(description, parameters, returnValue);
  }
}
