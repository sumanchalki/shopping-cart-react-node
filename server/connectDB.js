const mongoose = require('mongoose');
let config;
if (process.env.NODE_ENV === 'production') {
  config = require('./config/config.prod.js');
  console.log('prod config');
}
else if (process.env.NODE_ENV === 'dev') {
  config = require('./config/config.dev.js');
  console.log('dev config');
}
console.log('after config...');
module.exports = () => {
  // Mongoose calls ensureIndex() internally.
  // collection.ensureIndex is deprecated. Use createIndexes instead.
  mongoose.set('useCreateIndex', true);
  mongoose.connect(config.mongoURI, { useNewUrlParser: true })
    .catch(error => console.error(error.stack));
  //Get the default connection
  const db = mongoose.connection;

  //Bind connection to error event (to get notification of connection errors)
  //db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
