import 'zone.js/node';
import express from 'express';
import { join } from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_FOLDER = join(__dirname, 'dist/fruitdiaries/browser');
const SERVER_BUNDLE = join(__dirname, 'dist/fruitdiaries/server/main.server.mjs');

const app = express();

let commonEngine: CommonEngine | null = null;

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*.*', express.static(DIST_FOLDER, { maxAge: '1y' }));

app.get('*', async (req, res, next) => {
  try {
    if (!commonEngine) {
      const { AppServerModule } = await import(SERVER_BUNDLE);
      commonEngine = new CommonEngine();
      await commonEngine.render({
        bootstrap: AppServerModule,
        documentFilePath: join(DIST_FOLDER, 'index.html'),
        url: req.originalUrl,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      }).then(html => res.status(200).send(html));
    } else {
      const html = await commonEngine.render({
        bootstrap: (await import(SERVER_BUNDLE)).AppServerModule,
        documentFilePath: join(DIST_FOLDER, 'index.html'),
        url: req.originalUrl,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
      res.status(200).send(html);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default app;
