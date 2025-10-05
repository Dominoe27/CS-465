// app_server/controllers/api.trips.js
// Trip API handlers — return clean JSON for UI and Postman sanity checks.
const Trip = require('../models/trip');

// GET /api/trips - list all trips
const listTrips = async (_req, res) => {
  try {
    // keep payloads lean and predictable
    const trips = await Trip.find({})
      .select('-__v') // remove internal version key
      .lean();

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
};

// GET /api/trips/:tripCode - fetch one trip by code
const getTripByCode = async (req, res) => {
  try {
    // normalize input; empty or junk shouldn't break the query
    const raw = (req.params.tripCode ?? '').toString().trim();
    if (!raw) return res.status(400).json({ message: 'tripCode is required' });

    const code = raw.toUpperCase();

    // case-insensitive match so data lookups stay flexible
    const trip = await Trip.findOne({ code })
      .select('-__v')
      .collation({ locale: 'en', strength: 2 })
      .lean();

    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trip', error: err.message });
  }
};

module.exports = { listTrips, getTripByCode };