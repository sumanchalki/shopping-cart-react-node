const jwt = require('jwt-simple');
const mongoose = require('mongoose');
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
  date: { type: Date, default: Date.now }
});

// Add name virtual attribute.
userSchema
  .virtual('name')
  .get(function () {
    return this.firstName + ' ' + this.lastName;
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  isMatch = candidatePassword === this.password;
  callback(null, isMatch);
}

userSchema.methods.getUserToken = () => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: this._id, iat: timestamp }, config.secret);
}

// Create the model class
const ModelClass = mongoose.model('users', userSchema);

module.exports = ModelClass;
