// Variables

// Movie Buttons
const movieLikes = $('.counters1'); 
const movieDislikes = $('#movie-dislikes'); 

// Show Button
const showLikes = $('#show-likes'); 
const showDislikes = $('#show-dislikes'); 

// Model

// upVote: {
//     type: Number, 
//     default: 0
// }, 
// downVote: {
//     type: Number,
//     default: 0
// }, 

// Functions


// Get All Movies
function handleLike (event) {
    // Get request
    fetch('/api/v1/movies/')
    .then((stream) => stream.json())
    .then((data) => console.log(data)); 
}; 

function likeMovie (movie) {
    movie.upVote++; 
}

// Get A Movie
function getMovie (event) {
    console.log('movie clicked: ', event.target.id)
    const movieId = event.target.id; 
}

// Event Listener

$(movieLikes).on('click', getMovie); 
