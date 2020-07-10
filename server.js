const express = require('express'); 
const app = express(); 
const methodOverride = require('method-override'); 
const PORT = process.env.PORT || 4000; 

// --- View Engine --- // 
app.set('view engine', 'ejs')

// --- Middleware --- // 

// Method Override
app.use(methodOverride('__method')); 

// Serve Static Assets (Front End JavaScript, CSS, Images, etc)
app.use(express.static(`${__dirname}/public`));

// Express BodyParser
app.use(express.urlencoded({extended:false})); 

// Custom Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`); 
    next(); 
}); 

// --- Routes --- // 

// Home 
app.get('/', (req, res) => {
    res.send('We on the homepage...')
}); 


// --- Server Listener --- // 
app.listen(PORT, () => {console.log(`Server is listening on ${PORT}...`)})