const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express app
const app = express();

// Serve static files from the Next.js build directory
const staticDir = path.join(__dirname, '../.next');
app.use(express.static(staticDir));

// Handle all routes by returning the main HTML file from the Next.js build
app.get('*', (req, res) => {
  // Check if the URL is for an API route
  if (req.path.startsWith('/api/')) {
    return res.status(404).send('API not found');
  }
  
  // Otherwise, return the Next.js app
  try {
    const indexHtml = path.join(staticDir, 'server', 'pages', 'index.html');
    if (fs.existsSync(indexHtml)) {
      res.sendFile(indexHtml);
    } else {
      // Fallback to redirect to the main domain
      res.redirect('https://studylensai.com');
    }
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Server error');
  }
});

// Export the Express app as a Firebase Function
exports.nextServer = functions.https.onRequest(app); 