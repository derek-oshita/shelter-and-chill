const express = require('express'); 
const app = express(); 
const methodOverride = require('method-override'); 
const PORT = process.env.PORT || 4000; 

// --- Controllers --- // 

// Movie
const movieCtrl = require('./controllers/movieController'); 

// Service 
const serviceCtrl = require('./controllers/serviceController'); 

// Show 
const showCtrl = require('./controllers/showController'); 

// API
const apiCtrl = require('./controllers/apiController')

// --- View Engine --- // 
app.set('view engine', 'ejs'); 

// --- Middleware --- // 

// Method Override
app.use(methodOverride('_method')); 

// Serve Static Assets (Front End JavaScript, CSS, Images, etc)
app.use(express.static(`${__dirname}/public`));

// Express BodyParser
app.use(express.urlencoded({extended:false})); 

// Custom Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toLocaleTimeString()}`); 
    next(); 
}); 

//--------------------------/ROUTES/--------------------------//

// Home 
app.get('/', (req, res) => {
    res.render('index')
}); 
// About us 
app.get('/about', (req, res) => {
    res.render('about/index')
}); 
// Add favorites 
app.get('/add', (req, res) => {
    res.render('add/index')
}); 
// Movie 
app.use('/movies', movieCtrl); 
// Service
app.use('/services', serviceCtrl); 
// Show 
app.use('/shows', showCtrl); 
// API 
app.use('/api/v1', apiCtrl); 

// 404 Not Found
app.get('*', (req, res) => {
    res.send('<h1>404 Page Not Found</h1>')
}); 

// --- Server Listener --- // 
app.listen(PORT, () => {console.log(`Server is listening on ${PORT}...`)})