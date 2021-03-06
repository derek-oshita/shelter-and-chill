const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 

// Current path = '/movies'

//--------------------------/ROUTES/--------------------------//

// *********All Movies********** 
router.get('/', (req, res) => {
    console.log('Request session: ', req.session); 
    db.Movie.find({}, (err, allMovies) => {
        if (err) return console.log(err); 
        console.log(allMovies)
        res.render('movie/index', {
            movie: allMovies
        })
    })
}); 

// **********New Movie**********
router.get('/new', (req, res) => {
    db.Service.find({}, (err, allServices) => {
        if (err) return console.log(err); 
        res.render('movie/new', {
            service: allServices
        })
    })
}); 

// **********Create Movie (Thanks, Michael!)**********
router.post('/', (req, res) => {
    console.log(req.body)
    db.Movie.create(req.body, (err, newMovie) => {
        if (err) return console.log(err); 
        console.log(newMovie); 
        // update Service documents here
        db.Service.updateMany({_id:{$in: newMovie.service}}, {$push: {movie: newMovie}}, (err, updatedServices) => {
            if(err) return console.log(err); 
            res.redirect('/movies')
        })
    })
})

// **********Show Movie********** 
router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db.Movie.findById(req.params.id)
    .populate('service')
    .exec((err, movie) => {
        console.log(movie)
        if (err) return console.log(err)
        res.render('movie/show', {
            movie: movie
        })
    }) 
}); 

// **********Edit Movie**********
router.get('/:id/edit', (req, res) => {
    console.log(req.params.id)
    db.Service.find({}, (err, allServices) => {
        db.Service.findOne({'movie': req.params.id})
        .populate({
            path: 'movie', 
            match: {_id: req.params.id}
        })
        .exec((err, foundService) => {
            res.render('movie/edit', {
                movie: foundService.movie[0], 
                service: allServices, 
                serviceProvider: foundService
            })
        })
    })
}); 

// **********Movie Update (THANKS YULIA!!!)**********
router.put('/:id/', (req, res) => {
    // reassigns service property to empty array
    if (!req.body.service) {
        req.body.service = []
    }
    console.log(req.params.id)
    db.Movie.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedMovie) => {
            if (err) return console.log(err); 
            console.log(updatedMovie)
            // db.inventory.find( { tags: { $all: ["red", "blank"] } } )
            // find services with this movie 
            db.Service.find({'movie': {$all:[req.params.id]}}, (err, foundServices) => {
                console.log(foundServices)
                // iterate over all services 
                for (let i = 0; i < foundServices.length; i++ ) {
                    let foundService = foundServices[i]; 
                    for (let j = 0; j < foundService.movie; j++) {
                        // find the correct movie by id
                        if (foundService.movie[j]._id === updatedMovie._id ) {
                            // assign to the updated movie 
                            foundService.movie[j] = updatedMovie
                        }
                    }
                }
            })
        }
    )
    res.redirect(`/movies/${req.params.id}`); 
}) ; 

// Destroy Movie
router.delete('/:id', (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id, (err, deletedMovie) => {
        if (err) return console.log(err); 
        console.log(deletedMovie); 
        db.Service.findOne({'movie': {$all:[req.params.id]}}, (err, foundService) => {
          foundService.movie.remove(req.params.id); 
          foundService.save((err, updatedService) => {
              console.log(updatedService); 
              res.redirect('/movies')
            })
        })
    })
})

//--------------------------/EXPORT ROUTER/--------------------------//
module.exports = router; 