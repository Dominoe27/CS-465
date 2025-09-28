// app_server/routes/api.js
// Trip JSON endpoints. Keep these lightweight and predictable.
const express = require('express');
const router = express.Router();
const trips = require('../controllers/api.trips');

// List all trips: GET /api/trips
router.get('/trips', trips.listTrips);

// Get a single trip by code: GET /api/trips/:tripCode
router.get('/trips/:tripCode', (req, res, next) => {
  // Quick param sanity check so we fail fast on empty/whitespace
  if (!req.params.tripCode || !String(req.params.tripCode).trim()) {
    return res.status(400).json({ message: 'tripCode is required' });
  }
  return trips.getTripByCode(req, res, next);
});

module.exports = router;
