import 'zone.js/node';
import express from 'express';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import bootstrap from './src/main.server';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distFolder = resolve(__dirname, './dist/fruitdiaries/browser');
const indexHtml = join(distFolder, 'index.html');

export function app(): express.Express {
  const server = express();
  const commonEngine = new CommonEngine();

  server.get('/api/ping', (req, res) => {
    res.json({ message: 'Angular SSR working ✅' });
  });

  server.get('*', async (req, res, next) => {
    try {
      const html = await commonEngine.render({
        bootstrap,
        documentFilePath: indexHtml,
        url: req.originalUrl,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      });
      res.status(200).send(html);
    } catch (err) {
      next(err);
    }
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => {
    console.log(`✅ Angular SSR running on http://localhost:${port}`);
  });
}

run();
