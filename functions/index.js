const functions = require('firebase-functions');
const { default: next } = require('next');
const admin = require('firebase-admin');
const { nextServerConfig } = require('./next-server');

admin.initializeApp();

let nextjsServer;
let nextjsHandle;

exports.nextServer = functions.https.onRequest(async (req, res) => {
  console.log('Request path:', req.path);
  
  if (!nextjsServer) {
    console.log('Initializing Next.js server...');
    nextjsServer = next(nextServerConfig);
    nextjsHandle = nextjsServer.getRequestHandler();
  }
  
  try {
    await nextjsServer.prepare();
    return nextjsHandle(req, res);
  } catch (error) {
    console.error('Error during request handling:', error);
    res.status(500).send('Internal Server Error');
    return;
  }
});