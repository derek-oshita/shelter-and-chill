const mongoose = require('mongoose');
const Movie = require('./Movie');
const Show = require('./Show');

//--------------------------/Service Schema/--------------------------//
const serviceSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    price: {
        type: Number, 
    },
    movie: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie'
    }], 
    show: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Show'
    }],

}); 

//--------------------------/Model/--------------------------//
const Service = mongoose.model('Service', serviceSchema);

//--------------------------/Export/--------------------------//
module.exports = Service;