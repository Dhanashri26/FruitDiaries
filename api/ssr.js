// Vercel serverless function for Angular SSR
// This file is used by Vercel to run SSR for all routes

export default async function handler(req, res) {
  try {
    // Import the Express app from the built server
    // The path is relative to where Vercel runs the function
    const serverModule = await import('../dist/fruitdiaries/server/server.mjs');
    const app = serverModule.app || serverModule.default?.app || serverModule.default;
    
    if (!app) {
      throw new Error('Could not find app export from server.mjs');
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

