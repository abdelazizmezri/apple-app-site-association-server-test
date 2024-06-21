const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to set the correct Content-Type header
app.use((req, res, next) => {
  if (req.url === '/.well-known/apple-app-site-association') {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});

// Route to serve the apple-app-site-association file
app.get('/.well-known/apple-app-site-association', (req, res) => {
  const filePath = path.join(__dirname, '.well-known/apple-app-site-association');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

// Route to serve the apple-app-site-association file
app.get('/', (req, res) => {
  res.status(200).send('Bonjour');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});