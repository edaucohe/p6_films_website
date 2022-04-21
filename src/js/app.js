// HTML Modal code
function addOpenModalBehavior (clickingElement, modal){
  for (let element of clickingElement){
      element.addEventListener("click", function(event){
      event.preventDefault();
      modal.style.display = "block";
    });
  }
}

function addClosingModalBehavior(clickingElement, modal){
  clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target === clickingElement) {
      modal.style.display = "none";
    }
  });
}

// API fetch code
function getMovieDetails(movieId){
    return fetch('http://localhost:8000/api/v1/titles/' + movieId.toString()).then(response => response.json())
}

function listMoviesForCategory(category) {
    const params = new URLSearchParams({
        page_size: 7,
        genre: category,
        sort_by: "-imdb_score"
    })
    return fetch('http://localhost:8000/api/v1/titles/?' + params.toString()).then(response => response.json())
}

window.onload = function() {
    let btn = document.getElementsByClassName('btn');
    let modal = document.getElementById('modal');
    let close = document.getElementsByClassName('close')[0];

    // Add modal behavior
    addOpenModalBehavior(btn, modal);
    addClosingModalBehavior(close, modal);
    addClosingModalBehavior(modal, modal);

    let bestMovies = listMoviesForCategory("");
    console.log(bestMovies);
    
    let thrillerMovies = listMoviesForCategory("Thriller");
    console.log(thrillerMovies);
    let romanceMovies = listMoviesForCategory("Romance");
    console.log(romanceMovies);
    let crimeMovies = listMoviesForCategory("Crime");
    console.log(crimeMovies);
}
