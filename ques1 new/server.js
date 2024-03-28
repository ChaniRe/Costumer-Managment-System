
// Import necessary libraries
import express from 'express';
import { json, urlencoded } from 'express';
import router from './router.js';
import { mongoConnection } from './db.js';
import { fileURLToPath } from 'url';
import path from 'path';

// Create an Express object
const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(json());
app.use(urlencoded({ extended: true }));

// API routes
app.use('/api', router);

// Resolve directory paths using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');

// Static files
app.use(express.static(publicPath));

// Server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// MongoDB connection
mongoConnection();

