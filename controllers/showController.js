const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 

// Current path = '/movies'

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
            services: allServices
        })
    })
}); 

// Create Show 
router.post('/', (req, res) => {
    console.log(req.body) 
    db.Show.create(req.body, (err, newShow) => {
        if (err) return console.log(err);
        //Update services shows array with new id from new show ( use id from newShow object) 
        res.redirect('/shows')
    })
}); 

// Show Show Fasho 
router.get('/:id', (req, res) => {
    db.Show.findById(req.params.id, (err, show) => {
        if (err) return console.log(err)
        res.render('show/show', {
            show: show
        })
    })
}); 

// Edit Show 
router.get('/:id/edit', (req, res) => {
    db.Show.findById(req.params.id, (err, show) => {
        if (err) return console.log(err)
        res.render('show/edit', {
            show: show
        })
    })
}); 

// Update Show 
router.put('/:id', (req, res) => {
    console.log('Updated: ', req.body)
    db.Show.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (err, show) => {
            if(err) return console.log(err); 
            res.redirect('/shows')
        }
     )
}); 

// Destroy Show 
router.delete('/:id', (req, res) => {
    db.Show.findByIdAndDelete(req.params.id, (err, show) => {
        if (err) return console.log(err)
        res.redirect('/shows')
    })
}); 

// --- Export Router ---// 
module.exports = router; 