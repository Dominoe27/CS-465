// app_server/controllers/api.trips.js
// Trip API handlers — clean JSON for UI and Postman.

const Trip = require('../models/trip'); // model exports mongoose.model('Trip', ...)

// GET /api/trips - list all trips
const listTrips = async (_req, res) => {
  try {
    const trips = await Trip.find({}).select('-__v').lean();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
};

// GET /api/trips/code/:tripCode - fetch one trip by code
const getTripByCode = async (req, res) => {
  try {
    const raw = (req.params.tripCode ?? '').toString().trim();
    if (!raw) return res.status(400).json({ message: 'tripCode is required' });
    const code = raw.toUpperCase();

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

// GET /api/trips/:tripid - fetch one trip by Mongo _id
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripid).select('-__v').lean();
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trip', error: err.message });
  }
};

// POST /api/trips - create a new trip with detailed validation feedback
const addTrip = async (req, res) => {
  try {
    // Normalize types to match the schema (numbers, boolean, Date)
    const payload = {
      code: String(req.body.code ?? '').trim().toUpperCase(),
      name: String(req.body.name ?? '').trim(),
      length: req.body.length !== undefined ? Number(req.body.length) : undefined,
      start: req.body.start ? new Date(req.body.start) : undefined,
      resort: String(req.body.resort ?? '').trim(),
      price: req.body.price !== undefined ? Number(req.body.price) : undefined,
      perPerson: typeof req.body.perPerson === 'boolean'
        ? req.body.perPerson
        : Boolean(req.body.perPerson),
      image: String(req.body.image ?? '').trim(),
      description: String(req.body.description ?? '').trim()
    };

    // Useful during Module 6 testing
    console.log('Create Trip payload:', payload);

    const created = await Trip.create(payload);
    res.status(201).json(created);
  } catch (err) {
    // Return granular validation/cast info so the SPA can display it
    if (err?.name === 'ValidationError' && err?.errors) {
      const details = Object.entries(err.errors).map(([field, e]) => `${field}: ${e.message}`);
      return res.status(400).json({ message: `Validation failed: ${details.join('; ')}` });
    }
    if (err?.name === 'CastError') {
      return res.status(400).json({ message: `Invalid value for "${err.path}": ${String(err.value)}` });
    }
    console.error('Create trip error:', err);
    res.status(400).json({ message: err?.message || 'Failed to create trip' });
  }
};

// PUT /api/trips/:tripid - update an existing trip (validators + explicit $set)
const updateTrip = async (req, res) => {
  try {
    // Only include provided fields; coerce to schema types
    const updates = {
      ...(req.body.code !== undefined && { code: String(req.body.code).trim().toUpperCase() }),
      ...(req.body.name !== undefined && { name: String(req.body.name).trim() }),
      ...(req.body.length !== undefined && { length: Number(req.body.length) }),
      ...(req.body.start !== undefined && { start: req.body.start ? new Date(req.body.start) : undefined }),
      ...(req.body.resort !== undefined && { resort: String(req.body.resort).trim() }),
      ...(req.body.price !== undefined && { price: Number(req.body.price) }), // include price
      ...(req.body.perPerson !== undefined && {
        perPerson: typeof req.body.perPerson === 'boolean'
          ? req.body.perPerson
          : Boolean(req.body.perPerson)
      }),
      ...(req.body.image !== undefined && { image: String(req.body.image).trim() }),
      ...(req.body.description !== undefined && { description: String(req.body.description).trim() })
    };

    // Log for quick diagnosis 
    console.log('Update Trip id:', req.params.tripid);
    console.log('Update payload:', updates);

    const updated = await Trip.findByIdAndUpdate(
      req.params.tripid,
      { $set: updates },
      { new: true, runValidators: true } // runValidators keeps schema rules in play
    ).select('-__v');

    if (!updated) return res.status(404).json({ message: 'Trip not found' });
    res.json(updated);
  } catch (err) {
    if (err?.name === 'ValidationError' && err?.errors) {
      const details = Object.entries(err.errors).map(([field, e]) => `${field}: ${e.message}`);
      return res.status(400).json({ message: `Validation failed: ${details.join('; ')}` });
    }
    if (err?.name === 'CastError') {
      return res.status(400).json({ message: `Invalid value for "${err.path}": ${String(err.value)}` });
    }
    console.error('Update trip error:', err);
    res.status(400).json({ message: err?.message || 'Failed to update trip' });
  }
};

// DELETE /api/trips/:tripid - remove a trip
const deleteTrip = async (req, res) => {
  try {
    const deleted = await Trip.findByIdAndDelete(req.params.tripid).lean();
    if (!deleted) return res.status(404).json({ message: 'Trip not found' });
    res.status(204).json(null);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete trip', error: err.message });
  }
};

module.exports = {
  listTrips,
  getTripByCode,
  getTripById,
  addTrip,
  updateTrip,
  deleteTrip
};