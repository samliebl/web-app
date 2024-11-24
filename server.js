import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js'; // Import modularized routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the project root for consistent path resolution
const projectRoot = __dirname;

// Configure Nunjucks with layouts
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use modularized routes
app.use((req, res, next) => {
    req.projectRoot = projectRoot; // Attach project root to request object
    next();
});
app.use('/', routes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
