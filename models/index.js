const mongoose = require('mongoose'); 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shelter-and-chill';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: false
})
    .then(() => console.log('MongoDB connected successfully...'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`)); 

// Make models available
module.exports = {
    Movie: require('./Movie'), 
    Show: require('./Show'), 
    Service: require('./Service')
}; 