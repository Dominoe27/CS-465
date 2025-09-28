// app.js
// Express config: views/static, DB bootstrap, and API wiring.

require('dotenv').config();                 // Load env (PORT, DB vars)
require('./app_server/models/db');          // Open MongoDB connection before routes

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine (HBS) + partials/helpers
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
hbs.registerHelper('year', () => new Date().getFullYear());

// core middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// page routes (HBS)
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// JSON API routes
const apiRouter = require('./app_server/routes/api');
app.use('/api', apiRouter);

// API 404 (JSON)
app.use('/api', (_req, res) => res.status(404).json({ message: 'Not found' }));

// non-API 404 (simple text; switch to a view if you add error.hbs)
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.status(404).send('Page not found');
});

// last-stop error handler (keeps API JSON, pages text)
app.use((err, req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  const msg = process.env.NODE_ENV === 'development' ? err.message : 'Server error';
  if (req.path.startsWith('/api/')) return res.status(status).json({ message: msg });
  res.status(status).send(msg);
});

module.exports = app;