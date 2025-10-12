// app_server/routes/api.js
// Trip JSON endpoints. Keep these lightweight and predictable.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
  listTrips,
  getTripById,
  addTrip,
  updateTrip,
  deleteTrip,
  getTripByCode
} = require('../controllers/api.trips');

// Validate :tripid as a Mongo ObjectId
router.param('tripid', (req, res, next, tripid) => {
  if (!mongoose.Types.ObjectId.isValid(tripid)) {
    return res.status(400).json({ message: 'Invalid trip id' });
  }
  next();
});

// Normalize and validate :tripCode
router.param('tripCode', (req, res, next, tripCode) => {
  const raw = String(tripCode || '').trim();
  if (!raw) return res.status(400).json({ message: 'tripCode is required' });
  req.params.tripCode = raw;
  next();
});

// LIST + CREATE: /api/trips
router.route('/trips')
  .get(listTrips)     // GET all
  .post(addTrip);     // POST create

// READ/UPDATE/DELETE BY ID: /api/trips/:tripid
router.route('/trips/:tripid')
  .get(getTripById)   // GET one by _id
  .put(updateTrip)    // PUT update
  .delete(deleteTrip);// DELETE

// /api/trips/code/:tripCode
router.get('/trips/code/:tripCode', getTripByCode);

module.exports = router;