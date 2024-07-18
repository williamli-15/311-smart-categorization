'use strict';

const cors = require('cors');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.get('/api/model_info', (req, res) => {
  const date = fs.readFileSync('model_info.txt', 'utf8');
  return res.status(200).json({
    last_updated: date.trim()
  });
});

app.use(express.static(path.join(__dirname, 'build')));

// Serve service-worker.js with correct MIME type
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'service-worker.js'), {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache'
    }
  });
});

app.get('/*', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || port);
console.log(`Running on http://localhost:${port}`);
