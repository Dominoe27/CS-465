// app_server/controllers/auth.js
// Auth endpoints for the admin SPA. Keep this lean: register + login return JWTs.

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

// Helper: build a signed JWT for a given user id
// sub = subject (user id). Exp comes from env or falls back to 7d.
const signToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 * Use for first-time admin setup or manual user creation during dev.
 * Returns: { token }
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    // Basic input check—don’t proceed with partial payloads
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password required' });
    }

    // Bail out if email is already in use
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create user and hash password via model helper
    const user = new User({ name, email });
    await user.setPassword(password);
    await user.save();

    // Return a fresh token so the UI can consider the user "logged in"
    return res.status(201).json({ token: signToken(user._id) });
  } catch (err) {
    // Keep it simple for the client; log more detail server-side if needed
    return res.status(500).json({ message: 'Register failed', error: err.message });
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Validates credentials and hands back a JWT for the interceptor to attach.
 * Returns: { token }
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    // Fast-fail if missing creds
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password required' });
    }

    // Look up the user and verify the password against the stored hash
    const user = await User.findOne({ email });
    const ok = user && (await user.validPassword(password));
    if (!ok) {
      // Don’t leak which part failed—keep it generic
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Ship a signed token—Angular stores it and the interceptor sends it
    return res.json({ token: signToken(user._id) });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

module.exports = { register, login };