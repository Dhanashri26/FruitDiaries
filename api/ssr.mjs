// Vercel serverless function for Angular SSR
// This file is used by Vercel to run SSR for all routes
// Using createRequire to import CommonJS module from ES module

import { createRequire } from 'module';
import { join } from 'path';
import { pathToFileURL } from 'url';

// Use process.cwd() to construct file URL for createRequire
// Vercel serverless functions run from /var/task, so we use process.cwd()
const fileUrl = pathToFileURL(join(process.cwd(), 'api/ssr.mjs')).href;
const require = createRequire(fileUrl);

export default async function handler(req, res) {
  try {
    // Import the Express app from the built server (CommonJS)
    // The path is relative to where Vercel runs the function
    const serverModule = require(join(process.cwd(), 'dist/fruitdiaries/server/main.js'));
    
    // The built server exports the app function (from server.ts)
    // Handle CommonJS exports
    const app = serverModule.app || serverModule.default || serverModule;
    
    if (!app) {
      throw new Error('Could not find app export from server bundle');
    }
    
    // Create a new Express app instance for this request
    const expressApp = typeof app === 'function' ? app() : app;
    
    // Handle the request through Express
    return new Promise((resolve, reject) => {
      expressApp(req, res, (err) => {
        if (err) {
          console.error('SSR Error:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Failed to load SSR server:', error);
    res.status(500).send('SSR Server Error: ' + error.message);
  }
}
