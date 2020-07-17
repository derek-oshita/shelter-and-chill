// Variables

// Movie Buttons
const movieLikes = $('.counters1'); 
const movieDislikes = $('#movie-dislikes'); 

// Show Buttons
const showLikes = $('#show-likes'); 
const showDislikes = $('#show-dislikes'); 


// Functions

// Get All Movies
function handleLike (event) {
    // Get request
    fetch('/api/v1/movies/')
    .then((stream) => stream.json())
    .then((data) => console.log(data)); 
}; 

// Get A Movie UpVote value
function getMovieUpVote (event) {
    console.log('upVote value: ', event.target.id)
    // let movieId = event.target.id;
    // movieId++; 
    // fetch(`/movies/${movieId}`, {
    //     method: 'PUT',
    // })
    // .then((stream) => {stream.json()})
    // .then((res) => console.log(res))
}

// UpVote Movie

function likeMovie (event) {
    let movieUpVote = event.target.id;
    movieUpVote++; 
    fetch(`/movies/${movieUpVote}`) 

}

$(movieLikes).on('click', likeMovie); 
