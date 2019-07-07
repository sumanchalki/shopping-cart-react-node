const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

let publicDir;

// Serve the front-end as static files.
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
app.listen(PORT, function() {
  console.log(`Express app listening on port ${PORT}!`);
});
