# Web App

```
.
|- .env (you will add your own)
|- .env.example
|- .gitignore
|- views/
|  |- _layouts/
|  |  |- base.njk
|  |- index.njk
|- node_modules/
|- package-lock.json
|- package.json
|- public/
|  |- css/
|    |- tachyons.min.css
|  |- js/
|    |- main.js
|- server.js
```

```js
// server.js
import express from 'express';
import nunjucks from 'nunjucks';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Data object for rendering context
const data = {
    site: {
        title: 'Web App'
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
```

## LICENSE.txt