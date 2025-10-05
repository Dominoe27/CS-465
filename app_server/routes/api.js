// app_server/routes/api.js
// Trip JSON endpoints. Keep these lightweight and predictable.
const express = require('express');
const router = express.Router();
const { listTrips, getTripByCode } = require('../controllers/api.trips');

// Normalize and validate :tripCode once
router.param('tripCode', (req, res, next, tripCode) => {
  const raw = String(tripCode || '').trim();
  if (!raw) return res.status(400).json({ message: 'tripCode is required' });
  req.params.tripCode = raw; // pass normalized value forward
  next();
});

// List all trips: GET /api/trips
router.get('/trips', listTrips);

// Get a single trip by code: GET /api/trips/:tripCode
router.get('/trips/:tripCode', getTripByCode);

module.exports = router;