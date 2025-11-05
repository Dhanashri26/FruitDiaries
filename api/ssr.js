// Vercel serverless function for Angular SSR
// This file is used by Vercel to run SSR for all routes

export default async function handler(req, res) {
  // Import the Express app from the built server
  const { app } = await import('../dist/fruitdiaries/server/server.mjs');
  
  // Create a new Express app instance for this request
  const expressApp = app();
  
  // Handle the request through Express
  return new Promise((resolve, reject) => {
    expressApp(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

