import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Data object for rendering context
const data = {
    site: {
        title: 'Web App',
        css: [
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/atom-one-light.min.css',
            '/css/index.css'
        ],
        js: [
            'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js',
            '/js/main.js'
        ]
    },
    pages: [{
        index: null
    }]
};

// Wrapper for data to make templating easier
const wrapper = { data };

// Configure Nunjucks with layouts
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index.njk', wrapper); // Pass the wrapper as context
});

app.post('/submit', (req, res) => {
    const { name } = req.body;
    res.json({ message: `Hello, ${name}! This is a POST response.` });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});