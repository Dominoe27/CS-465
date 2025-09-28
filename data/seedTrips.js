// Seeder: loads data/trips.json and writes it into MongoDB "trips" collection.
// Run with: npm run seed
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('../app_server/models/db');
const Trip = require('../app_server/models/trip');

(async () => {
  try {
    // Read the raw JSON from /data. Expecting an array of trip objects.
    const filePath = path.join(__dirname, 'trips.json');
    const source = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Map JSON fields to the schema fields we defined.
    // Note: input uses "location"; we store it as "resort".
    const trips = source.map(t => ({
      code: String(t.code || '').toUpperCase(),
      name: String(t.name || ''),
      length: Number(t.length),
      start: new Date(t.start),
      resort: String(t.location || ''),      // location -> resort
      price: Number(t.price),                // numeric price
      perPerson: Boolean(t.perPerson),       // boolean flag
      image: t.image || '',
      description: t.description || ''
    }));

    // Keep only records that meet the required fields/constraints.
    const valid = trips.filter(t =>
      t.code &&
      t.name &&
      t.resort &&
      Number.isFinite(t.length) && t.length >= 1 &&
      t.start instanceof Date && !isNaN(t.start) &&
      Number.isFinite(t.price)
    );

    // Clean insert for predictable dev/test cycles.
    await Trip.deleteMany({});
    const result = valid.length ? await Trip.insertMany(valid, { ordered: false }) : [];

    console.log(`Seeded ${result.length} trips.`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    // Close DB so the process exits cleanly.
    await mongoose.connection.close();
    process.exit(0);
  }
})();