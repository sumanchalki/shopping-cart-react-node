// As we have limited number of routes,
// all routes are put here, instead of moduler approach.

const userController = require('../controllers/userController');

module.exports = function(app) {
  app.post('/signup', userController.signUp);
  app.post('/signin', userController.signIn);
}
