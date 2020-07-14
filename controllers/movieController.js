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
            movie: allMovies
        })
    })
}); 

// New Movie
router.get('/new', (req, res) => {
    db.Service.find({}, (err, allServices) => {
        if (err) return console.log(err); 
        res.render('movie/new', {
            service: allServices
        })
    })
}); 

// Create Movie (Working w/out service relationship)
router.post('/', (req, res) => {
    console.log(req.body) 
    db.Movie.create({...req.body}, (err, newMovie) => {
        if (err) return console.log(err); 
        console.log(newMovie)
        res.redirect('/movies')
    })
}); 

// // Create Movie (in progress w/ service relationship)
// router.post('/', (req, res) => {
//     console.log(req.body); 
//     db.Movie.create(req.body, (err, newMovie) => {
//         if(err) return console.log(err); 
//         console.log(newMovie); 
//         db.Service.findById(req.body.serviceId, (err, foundService) => {
//             foundService.movie.push(newMovie); 
//             foundService.save((err, savedService) => {
//                 console.log('savedService: ', savedService); 
//                 res.redirect('/movies')
//             })
//         })
//     })
// }); 


// Show Movie 
router.get('/:id', (req, res) => {
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

// Working Edit Movie
router.get('/:id/edit', (req, res) => {
    db.Movie.findById(req.params.id, (err, movie) => {
        if (err) return console.log(err)
        res.render('movie/edit', {
            movie: movie
        })
    })
}); 

// Working Update Movie 
router.put('/:id', (req, res) => {
    console.log('Updated: ', req.body)
    db.Movie.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (err, movie) => {
            if(err) return console.log(err); 
            res.redirect('/movies')
        }
     )
}); 

// // Edit Movie (In progress)
// router.get('/:id/edit', (req, res) => {
//     db.Service.find({}, (err, allServices) => {
//         db.Service.findOne({'movie': req.params.id})
//         .populate({
//             path: 'movie', 
//             match: {_id: req.params.id}
//         })
//         .exec((err, foundService) => {
//             res.render('./movie/edit', {
//                 movie: foundService.movie[0], 
//                 service: allServices, 
//                 serviceProvider: foundService
//             })
//         })
//     })
// }); 

// // Movie Update (In progress)
// router.put('/:id/', (req, res) => {
//     db.Movie.findByIdAndUpdate(
//         req.params.id, 
//         req.body, 
//         {new: true}, 
//         (err, updatedMovie) => {
//             if (err) return console.log(err); 
//             db.Service.findOne({'movie': req.params.id}, (err, foundService) => {
//                 if (foundService._id.toString() !== req.body.serviceId){
//                     foundService.movie.remove(req.params.id); 
//                     foundService.save((err, savedService) => {
//                         db.Service.findById(req.body.serviceId, (err, newService) => {
//                             newService.movie.push(updatedMovie); 
//                             newService.save((err, savedNewService) => {
//                                 res.redirect(`/movies/${req.params.id}`)
//                             })
//                         })
//                     })
//                 } else {
//                     res.redirect(`/movies/${req.params.id}`); 
//                 }
//                 // }
//             })
//         }
//     )
// }); 

// Destroy Movie 
router.delete('/:id', (req, res) => {
    db.Movie.findByIdAndDelete(req.params.id, (err, movie) => {
        console.log(movie)
        if (err) return console.log(err)
        res.redirect('/movies')
    })
}); 

// --- Export Router ---// 
module.exports = router; 