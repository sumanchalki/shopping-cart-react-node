console.log('This script populates some test users and products to the database.');

const async = require('async');
const Product = require('./models/Product');
const User = require('./models/User');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
// TODO to use this userArgs to take user params
// to optionally empty collection before enter data
// add create and store random images.

const mongoose = require('mongoose');
const connectDb = require('./connectDB');

connectDb();

function createUser(userObj, cb) {
  const user = new User({
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    gender: userObj.gender,
    email: userObj.email,
    password: userObj.password
  });

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New User: ' + user);
    cb(null, user);
  });
}

function createProduct(productObj, cb) {
  const product = new Product({
    title: productObj.title,
    description: productObj.description,
    category: productObj.category,
    manufacturer: productObj.manufacturer,
    price: productObj.price,
    imageUrl: productObj.imageUrl
  });

  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    cb(null, product);
  });
}

function generateUsers(cb) {
  // First empty the collection.
  User.deleteMany({}, () => {

    async.parallel([
      function (callback) {
        createUser(
          {
            firstName: 'Avijit',
            lastName: 'Mukherjee',
            gender: 'male',
            email: 'abhijit.mukherjee@example.com',
            password: '123456'
          },
          callback
        );
      },
      function (callback) {
        createUser(
          {
            firstName: 'Amit',
            lastName: 'Mandal',
            gender: 'male',
            email: 'amit.mandal@example.com',
            password: '123456'
          },
          callback
        );
      },
      function (callback) {
        createUser(
          {
            firstName: 'Rajiv',
            lastName: 'Singh',
            gender: 'male',
            email: 'rajiv.singh@example.com',
            password: '123456'
          },
          callback
        );
      },
      function (callback) {
        createUser(
          {
            firstName: 'Suman',
            lastName: 'Das',
            gender: 'male',
            email: 'suman.das@example.com',
            password: '123456'
          },
          callback
        );
      },
      function (callback) {
        createUser(
          {
            firstName: 'Karen',
            lastName: 'Sarkar',
            gender: 'female',
            email: 'karen.sarkar@example.com',
            password: '123456'
          },
          callback
        );
      },
      function (callback) {
        createUser(
          {
            firstName: 'Rajdip',
            lastName: 'Sarkar',
            gender: 'male',
            email: 'rajdip.sarkar@example.com',
            password: '123456'
          },
          callback
        );
      },
      function (callback) {
        createUser(
          {
            firstName: 'Anik',
            lastName: 'Ghosh',
            gender: 'male',
            email: 'anik.ghosh@example.com',
            password: '123456'
          },
          callback
        );
      }
    ],
    // optional callback
    cb);
  });
}

function generateProducts(cb) {
  // First empty the collection.
  Product.deleteMany({}, () => {

    async.parallel([
      function (callback) {
        createProduct(
          {
            title: 'Banana',
            description: 'The banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains. The fruit is variable in size, color and firmness, but is usually elongated and curved, with soft flesh rich in starch covered with a rind which may be green, yellow, red, purple, or brown when ripe. The fruits grow in clusters hanging from the top of the plant. Almost all modern edible parthenocarpic (seedless) bananas come from two wild species - Musa acuminata and Musa balbisiana. The scientific names of most cultivated bananas are Musa acuminata, Musa balbisiana, and Musa x paradisiaca for the hybrid Musa acuminata x M. balbisiana, depending on their genomic constitution. The old scientific name Musa sapientum is no longer used. It is also yellow.',
            category: 'Fruit',
            manufacturer: 'The banana company',
            price: 7,
            imageUrl: 'http://www.loop54.com/hubfs/demo_images/banana.jpg'
          },
          callback
        );
      },
      function (callback) {
        createProduct(
          {
            title: 'Cinnamon roll',
            description: 'The banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains. The fruit is variable in size, color and firmness, but is usually elongated and curved, with soft flesh rich in starch covered with a rind which may be green, yellow, red, purple, or brown when ripe. The fruits grow in clusters hanging from the top of the plant. Almost all modern edible parthenocarpic (seedless) bananas come from two wild species - Musa acuminata and Musa balbisiana. The scientific names of most cultivated bananas are Musa acuminata, Musa balbisiana, and Musa x paradisiaca for the hybrid Musa acuminata x M. balbisiana, depending on their genomic constitution. The old scientific name Musa sapientum is no longer used. It is also yellow.',
            category: 'Bakery',
            manufacturer: 'Awesome bakery',
            price: 5,
            imageUrl: 'http://www.loop54.com/hubfs/demo_images/cinnamonroll.jpg'
          },
          callback
        );
      }
    ],
    // optional callback
    cb);
  });
}

async.series(
  [
    generateUsers,
    generateProducts
  ],
  // Optional callback
  (err, results) => {
    if (err) {
      console.log('Data Creation Error: ' + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
