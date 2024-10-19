import {ClassDocumentationGenerator, DocumentClass, DocumentMethod, MethodDocumentationGenerator} from './documentation/index.js';
import {JavaCli, JavaInitializer} from './java/index.js';
import {ConsoleSink, LogcatSink, Logger} from './logger/index.js';

@DocumentClass('Shida', 'Shida APIs')
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

  @DocumentMethod(
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
    if (global._shidaDocumentation.classes.has(prototype)) {
      this.#consoleLogger.log(this.#classDocumentationGenerator.generate(
          // @ts-ignore
          o, global._shidaDocumentation.classes.get(prototype)));
    }

    // @ts-ignore.
    if (global._shidaDocumentation.methods.has(o)) {
      this.#consoleLogger.log(this.#methodDocumentationGenerator.generate(
          // @ts-ignore
          global._shidaDocumentation.methods.get(o)));
    }
  }
}
