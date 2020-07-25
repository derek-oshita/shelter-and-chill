const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema ({
    name : {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 50,
    }, 
    email: {
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true,
    }, 
    password: {
        type: String, 
        required: true, 
        minlength: 4
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema); 
module.exports = User; 