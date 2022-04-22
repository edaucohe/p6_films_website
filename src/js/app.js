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
function htmlCode(url){
  url
  .then(details => {
    // Code
  })
}

function getMovieDetails(urlMovie){
  return fetch(urlMovie).then(movieDetails => movieDetails.json())
}

function listMoviesForCategory(category) {
  const params = new URLSearchParams({
    page_size: 7,
    genre: category,
    sort_by: "-imdb_score"
  })
  return fetch('http://localhost:8000/api/v1/titles/?' + params.toString())
  .then(response => response.json())
}

function urlMovies(movies) {
  urlMoviesList = [];
  movies
  .then(moviesData => {
    for (let movieData = 0; movieData < moviesData.results.length; movieData++) {
      urlMovie = getMovieDetails(moviesData.results[movieData].url);
      console.log("movieData", movieData);
      console.log("urlMovie", urlMovie);
      // htmlCode(urlMovie);
    }
  })
  .catch(error => console.error("il y a une erreur :", error))
}

// function listUrlMovies(movies) {
//   let urlMoviesList = [];
//   let infoMovies = movies.then(value => value.results);
//   const moviesNumber = movies.then(value => value.results.length);
//   console.log("infoMovies", infoMovies);
//   console.log("moviesNumber", moviesNumber);
//
//   for (let movie = 0; movie < 7; movie++){
//     urlMoviesList.push(movies.then(value => value.results[movie]));
//   }
//   return urlMoviesList
// }

window.onload = function() {
  let btn = document.getElementsByClassName('btn');
  let modal = document.getElementById('modal');
  let close = document.getElementsByClassName('close')[0];

  // Add modal behavior
  addOpenModalBehavior(btn, modal);
  addClosingModalBehavior(close, modal);
  addClosingModalBehavior(modal, modal);

  // Get categories from API
  let bestMovies = listMoviesForCategory("");
  console.log("bestMovies", bestMovies);

  // let thrillerMovies = listMoviesForCategory("Thriller");
  // console.log("thrillerMovies", thrillerMovies);
  // let romanceMovies = listMoviesForCategory("Romance");
  // console.log("romanceMovies", romanceMovies);
  // let crimeMovies = listMoviesForCategory("Crime");
  // console.log("crimeMovies", crimeMovies);

  urlMovies(bestMovies);

}
