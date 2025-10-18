// data/seedUsers.js
require('dotenv').config();
const mongoose = require('mongoose');

// Reuse the app's DB connection + model registration
require('../app_server/models/db');   // connects + registers Trip + User (because db.js requires ./user)

const User = mongoose.model('User');

(async () => {
  try {
    const email = 'admin@example.com';
    const password = 'P@ssw0rd!';
    const name = 'Admin';

    let user = await User.findOne({ email });
    if (user) {
      console.log(`User already exists: ${email}`);
    } else {
      user = new User({ name, email });
      await user.setPassword(password);
      await user.save();
      console.log(`Seeded admin user: ${email} / ${password}`);
    }
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed (seeder).');
  }
})();