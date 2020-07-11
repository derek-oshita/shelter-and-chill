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
            service: allServices
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
        res.redirect('/Service');
    })
})

//#*#*#*#*#* SERVICE SHOW *#*#*#*#*#
router.get('/:id', (req, res) => {
    db.Service.findById(req.params.id);

})

//#*#*#*#*#* EDIT SERVICE *#*#*#*#*#


//#*#*#*#*#* UPDATE SERVICE *#*#*#*#*#


//#*#*#*#*#* DELETE SERVICE *#*#*#*#*#



//--------------------------/EXPORT ROUTER/--------------------------//
module.exports = router; 