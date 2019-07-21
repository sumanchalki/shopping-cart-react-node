const User = require('../models/User');

exports.signUp = async function(req, res, next) {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;

  const errors = {};

  if (typeof(firstName) === 'undefined' || firstName === '') {
    errors.firstname = 'First name cannot be blank';
  }
  if (typeof(lastName) === 'undefined' || lastName === '') {
    errors.lastname = 'Last name cannot be blank';
  }
  if (typeof(gender) === 'undefined' || gender === '') {
    errors.gender = 'Gender cannot be blank';
  }
  if (typeof(password) === 'undefined' || password === '') {
    errors.password = 'Password cannot be blank';
  }

  if (typeof(email) === 'undefined' || email === '') {
    errors.email = 'Email cannot be blank';
  }
  else if (!validateEmail(email)) {
    errors.email = 'Invalid Email!';
  }
  else {
    // Check if a user already exists with the given email.
    await User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // Email exists.
      if (existingUser) {
        errors.email = 'Email exists!';
      }
    });
  }

  if (Object.keys(errors).length) {
    return res.status(422).send({ 'success': false, errors });
  }
  else {
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

      return res.json({ 'success': true, id: result._id });
    });
  }
}

exports.signIn = async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  const errors = {};

  if (typeof(password) === 'undefined' || password === '') {
    errors.password = 'Password cannot be blank';
  }

  if (typeof(email) === 'undefined' || email === '') {
    errors.email = 'Email cannot be blank';
  }

  // If basic validation passed, check authentication.
  if (!Object.keys(errors).length) {
    // Check if a user exists with the given email & password.
    await User.findOne({ email: email, password: password }, function(err, existingUser) {
      if (err) { return next(err); }

      if (!existingUser) {
        errors.form = 'Wrong email or password!';
      }
    });
  }

  if (Object.keys(errors).length) {
    return res.status(422).send({ 'success': false, errors });
  }
  else {
    return res.json({ 'success': true });
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
