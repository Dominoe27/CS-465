// app_server/models/db.js
// Connects Mongoose to MongoDB using either MONGODB_URI or DB_HOST + fixed db name "travlr".
require('dotenv').config();
const mongoose = require('mongoose');

const dbName = 'travlr';
const uri =
  process.env.MONGODB_URI || `mongodb://${process.env.DB_HOST || '127.0.0.1'}/${dbName}`;

mongoose.set('strictQuery', true);

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected');
    console.log(`URI: ${uri}`);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Close the connection on app termination (helps with clean shutdowns during development)
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

module.exports = mongoose;