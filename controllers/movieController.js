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

// New Movie
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

// Edit Movie 
router.get('/:id/edit', (req, res) => {
    db.Movie.findById(req.params.id, (err, movie) => {
        if (err) return console.log(err)
        res.render('movie/edit', {
            movie: movie
        })
    })
}); 

// Update Movie 
router.put('/:id', (req, res) => {
    console.log('Updated: ', req.body)
    db.Movie.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (err, user) => {
            if(err) return console.log(err); 
            res.redirect('/movies')
        }
     )
}); 

// Destroy Movie 
router.delete('/:id', (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id, (err, movie) => {
        if (err) return console.log(err)
        res.redirect('/movies')
    })
}); 

// --- Export Router ---// 

module.exports = router; 