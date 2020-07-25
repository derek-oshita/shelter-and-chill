const express = require('express'); 
const app = express(); 
const methodOverride = require('method-override'); 
require('dotenv').config(); 
const PORT = process.env.PORT || 3000; 
const session = require('express-session'); 

// --- Controllers --- // 

// Movie
const movieCtrl = require('./controllers/movieController'); 

// Service 
const serviceCtrl = require('./controllers/serviceController'); 

// Show 
const showCtrl = require('./controllers/showController'); 

// API
const apiCtrl = require('./controllers/apiController')

// Auth
const authCtrl = require('./controllers/authController')

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

// Express Session 
app.use(session ({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// Must be logged in to access
app.use((req, res, next) => {
    if (req.url !== '/login' && req.url !== '/register' && req.url !== '/' && !req.session.currentUser) return res.redirect('/login'); 
    next(); 
});

//--------------------------/ROUTES/--------------------------//

// Home 
app.get('/', (req, res) => {
    res.render('index')
}); 
// Auth 
app.use('/', authCtrl); 
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


// 404 Not Found
app.get('*', (req, res) => {
    res.send('<h1>404 Page Not Found</h1>')
}); 

// --- Server Listener --- // 
app.listen(PORT, () => {console.log(`Server is listening on ${PORT}...`)})
// app.listen(process.env.PORT || 3000); 