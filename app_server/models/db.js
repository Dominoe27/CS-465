// app_server/models/db.js
// Mongoose connection: prefers MONGODB_URI, otherwise builds from parts. Keep logs clean and shutdown tidy.
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
// in dev I want autoIndex on for schema tweaks; off in prod for perf
mongoose.set('autoIndex', process.env.NODE_ENV !== 'production');

// Build URI if one isn't provided
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || '27017';
const name = process.env.DB_NAME || 'travlr';

// If user/pass are set, add simple auth segment for local/self-hosted cases
const user = process.env.DB_USER || '';
const pass = process.env.DB_PASS || '';
const auth = user && pass ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@` : '';

const fallbackUri = `mongodb://${auth}${host}:${port}/${name}`;
const uri = process.env.MONGODB_URI || fallbackUri;

// Hide credentials in logs
const mask = (u) => u.replace(/:\/\/(.*?@)/, '://<credentials>@');

// One-time connect on app start
(async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
    console.log(`URI: ${mask(uri)}`);
    require('./trip');  
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

// Basic connection state logging to help during setup/testing
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB runtime error:', err.message);
});

// Clean shutdown during dev restarts
const shutdown = async (signal) => {
  try {
    await mongoose.connection.close();
    console.log(`MongoDB connection closed on ${signal}`);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = mongoose;