const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 

// Current path = '/shows'

//--------------------------/ROUTES/--------------------------//

// **********All Shows********** 
router.get('/', (req, res) => {
    console.log('Request session: ', req.session); 
    db.Show.find({}, (err, allShows) => {
        if (err) return console.log(err); 
        console.log(allShows);
        res.render('show/index', {
            show: allShows
        })
    })
}); 

// **********New Show**********
router.get('/new', (req, res) => {
    db.Service.find({}, (err, allServices) => {
        if (err)return console.log(err);
        res.render('show/new', {
            service: allServices
        })
    })
}); 

// **********Create Show (Thanks, Michael!)**********
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

// **********Show Show Fasho********** 
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

// **********Edit Show**********
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

// **********Show Update (THANKS YULIA!!!)**********
router.put('/:id/', (req, res) => {
    // reassigns service property to empty array
    if (!req.body.service) {
        req.body.service = []
    }
    console.log(req.params.id)
    db.Show.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true}, 
        (err, updatedShow) => {
            if (err) return console.log(err); 
            console.log(updatedShow)
            // db.inventory.find( { tags: { $all: ["red", "blank"] } } )
            // find services with this show
            db.Service.find({'show': {$all:[req.params.id]}}, (err, foundServices) => {
                console.log(foundServices)
                // iterate over all services 
                for (let i = 0; i < foundServices.length; i++ ) {
                    let foundService = foundServices[i]; 
                    for (let j = 0; j < foundService.show; j++) {
                        // find the correct show by id
                        if (foundService.show[j]._id === updatedShow._id ) {
                            // assign to the updated show
                            foundService.show[j] = updatedShow
                        }
                    }
                }
            })
        }
    )
    res.redirect(`/shows/${req.params.id}`); 
}) ; 

// **********Destroy Show********** 
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

//--------------------------/EXPORT ROUTER/--------------------------//
module.exports = router; 