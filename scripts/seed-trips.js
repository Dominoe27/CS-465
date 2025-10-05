// scripts/seed-trips.js
// Seed trips from data/trips.json. Keep your keys (price/location/perPerson) and mirror to cost/resort when needed.
require('dotenv').config();
const path = require('path');
const mongoose = require('../app_server/models/db');
const Trip = require('../app_server/models/trip');

(async () => {
  try {
    const raw = require(path.join(__dirname, '..', 'data', 'trips.json'));
    if (!Array.isArray(raw)) throw new Error('data/trips.json must be a JSON array');

    const normalized = raw.map((t, idx) => {
      const doc = {
        code: String(t.code || '').trim().toUpperCase(),
        name: String(t.name || '').trim(),
        length: Number(t.length),
        start: new Date(t.start),
        image: String(t.image || '').trim(),
        description: String(t.description || '').trim(),

        // your JSON fields
        price: Number(t.price),
        location: String(t.location || '').trim(),
        perPerson: t.perPerson === true,

        // mirror fields for alt schemas
        cost: t.price != null ? Number(t.price) : undefined,
        resort: t.location != null ? String(t.location).trim() : undefined
      };

      const missing = [];
      // cover both naming conventions so validation passes either way
      const hasPriceOrCost = !(Number.isNaN(doc.price) && Number.isNaN(doc.cost));
      const hasLocationOrResort = !!(doc.location || doc.resort);

      if (!doc.code) missing.push('code');
      if (!doc.name) missing.push('name');
      if (Number.isNaN(doc.length)) missing.push('length');
      if (isNaN(doc.start.getTime())) missing.push('start');
      if (!hasLocationOrResort) missing.push('location|resort');
      if (!hasPriceOrCost) missing.push('price|cost');
      if (!doc.image) missing.push('image');
      if (!doc.description) missing.push('description');

      if (missing.length) {
        throw new Error(`Record ${idx} missing or invalid: ${missing.join(', ')}`);
      }
      return doc;
    });

    await Trip.deleteMany({});
    const result = await Trip.insertMany(normalized, { ordered: true });
    console.log(`Seeded trips: ${result.length}`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
})();