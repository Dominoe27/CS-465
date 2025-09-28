// Trip model: shape of a trip record the API returns and the seed script writes.
const mongoose = require('./db');

const tripSchema = new mongoose.Schema({
  // Course expects uppercase codes (e.g., GALE2025). Indexed for quick lookups by code.
  code: { type: String, required: true, trim: true, uppercase: true, index: true },

  // Display name shown to users.
  name: { type: String, required: true, trim: true },

  // Duration in days. Must be at least 1.
  length: { type: Number, required: true, min: 1 },

  // First available start date.
  start: { type: Date, required: true },

  // Source JSON uses "location"; I’m storing it as "resort" for consistency with common samples.
  resort: { type: String, required: true, trim: true },

  // Price amount. Required. We also keep a boolean flag to indicate “price is per person.”
  price: { type: Number, required: true, min: 0 },

  // True means the price is per person (matches the JSON you provided).
  perPerson: { type: Boolean, required: true },

  // Image filename or URL.
  image: { type: String, trim: true },

  // Short marketing copy. Capped to prevent oversized payloads.
  description: { type: String, trim: true, maxlength: 5000 }
});

module.exports = mongoose.model('Trip', tripSchema);