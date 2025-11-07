import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { provideServerRendering } from '@angular/platform-server';
import { renderApplication } from '@angular/platform-server';
import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distFolder = join(__dirname, 'dist/fruitdiaries/browser');
const serverDistFolder = join(__dirname, 'dist/fruitdiaries/server');

app.use(express.static(distFolder, {
  maxAge: '1y',
  index: false
}));

app.get('*', async (req, res) => {
  const { renderModule } = await import('@angular/platform-server');
  const { AppServerModule } = await import(`${serverDistFolder}/main.js`);

  const html = await renderModule(AppServerModule, {
    url: req.originalUrl,
    document: '<app-root></app-root>'
  });

  res.status(200).send(html);
});

const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});
