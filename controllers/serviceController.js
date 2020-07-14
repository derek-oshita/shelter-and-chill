const express = require('express'); 
const db = require('../models'); 
const router = express.Router(); 


//--------------------------/ROUTES/--------------------------//
// *****Current path = '/services'*****

//#*#*#*#*#* SERVICE INDEX *#*#*#*#*#
router.get('/', (req, res) => {
    db.Service.find({}, (err, allServices) => {
        if (err) return console.log(err); 
        res.render('service/index', {
            service: allServices,
        })
    })
}); 

//#*#*#*#*#* NEW SERVICE  *#*#*#*#*#
router.get('/new', (req, res) => {
    res.render('service/new')
}); 

//#*#*#*#*#* CREATE SERVICE *#*#*#*#*#
router.post('/', (req, res) =>{
    console.log('Request body =', req.body);
    db.Service.create(req.body, (err, newService) => {
        if (err) return console.log(err);
        console.log('New Service =', newService);
        res.redirect('/services');
    })
});

//#*#*#*#*#* SERVICE SHOW *#*#*#*#*#
router.get('/:id', (req, res) => {
    db.Service.findById(req.params.id, (err, service) => {
        console.log(service)
        if (err) return console.log(err);
        res.render(('service/show'),{
            service: service,
        })
    })
});

//#*#*#*#*#* EDIT SERVICE *#*#*#*#*#
router.get('/:id/edit', (req, res) => {
    db.Service.findById(req.params.id, (err, foundService) => {
        if (err) return console.log(err);
        res.render('service/edit', {
            service: foundService,
        })
    })
});

//#*#*#*#*#* UPDATE SERVICE *#*#*#*#*#
router.put('/:id', (req, res) => {
    console.log('service to update =', req.body);
    db.Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedService) => {
            if (err) return console.log(err);
            res.redirect('/services');
        }
    )
});


//#*#*#*#*#* DELETE SERVICE *#*#*#*#*#
router.delete('/:id', (req, res) => {
    db.Service.findByIdAndDelete(req.params.id, (err, service) => {
        console.log(service)
        if (err) return console.log(err)
        res.redirect('/services')
    })
}); 

//--------------------------/EXPORT ROUTER/--------------------------//
module.exports = router; 