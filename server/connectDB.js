const mongoose = require('mongoose');
let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./config/config.prod.js');
}
else if (process.env.NODE_ENV === 'dev') {
  config = require('./config/config.dev.js');
}

module.exports = () => {
  mongoose.connect(config.mongoURI, { useNewUrlParser: true });
}
