# Web App

Demonstrating some facility with REST APIs and what you can do with them. I also talk about the client-side AJAX code that's bringing this all together for a better user experience.

Find it live at app.samliebl.com

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
|  |- error.njk
|- public/
|  |- css/
|    |- tachyons.min.css
|  |- js/
|    |- main.js
|- uploads/ (where the audio files & transcription takes place)
|- server.js
```

Take a look at the source code—mostly in `server.js` and then in the templates directory (`views/`) for the client-side code.

## LICENSE

MIT