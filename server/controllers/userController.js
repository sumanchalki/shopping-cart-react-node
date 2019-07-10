const User = require('../models/User');

exports.signUp = function(req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;

  if (!validateEmail(email)) {
    return res.status(422).send({ error: 'Invalid Email!' });
  }

  // Check if a user already exists with the given email.
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // Email exists.
    if (existingUser) {
      return res.status(422).send({ error: 'Email exists!' });
    }

    // Create the user record.
    const user = new User({
      firstName,
      lastName,
      gender,
      email,
      password
    });

    user.save(function(err, result) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ ID: result._id });
    });
  });
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
