const jwt = require('jwt-simple');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

let config;
if (process.env.NODE_ENV === 'production') {
  config = require('../config/config.prod');
}
else if (process.env.NODE_ENV === 'dev') {
  config = require('../config/config.dev');
}

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum : ['male', 'female'], required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  picture: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

// Add name virtual attribute.
userSchema
  .virtual('name')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
});

// Before save, encrypt the password.
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  // Generate a salt and then run callback.
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }

    // Hash the password using the salt.
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      // Replace plain text password with encrypted password.
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

userSchema.methods.getUserToken = function() {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: this._id, iat: timestamp }, config.secret);
}

// Create the model class
const ModelClass = mongoose.model('users', userSchema);

module.exports = ModelClass;
