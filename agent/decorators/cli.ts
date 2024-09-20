type Parameter = {
  name: string,
  type: string,
  optional: boolean,
  description: string,
};

type ReturnValue = {
  type: string,
  description: string,
};

function generateReturnValueHelp(returnValue: ReturnValue): string {
  let help = `Returns\n`;
  help = `${help}-------\n`;
  help = `${help}${returnValue.type}\n`;
  help = `${help}  ${returnValue.description}.\n`;

  return help;
}

function generateParametersHelp(parameters: Parameter[]): string {
  let help = `Parameters\n`;
  help = `${help}----------\n`;

  for (const parameter of parameters!) {
    help = `${help}${parameter.name} : ${parameter.type}`;
    if (parameter.optional) {
      help = `${help}, optional`;
    }

    help = `${help}\n  ${parameter.description}.\n`;
  }

  return help;
}

function generateHelp(
    description: string, parameters: Parameter[],
    returnValue?: ReturnValue): string {
  let help = `${description}.\n`;

  if (0 !== parameters.length) {
    help = `${help}\n${generateParametersHelp(parameters)}`;
  }

  if (typeof returnValue !== 'undefined') {
    help = `${help}\n${generateReturnValueHelp(returnValue)}`;
  }

  return help;
}

export function cli(
    description: string, parameters: Parameter[],
    returnValue?: ReturnValue): Function {
  const help = generateHelp(description, parameters, returnValue);

  return function(
      _target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.help = function() {
      console.log(help);
    }
  }
}
