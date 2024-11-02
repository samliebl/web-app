# Web App

```
.
|- .env
|- .env.example
|- .gitignore
|- views/
|	|- _layouts/
|	|	|- base.njk
|	|- index.njk
|- node_modules/
|- package-lock.json
|- package.json
|- public/
|	|- css/
|		|- tachons.min.css
|	|- js/
|		|- main.js
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
        index: 'Placeholder content.'
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

```html
<!-- views/_layouts/base.njk -->
<!doctype html>
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>{{ site.title }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/tachyons.min.css">
</head>

<body>
    {% block content %}
    {% endblock %}
    <script type="text/javascript" src="js/main.js"></script>
</body>

</html>
```

```html
<!-- views/index.njk -->
{% extends "_layouts/base.njk" %}
{% block content %}
<h1 class="f4">{{ site.title }}</h1>
<p>{{ pages[0].index }}</p>
<!-- Form to test POST request -->
<form action="/submit" method="POST" class="mt3">
    <input type="text" name="name" placeholder="Enter your name" class="pa2 mb2">
    <button type="submit" class="pa2 bg-blue white">Submit</button>
</form>
{% endblock %}
```

`public/css/tachyons.min.css`
`public/js/main.css`