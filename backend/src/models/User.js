const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  googleAccessToken: { type: String, select: false },
  googleRefreshToken: { type: String, select: false },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: false, // Made optional for Google Auth users
    trim: true,
    default: "",
  },
  password: {
    type: String,
    // Optional for guests created via booking; required for registered accounts
    select: false,
  },
  sessionCount: {
    type: Number,
    default: 0,
  },
  lastSessionAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Hash password if modified
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password') || !this.password) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare candidate password with stored hash
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
