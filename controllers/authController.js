const express = require('express'); 
const router = express.Router(); 
const db = require('../models')

// Login page
router.get('/login', (req, res) => {
    res.render('auth/login')
});

// Register page
router.get('/register', (req, res) => {
    res.render('auth/register')
});

// Destructure new user data from request
// const {firstName, lastName, email} = req.body; 

// Construct new user object with hashed password
// const newUser = {
//     firstName, 
//     lastName, 
//     email, 
//     password: HashChangeEvent, 
// }

// Create registration
router.post('/register', (req, res) => {
    console.log(req.body); 
    // query the db to add new user
    db.User.create(req.body, (err, newUser) => {
        if (err) return console.log(err); 
        res.redirect('/login');  
    })
})

// --- Router --- //
module.exports = router; 