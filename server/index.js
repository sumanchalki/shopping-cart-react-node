const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDb = require('./connectDB');
const router = require('./routes');
const start = () => {
  const app = express();

  // Connect to MongoDB.
  connectDb();
  app.use(morgan('combined'));
  app.use(cors());

  // Use a body parser custom logic defined in addBodyParser().
  app.all('*', addBodyParser);

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

function addBodyParser(req, res, next) {
  if ( req.path == '/api/update-profile') {
    // Use 'multer' middleware for file-uploading.
    const multer  = require('multer');
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'client/public/uploads/profile-images/');
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
      }
    });
    // const upload = multer({ dest: 'uploads/profile-images/' });
    const upload = multer({ storage: storage });
    return upload.any()(req, res, next);
  }

  // Use 'body-parser' middleware for all other cases.
  const bodyParser = require('body-parser');
  return bodyParser.json({ type: '*/*' })(req, res, next);
}

exports.start = start;
