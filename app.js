// app.js
// Main Express setup file. This is where I wire everything together for Module 2.
// Moving from static HTML (Module 1) to MVC + Handlebars (Module 2).

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Tell Express where to find my views and set HBS as the engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Hook in my partials (header/footer, etc.)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Standard middleware stuff (logging, parsing JSON, cookies, static files)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Bring in my routes (this points to app_server/routes/index.js)
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

module.exports = app;