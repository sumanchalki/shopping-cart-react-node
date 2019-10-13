// As we have limited number of routes,
// all routes are put here, instead of moduler approach.

const _ = require('lodash');
const passportService = require('../services/passport');
const passport = require('passport');
const userController = require('../controllers/userController');
const bodyParser = require('body-parser');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.post('/api/signup', userController.signUp);
  app.post('/api/signin', userController.signInValidation, function(req, res, next) {
    passport.authenticate('local', { session: false }, function(err, user, info) {
      if (err) return next(err);

      if (!user) {
        return res.status(422).json(info);
      }
      // Dehydrate the mongoose document and remove unnecessary fields.
      const userObj = _.omit(user.toObject(), ['__v', 'password']);

      return res.json({ success: true, userData: { ...userObj, token: user.getUserToken() } });
    })(req, res, next);
  });
  app.post('/api/load-user', userController.getUserDetails);

  app.post('/api/update-profile', requireAuth, userController.updateProfile);

  // Global error handler to send output.
  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Server error!');
  });
}
