function generateMethodsMan(clazz: any, methods: string[]): string {
  let manPage = 'Methods\n';
  manPage = `${manPage}-------\n`;

  for (const method of methods) {
    manPage = `${manPage}${method}`;

    const description = clazz.prototype[method]._description;
    if (typeof description !== 'undefined') {
      manPage = `${manPage}\n  ${description}.`;
    }

    manPage = `${manPage}\n`;
  }

  return manPage;
}

function generateManPage(clazz: any, description: string): string {
  let manPage = `\n${description}.\n`;

  let methods = Object.getOwnPropertyNames(clazz.prototype)
                    .filter(property => property !== 'constructor');
  if (0 !== methods.length) {
    manPage = `${manPage}\n${generateMethodsMan(clazz, methods)}`;
  }

  return manPage;
}

export function manClass(description: string): any {
  return function(clazz: any) {
    clazz.prototype._manPage = generateManPage(clazz, description);
  }
}
