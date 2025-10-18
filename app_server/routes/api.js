// app_server/routes/api.js
// Trip + Auth JSON endpoints for the SPA. Keep it lean, predictable, and secure.
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Protect helper: rejects requests without a valid Bearer token
const requireAuth = passport.authenticate('jwt', { session: false });

// Trips controller (existing)
const {
  listTrips,
  getTripById,
  addTrip,
  updateTrip,
  deleteTrip,
  getTripByCode
} = require('../controllers/api.trips');

// Auth controller 
const authCtl = require('../controllers/auth');

// ---------------------------------------------
// Auth endpoints — used by the admin login/register flow
// ---------------------------------------------
// POST /api/auth/register  -> create user, return JWT
router.post('/auth/register', authCtl.register);

// POST /api/auth/login     -> validate creds, return JWT
router.post('/auth/login', authCtl.login);

// ---------------------------------------------
// Params: normalize/validate identifiers up front
// ---------------------------------------------
// Validate :tripid as a Mongo ObjectId so controllers stay tidy
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

// ---------------------------------------------
// Trips — public reads, admin writes
// ---------------------------------------------
// LIST + CREATE: /api/trips
router.route('/trips')
  .get(listTrips)           // Public: list all trips
  .post(requireAuth, addTrip); // Admin-only: create new trip

// READ/UPDATE/DELETE BY ID: /api/trips/:tripid
router.route('/trips/:tripid')
  .get(getTripById)            // Public: fetch one by _id
  .put(requireAuth, updateTrip)   // Admin-only: update
  .delete(requireAuth, deleteTrip); // Admin-only: delete

// READ BY CODE: /api/trips/code/:tripCode (public)
router.get('/trips/code/:tripCode', getTripByCode);

// quick sanity probe while wiring things up
// router.get('/ping', (_req, res) => res.json({ ok: true, where: 'api' }));

module.exports = router;