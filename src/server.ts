import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.use(express.json());
const angularApp = new AngularNodeAppEngine();

const fs = require("fs");

function shuffleArray(array: any[]) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

app.get('/api/palavras', (req, res) => {
  try {
    const selectedContext = req.query['contexto'];
    const words = JSON.parse(fs.readFileSync("palavras.json"));
    const contexts = words.contextos;
    const currentContext = contexts.find((context: any) => context.nome === selectedContext);
    const shuffled = shuffleArray(currentContext.palavras);
    const items = shuffled.slice(0, 5).map(item => ({
      palavra: item.nome,
      imagemUrl: item.imagem
    }));
    const response = {
      contexto: selectedContext,
      itens: items
    };
    res.send(response);
  } catch(error: unknown) {
    if (error instanceof Error) {
      res.status(500);
      res.send({ message: error.message});
    }
  } 
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
