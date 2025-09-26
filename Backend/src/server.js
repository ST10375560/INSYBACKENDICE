import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import http from 'http';
import mongoose from 'mongoose';
import routes from './routes/index.js';

// Load environment variables from .env file
dotenv.config();

// initialise express app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// middleware to parse JSON bodies
app.use(express.json());

// Basic health endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api', routes);

// HTTPS certificates (relative to Backend/). If not present, fall back to HTTP.
let useHttps = false;
let ssloptions = undefined;
try {
  const keyUrl = new URL('../certs/localhost-key.pem', import.meta.url);
  const certUrl = new URL('../certs/localhost.pem', import.meta.url);
  if (fs.existsSync(keyUrl) && fs.existsSync(certUrl)) {
    ssloptions = {
      key: fs.readFileSync(keyUrl),
      cert: fs.readFileSync(certUrl),
    };
    useHttps = true;
  }
} catch (e) {
  useHttps = false;
}

// MongoDB connection
mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Start server
if (useHttps && ssloptions) {
  https.createServer(ssloptions, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
  });
} else {
  http.createServer(app).listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
  });
}
