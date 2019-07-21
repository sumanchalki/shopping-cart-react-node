const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDb = require('./connectDB');
const router = require('./routes');

const start = () => {
  const app = express();
  // Connect to MongoDB.
  connectDb();
  app.use(morgan('combined'));
  app.use(cors());
  app.use(bodyParser.json({ type: '*/*' }));
  // Handle error of bodyParser if request data is improper.
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Invalid JSON input');
  });

  // Add all routes.
  router(app);

  // Serve the front-end as static files.
  let publicDir;
  if (process.env.NODE_ENV === 'production') {
    publicDir = 'build';
  }
  else if (process.env.NODE_ENV === 'dev') {
    console.log('This is dev environment.');
    publicDir = 'public';
  }

  app.use(express.static(`client/${publicDir}`));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', publicDir, 'index.html'));
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Express app listening on port ${PORT}!`);
  });
}

exports.start = start;
