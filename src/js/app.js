// HTML Modal code
function openModalBehavior (clickingElement, modal, urlMovie){
    clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    modal.style.display = "flex";
    showInfoOnModal(urlMovie);
  });
}

function closeModalBehavior(clickingElement, modal){
  clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target === clickingElement) {
      modal.style.display = "none";
    }
  });
}

// API fetch code
function showInfoOnModal(url){
  url
  .then(details => {
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
      document.getElementById("modal_income").textContent = "Il n'y en a pas d'information";
    }
    else {
      document.getElementById("modal_income").textContent = details.worldwide_gross_income+" USD";
    }
  })
}

function getMovieDetails(urlMovie){
  return fetch(urlMovie).then(movieDetails => movieDetails.json())
}

function showMovies(movies, category) {
  urlMoviesList = [];
  movies
  .then(moviesData => {
    for (let movieData = 0; movieData < moviesData.results.length; movieData++) {
      urlMovie = getMovieDetails(moviesData.results[movieData].url);
      let clickingMovieElement = document.getElementById(category + movieData.toString());
      let modal = document.getElementById('modal');
      openModalBehavior(clickingMovieElement, modal, urlMovie);
      urlMovie.then(details => document.getElementById(category + movieData.toString()).src = details.image_url)

      if (category === "cat-0-") {
        document.getElementById("cover-page-title").textContent = moviesData.results[0].title;
        document.getElementById("cover-page-image").src = moviesData.results[0].image_url;
        if (movieData === 0){
          urlMovie.then(details => document.getElementById("cover-page-description").textContent = details.description);
          openModalBehavior(document.getElementById("cover-page-btn"), modal, urlMovie);
        }
      }
    }
  })
  .catch(error => console.error("il y a une erreur :", error));
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

window.onload = function() {
  let close = document.getElementsByClassName('close')[0];
  let modal = document.getElementById('modal');
  const cat_1 = "Crime";
  const cat_2 = "Family";
  const cat_3 = "Action";

  // Add closing modal behavior
  closeModalBehavior(close, modal);
  closeModalBehavior(modal, modal);

  // Get categories from API
  let bestMovies = listMoviesForCategory("");

  let cat1Movies = listMoviesForCategory(cat_1);
  let cat2Movies = listMoviesForCategory(cat_2);
  let cat3Movies = listMoviesForCategory(cat_3);

  // Show movies on modal and index page
  showMovies(bestMovies, "cat-0-");

  showMovies(cat1Movies, "cat-1-");
  showMovies(cat2Movies, "cat-2-");
  showMovies(cat3Movies, "cat-3-");

  // Titles on index
  document.getElementById("cat-1-titre").textContent = cat_1;
  document.getElementById("cat-2-titre").textContent = cat_2;
  document.getElementById("cat-3-titre").textContent = cat_3;
}
