const express = require('express'); 
const router = express.Router(); 

// Database 
const db = require('../models')

// Current Path = '/api/v1' 


// Get All Movies
router.get('/movies', (req, res) => {
    db.Movie.find({}, (err, allMovies) => {
        if(err) res.status(400).json(err); 
        res.json(allMovies)
    })
}); 

// // Get a specific movie
// router.get('/movies/:id', (req, res) => {
//     // Get all movies
//     console.log('API CONTROLLER HIT')
//     console.log(req.params.id)
//     db.Movie.findById(req.params.id, (err, movie) => {
//         if(err) res.status(400).json(err); 
//         res.json(movie); 
//     })
// }); 

// Export 
module.exports = router; 