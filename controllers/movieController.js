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

// Create Movie 
router.post('/', (req, res) => {
    console.log(req.body) 
    db.Movie.create(req.body, (err, newMovie) => {
        if (err) return console.log(err); 
        res.redirect('/movies')
    })
}); 

// Show Movie 
router.get('/:id', (req, res) => {
    db.Movie.findById(req.params.id, (err, movie) => {
        if (err) return console.log(err)
        res.render('movie/show', {
            movie: movie
        })
    })
}); 

// 



// --- Export Router ---// 

module.exports = router; 