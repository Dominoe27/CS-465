// app.js
// Express setup for HBS + MVC, plus API mounting and DB connect.
require('dotenv').config(); // safe if also in server.js

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// connect Mongo once on app boot; logs status to the console
require('./app_server/models/db');

// view engine
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// partials + helpers
hbs.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));
hbs.registerHelper('year', () => new Date().getFullYear());

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MVC routes
const indexRouter = require('./app_server/routes/index');
app.use('/', indexRouter);

// API routes
const apiRouter = require('./app_server/routes/api');
app.use('/api', apiRouter);

// simple health check for uptime monitors
app.get('/health', (_req, res) => res.json({ ok: true }));

// 404 handling with API awareness
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Not found' });
  }
  // if you don’t have a 404.hbs yet, swap this for res.status(404).send('Not found')
  res.status(404).render('404', { title: 'Not found' });
});

// generic error handler; don’t leak stack traces in prod
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  if (req.path.startsWith('/api')) {
    return res.status(status).json({ message: err.message || 'Server error' });
  }
  res.status(status).render('error', {
    message: err.message || 'Server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports = app;
