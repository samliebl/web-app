# Web App

Demonstrating some facility with REST APIs and what you can do with them. I also talk about the client-side AJAX code that's bringing this all together for a better user experience.

### REST API Demos

1. Demonstration of a GET API call/request  
    1. Rendering the site with Nunjucks via Express
1. Two Demonstrations of POST API call/requests
    1. A simple POST API call/request
    1. A more complex POST request
1. Note on the client-side JavaScript

--



```
.
|- .env (You will add your own)
|- .env.example (As an example, with placeholder data, for what yours would look like)
|- views/
|  |- _layouts/
|  |  |- base.njk
|  |- index.njk
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

Client-side JavaScript



## LICENSE

MIT