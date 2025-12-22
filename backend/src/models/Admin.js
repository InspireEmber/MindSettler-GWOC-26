const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['admin'],
    default: 'admin'
  }
}, {
  timestamps: true
});

// Configure passport-local-mongoose to use email/username and hashed password
adminSchema.plugin(passportLocalMongoose, {
  usernameField: 'username',
  errorMessages: {
    UserExistsError: 'An account with this username already exists.'
  }
});

module.exports = mongoose.model('Admin', adminSchema);
