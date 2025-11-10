// Vercel serverless function for Angular SSR
// This file is used by Vercel to run SSR for all routes
// Using createRequire to import CommonJS module from ES module

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default async function handler(req, res) {
  try {
    // Import the Express app from the built server (CommonJS)
    // The path is relative to where Vercel runs the function
    const serverModule = require('../dist/fruitdiaries/server/main.js');
    
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
