import express from 'express';
import nunjucks from 'nunjucks';
import { config } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';

// Load environment variables
config({ path: './.env' });

// Initialize Express app
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configure Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

// Use modularized routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
