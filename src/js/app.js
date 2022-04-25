// HTML Modal code
function addOpenModalBehavior (clickingElement, modal, urlMovie){
  // for (let element of clickingElement){
    clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    modal.style.display = "flex";
    htmlCode(urlMovie);
  });
  // }
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
    console.log("details.title", details.title);
    document.getElementById("modal_image").src = details.image_url;
    document.getElementById("modal_title").textContent = details.title;
    document.getElementById("modal_genre").textContent = details.genres;
    document.getElementById("modal_date").textContent = details.date_published;
    document.getElementById("modal_rated").textContent = details.rated;
    document.getElementById("modal_imdb").textContent = details.imdb_score;
    document.getElementById("modal_director").textContent = details.directors;
    document.getElementById("modal_actors").textContent = details.actors;
    document.getElementById("modal_duration").textContent = details.duration+" min";
    document.getElementById("modal_countries").textContent = details.countries;
    document.getElementById("modal_description").textContent = details.description;
    if (details.worldwide_gross_income === null) {
      document.getElementById("modal_income").textContent = "Il n'y a pas de données";
    }
    else {
      document.getElementById("modal_income").textContent = details.worldwide_gross_income+" USD";
    }
    // return details.blob();
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

// function showMoviesInfo(infoMovies, category){
//   for (let infoMovie = 0; infoMovie < infoMovies.length; infoMovie++) {
//     console.log("infoMovies[infoMovie]", infoMovies[infoMovie]);
//     infoMovies[infoMovie]
//     .then(info => {
//       if (category === "cat-1-") {
//         let clickingMovieElement = document.getElementById(category + infoMovie.toString());
//         let modal = document.getElementById('modal');
//         // addOpenModalBehavior(clickingMovieElement, modal);
//         console.log("infoMovies[infoMovie].url", infoMovies[infoMovie].url);
//       }
//     })
//   }
// }

function getUrlMovies(movies, category) {
  urlMoviesList = [];
  movies
  .then(moviesData => {

    for (let movieData = 0; movieData < moviesData.results.length; movieData++) {
      urlMovie = getMovieDetails(moviesData.results[movieData].url);
      console.log("movieData", movieData);
      console.log("urlMovie", urlMovie);
      urlMoviesList.push(urlMovie);
      if (category === "cat-1-") {
        console.log("category", category + movieData.toString());
        let clickingMovieElement = document.getElementById(category + movieData.toString());
        // document.getElementById(clickingMovieElement).src = urlMovie.image_url;
        console.log("clickingMovieElement", clickingMovieElement);
        let modal = document.getElementById('modal');
        addOpenModalBehavior(clickingMovieElement, modal, urlMovie);
      }
      if (category === "cat-2-") {
        console.log("category", category + movieData.toString());
        let clickingMovieElement = document.getElementById(category + movieData.toString());
        console.log("clickingMovieElement", clickingMovieElement);
        let modal = document.getElementById('modal');
        addOpenModalBehavior(clickingMovieElement, modal, urlMovie);
      }
      if (category === "cat-3-") {
        console.log("category", category + movieData.toString());
        let clickingMovieElement = document.getElementById(category + movieData.toString());
        console.log("clickingMovieElement", clickingMovieElement);
        let modal = document.getElementById('modal');
        addOpenModalBehavior(clickingMovieElement, modal, urlMovie);
      }
      if (category === "cat-4-") {
        console.log("category", category + movieData.toString());
        let clickingMovieElement = document.getElementById(category + movieData.toString());
        console.log("clickingMovieElement", clickingMovieElement);
        let modal = document.getElementById('modal');
        addOpenModalBehavior(clickingMovieElement, modal, urlMovie);
      }
      // htmlCode(urlMovie);
    }
    // console.log("urlMoviesList", urlMoviesList);
    return urlMoviesList
  })
  .catch(error => console.error("il y a une erreur :", error));
  return urlMoviesList
}

// function listUrlMovies(movies) {
//   let urlMoviesList = [];
//   let infoMovies = movies.then(value => value.results);
//   const moviesNumber = movies.then(value => value.results.length);
//   console.log("infoMovies", infoMovies);
//   console.log("moviesNumber", moviesNumber);
//
//   for (let movie = 0; movie < 7; movie++){
    // urlMoviesList.push(movies.then(value => value.results[movie]));
//   }
//   return urlMoviesList
// }

window.onload = function() {
  let btn = document.getElementsByClassName('btn');
  let modal = document.getElementById('modal');
  let close = document.getElementsByClassName('close')[0];

  // Add modal behavior
  // addOpenModalBehavior(btn, modal);
  addClosingModalBehavior(close, modal);
  addClosingModalBehavior(modal, modal);

  // Get categories from API
  let bestMovies = listMoviesForCategory("");
  console.log("bestMovies", bestMovies);

  let cat2Movies = listMoviesForCategory("Thriller");
  console.log("thrillerMovies", cat2Movies);
  let cat3Movies = listMoviesForCategory("Romance");
  console.log("romanceMovies", cat3Movies);
  let cat4Movies = listMoviesForCategory("Crime");
  console.log("crimeMovies", cat4Movies);

  // Show movies on modal
  let infoBestMovies = getUrlMovies(bestMovies, "cat-1-");
  console.log("infoBestMovies", infoBestMovies);

  let infoCat2Movies = getUrlMovies(cat2Movies, "cat-2-");
  console.log("infoCat2Movies", infoCat2Movies);
  let infoCat3Movies = getUrlMovies(cat3Movies, "cat-3-");
  console.log("infoCat3Movies", infoCat3Movies);
  let infoCat4Movies = getUrlMovies(cat4Movies, "cat-4-");
  console.log("infoCat4Movies", infoCat4Movies);

  // let categoryId = document.getElementById('modal');
  // showMoviesInfo(infoBestMovies, "cat-1-");
  // let bestMoviesList = urlMovies(bestMovies);
  // console.log("bestMoviesList", bestMoviesList);

}
