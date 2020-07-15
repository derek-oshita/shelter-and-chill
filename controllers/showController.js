const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 

// Current path = '/shows'

// --- Routes --- // 

// All Shows 
router.get('/', (req, res) => {
    db.Show.find({}, (err, allShows) => {
        if (err) return console.log(err); 
        console.log(allShows);
        res.render('show/index', {
            show: allShows
        })
    })
}); 

// New Show
router.get('/new', (req, res) => {
    db.Service.find({}, (err, allServices) => {
        if (err)return console.log(err);
        res.render('show/new', {
            service: allServices
        })
    })
}); 

// Create Show (Revising Michael's code)
router.post('/', (req, res) => {
    console.log(req.body)
    db.Show.create(req.body, (err, newShow) =>{
        if (err) return console.log(err); 
        console.log(newShow); 
        // update Service documents here 
        db.Service.updateMany({_id:{$in: newShow.service}}, {$push: {show: newShow}}, (err, updatedServices) => {
            if(err) return console.log(err); 
            res.redirect('/shows')
        })
    })
}); 

// Show Show Fasho 
router.get('/:id', (req, res) => {
    db.Show.findById(req.params.id)
    .populate('service')
    .exec((err, show) => {
        console.log(show)
        if (err) return console.log(err)
        res.render('show/show', {
            show: show
        })
    }) 
}); 

// // Edit Show (working without services)
// router.get('/:id/edit', (req, res) => {
//     db.Show.findById(req.params.id, (err, show) => {
//         if (err) return console.log(err)
//         res.render('show/edit', {
//             show: show
//         })
//     })
// }); 

// // Update Show (working without services)
// router.put('/:id', (req, res) => {
//     console.log('Updated: ', req.body)
//     db.Show.findByIdAndUpdate(
//         req.params.id, 
//         req.body, 
//         {new: true},
//         (err, show) => {
//             if(err) return console.log(err); 
//             res.redirect('/shows')
//         }
//      )
// }); 

// Edit Show (working with services but only if show was created from new route)
router.get('/:id/edit', (req, res) => {
    db.Service.find({}, (err, allServices) => {
        db.Service.findOne({'show': req.params.id})
        .populate({
            path: 'show', 
            match: {_id: req.params.id}
        })
        .exec((err, foundService) => {
            res.render('show/edit', {
                show: foundService.show[0], 
                service: allServices, 
                serviceProvider: foundService
            })
        })
    })
}); 

// Update Show (in progress)
router.put('/:id', (req, res) => {
    db.Show.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedShow) => {
            if(err) return console.log(err)
            db.Service.findOne({'show': req.params.id}, (err, foundService) => {
                if(foundService._id.toString() !== req.body.serviceId) {
                    foundService.show.remove(req.params.id); 
                    foundService.save((err, savedService) => {
                        db.Service.findById(req.body.serviceId, (err, newService) => {
                            newService.show.push(updatedShow); 
                            console.log(updatedShow)
                            newService.save((err, savedNewService) => {
                                res.redirect(`/shows/${req.params.id}`); 
                            })
                        })
                    })
                } else {
                    res.redirect(`/shows/${req.params.id}`);  
                }
            })
        }
    )
}); 

// Destroy Show 
router.delete('/:id', (req, res) => {
    db.Show.findByIdAndDelete(req.params.id, (err, deletedShow) => {
        if (err) return console.log(err); 
        console.log(deletedShow); 
        db.Service.findOne({'show': {$all:[req.params.id]}}, (err, foundService) => {
          foundService.show.remove(req.params.id); 
          foundService.save((err, updatedService) => {
              console.log(updatedService); 
              res.redirect('/shows')
            })
        })
    })
}); 

// --- Export Router ---// 
module.exports = router; 