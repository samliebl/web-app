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

### Routes

Each route/API request is modularized into its own route in a `routes/` directory. There's a `routes/index.js` that collects all the route modules and exports them up to `server.js`, which in turn puts them in the mix like so...

```js
app.use('/', routes);
```

#### Notes on paths

The transcription feature allows users to download a plain text file of the transcription. To support this, there's an `uploads/` directory located at the project's root level. Since path resolution within `routes/` files can be tricky (e.g., `__dirname` resolves to the `routes/` directory), the app uses a middleware function defined before `app.use()` for the routes. This middleware attaches the project root path to the `request` object as `req.projectRoot`. By consistently using `req.projectRoot` to construct paths in route handlers, we ensure that all file operations (e.g., reading or writing in `uploads/`) reliably point to the correct directory, regardless of where the route files are located.

```js
// Use modularized routes
app.use((req, res, next) => {
    req.projectRoot = projectRoot; // Attach project root to request object
    next();
});
```

### Directory structure

```
.
├╴ .env¹
├╴ .env.example²
├╴ views/
│  ├╴ _layouts/
│  │   └╴ base.njk
│  ├╴ index.njk
│  └╴ error.njk
├╴ public/
│  ├╴ css/
│  │  └╴ main.css
│  └╴ js/
│     └╴ main.js
├╴ routes/
│  ├╴ download-transcription.js
│  ├╴ home.js
│  ├╴ index.js
│  ├╴ submit.js
│  └╴ transcribe.njk
├╴ uploads/³
└╴ server.js

---
Notes:
1. You will add your own
2. As an example, with placeholder data, for what yours would look like
3. where the audio files & transcription takes place
```

Take a look at the source code—mostly in `server.js` and then in the templates directory (`views/`) for the client-side code.

## License

MIT