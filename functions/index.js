const functions = require('firebase-functions');
const { default: next } = require('next');
const path = require('path');

// Initialize the Next.js app
const nextApp = next({
  dev: false,
  conf: {
    distDir: '.next',
  },
});
const handle = nextApp.getRequestHandler();

// Create a Firebase Function to handle all the requests
exports.nextServer = functions.https.onRequest((req, res) => {
  console.log(`File: ${req.originalUrl}`);
  
  // Initialize Next.js app on the first invocation
  return nextApp.prepare().then(() => {
    return handle(req, res);
  });
}); 