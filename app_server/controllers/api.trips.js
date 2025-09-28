// api.trips.js
// Trip API handlers: return clean JSON for the client and for testing.
const Trip = require('../models/trip');

// GET /api/trips, list all trips
const listTrips = async (_req, res) => {
  try {
    // lean(): return plain objects
    const trips = await Trip.find({}).lean();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
};

// GET /api/trips/:tripCode, fetch one trip by code
const getTripByCode = async (req, res) => {
  try {
    const code = String(req.params.tripCode || '').toUpperCase();
    const trip = await Trip.findOne({ code }).lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trip', error: err.message });
  }
};

module.exports = { listTrips, getTripByCode };
