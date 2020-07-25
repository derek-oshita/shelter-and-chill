const express = require('express'); 
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const db = require('../models'); 

// Recording: 2:01:21

// Login page
router.get('/login', (req, res) => {
    res.render('auth/login')
});

// Register page
router.get('/register', (req, res) => {
    res.render('auth/register')
});

router.post('/login', (req, res) => {
    // Verify req.body Is Not Empty
  // Find One User By Email
  // If No User Found, Respond with 400
  // Compare Password Sent Password and foundUser Password
  // If Passwords Match, Create Session and Respond with 200
  // If Passwords Do Not Match, Respond with 400
  // Find User By Email Address
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    // Respond with 400 If No User Found
    if (!foundUser) {
      return res.redirect('/register')
    }
    // Compare User Password with foundUser Password
    bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
      if (err) return console.log(err);
      // Create Session and Respond with 200 If Passwords Match
      if (isMatch) {
        // Create currentUser Object (Hide User Password)
        const currentUser = {
          _id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          isLoggedIn: true
        }
        // Create A New Session and Respond 200
        req.session.currentUser = currentUser;
        res.redirect('/profile');
      } else {
        // Respond with 400 If Passwords Do Not Match
        return res.send('Passwords do not match');
      }
    });
  });
})

// Create registration
router.post('/register', (req, res) => {
    // Verify req.body Is Not Empty
  // Query DB For Existing User By Email
  // If foundUser, Respond with 400
  // If No foundUser, Generate Salt and Hash User Password
  // Replace newUser Plain Text Password with Hased Password
  // Create newUser and Respond with 200
  // Check For Existing User Account
  db.User.findOne({email: req.body.email}, (err, foundUser) => {
    if (err) return console.log(err);
    // Return Error If Account Already Exists
    if (foundUser) return console.log('User Already Exists');
    // Generate Hash Salt (This just makes the password hard to crack)
    bcrypt.genSalt(10, (err, salt)=> {
      if (err) return console.log(err);
      // Turn the Plain Text Password Into A Complicated Hash
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) return console.log(err);
        // Destructure New User Data From Request
        const { name, email, password } = req.body;
        // Construct New User Object with Hashed Password
        const newUser = {
          name,
          email,
          password: hash, // VERY IMPORTANT! NEVER SAVE PLAIN TEXT PASSWORD
        };
        // Create New User
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);
          res.redirect('/login');
        });
      });
    });
  });
})

// --- Router --- //
module.exports = router; 