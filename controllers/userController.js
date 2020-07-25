const express = require('express')
const router = express.Router(); 
const db = require('../models')

// current path = '/profile' 

router.get('/', (req, res) => {
    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) console.log(err)
        res.render('user/profile', {
            user: foundUser, 
        }); 
    })
}); 



//--------------------------/EXPORT ROUTER/--------------------------//
module.exports = router; 