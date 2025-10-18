// app.js
// Express setup for HBS + MVC, plus API mounting and DB connect.
require('dotenv').config();

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// Connect Mongo once on app boot; logs status to the console
// Also registers Trip + User models (db.js requires both)
require('./app_server/models/db');

// Wire up JWT strategy after models are registered
require('./app_server/config/passport');
const passport = require('passport');

// Initialize Passport (must be after app is created)
app.use(passport.initialize());

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

// 404 handling with API awareness (no HBS templates required)
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'Not found' });
  }
  // keep this simple so missing templates don’t crash the server
  res.status(404).send('Not found');
});

// Generic error handler (don’t try to render a view)
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Server error';

  if (req.path.startsWith('/api')) {
    return res.status(status).json({ message });
  }
  res.status(status).send(message);
});

module.exports = app;