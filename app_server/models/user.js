const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  hash:  { type: String, required: true }
}, { timestamps: true });

userSchema.methods.setPassword = async function (password) {
  this.hash = await bcrypt.hash(password, 12);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compare(password, this.hash);
};

module.exports = mongoose.model('User', userSchema);