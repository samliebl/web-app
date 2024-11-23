# Web App

Demonstrating some facility with REST APIs and what you can do with them. I also talk about the client-side AJAX code that's bringing this all together for a better user experience.

Find it live at [app.samliebl.com](https://app.samliebl.com).

### REST API demos

1. Demonstration of a GET API call/request  
    1. Rendering the site with Nunjucks via Express
1. Two Demonstrations of POST API call/requests
    1. A simple POST API call/request
    1. A more complex POST request
1. Note on the client-side JavaScript

--

### Directory structure

```
.
|- .env¹
|- .env.example²
|- views/
|  |- _layouts/
|  |  |- base.njk
|  |- index.njk
|  |- error.njk
|- public/
|  |- css/
|    |- main.css
|  |- js/
|    |- main.js
|- uploads/³
|- server.js

---
Notes:
1. You will add your own
2. As an example, with placeholder data, for what yours would look like
3. where the audio files & transcription takes place
```

Take a look at the source code—mostly in `server.js` and then in the templates directory (`views/`) for the client-side code.

## License

MIT