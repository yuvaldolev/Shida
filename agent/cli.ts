import {ClassDocumentationGenerator, documentClass, documentMethod, MethodDocumentationGenerator} from './documentation/index.js';
import {JavaCli, JavaInitializer} from './java/index.js';
import {ConsoleSink, LogcatSink, Logger} from './logger/index.js';

@documentClass('Shida', 'Shida APIs')
export class ShidaCli {
  readonly java?: JavaCli = undefined;

  readonly #javaInitializer = new JavaInitializer();
  readonly #classDocumentationGenerator = new ClassDocumentationGenerator();
  readonly #methodDocumentationGenerator = new MethodDocumentationGenerator();
  readonly #consoleLogger: Logger;

  constructor() {
    this.#javaInitializer.initialize();

    this.#consoleLogger = new Logger(new ConsoleSink());
    const logcatLogger = new Logger(new LogcatSink('shida'));

    if (Java.available) {
      this.java = new JavaCli(this.#consoleLogger, logcatLogger);
    }
  }

  @documentMethod(
      'Display Shida class/method documentation',
      [
        {
          name: 'o',
          type: 'any',
          optional: false,
          description: 'Object to display documentation for'
        },
      ],
      )
  man(o: any): void {
    const prototype = Object.getPrototypeOf(o);

    // @ts-ignore
    if (global._shida_documentation.classes.has(prototype)) {
      this.#consoleLogger.log(this.#classDocumentationGenerator.generate(
          // @ts-ignore
          o, global._shida_documentation.classes.get(prototype)));
    }

    // @ts-ignore.
    if (global._shida_documentation.methods.has(o)) {
      this.#consoleLogger.log(this.#methodDocumentationGenerator.generate(
          // @ts-ignore
          global._shida_documentation.methods.get(o)));
    }
  }
}
