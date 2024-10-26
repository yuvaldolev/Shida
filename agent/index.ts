import {ShidaCli} from './cli.js';
import {DocumentationRetriever} from './documentation/index.js';

const documentationRetriever = new DocumentationRetriever();

// @ts-ignore
global.shida = new ShidaCli();

rpc.exports = {
  shidaRetrieveDocumentation: expression =>
      documentationRetriever.retrieve(eval(expression)),
}
