const mongoose = require('mongoose'); 
const Service = require('./Service')

// --- Movie Schema --- // 

const movieSchema = new mongoose.Schema ({
    name: {
        type: String, 
        required: true, 
        unique: true
    }, 
    genre: {
        type: String, 
    }, 
    synopsis: {
        type: String, 
    }, 
    cast: [{
        firsName: {
            type: String
        }, 
        lastName: {
            type:String
        }
    }], 
    director: [{
        firsName: {
            type: String
        }, 
        lastName: {
            type:String
        }
    }], 
    upVote: {
        type: Number
    }, 
    downVote: {
        type: Number
    }, 
    service: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service'
    }]
}); 

// --- Model --- // 

const Movie = mongoose.model('Movie', movieSchema); 
module.exports = Movie; 
