const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String }
});

// Create the model class
const ModelClass = mongoose.model('products', productSchema);

module.exports = ModelClass;
