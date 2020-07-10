const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 

// Current path = '/movies'

// --- Routes --- // 

// All Movies 
router.get('/', (req, res) => {
    db.Movie.find({}, (err, allMovies) => {
        if (err) return console.log(err); 
        res.render('movie/index', {
            movies: allMovies
        })
    })
}); 

// New Movie Route
router.get('/new', (req, res) => {
    res.render('movie/new')
}); 



// --- Export Router ---// 

module.exports = router; 