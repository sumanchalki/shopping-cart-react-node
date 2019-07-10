const mongoose = require('mongoose');

const { Schema } = mongoose;

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

// Create the model class
const ModelClass = mongoose.model('users', userSchema);

module.exports = ModelClass;
