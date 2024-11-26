import { Router } from 'express';

const router = Router();

// Data object for rendering context
const data = {
    site: {
        title: 'Web App',
        links: [
            {
                rel: 'stylesheet',
                href: '/css/main.css'
            },
        ],
        js: [
            '/js/main.js'
        ]
    },
    pages: [{
        index: null
    }]
};

// Wrapper for data to make templating easier
const wrapper = { data };

// GET route to render the homepage with Nunjucks
router.get('/', (req, res) => {
    res.render('index.njk', { data: undefined, error: undefined }); // Ensure no result is passed
});

export default router;
