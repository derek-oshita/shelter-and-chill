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
    cast: {
        type: String
    }, 
    director: {
        type: String
    }, 
    upVote: {
        type: Number, 
        default: 0
    }, 
    downVote: {
        type: Number,
        default: 0
    }, 
    service: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service'
    }], 
    imgUrl: {
        type:String
    }
}); 

// --- Model --- // 

const Movie = mongoose.model('Movie', movieSchema); 
module.exports = Movie; 


