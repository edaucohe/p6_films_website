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

function listMoviesForCategory({category, count, sortBy}) {
  let params = {
    page_size: count,
    sort_by: sortBy
  }
  if (category){
    params.genre = category
  }
  const searchParams = new URLSearchParams(params)
  return fetch('http://localhost:8000/api/v1/titles/?' + params.toString())
  .then(response => response.json())
}

const CATEGORIES = [
  {
    count: 8,
    sortBy: "-imdb_score",
    htmlId: "cat-0"
  },
  {
    category: "Crime"
    count: 7,
    sortBy: "-imdb_score"
    htmlId: "cat-1"
  },
  {
    category: "Family"
    count: 7,
    sortBy: "-imdb_score"
    htmlId: "cat-2"
  },
  {
    category: "Action"
    count: 7,
    sortBy: "-imdb_score"
    htmlId: "cat-3"
  }
];

window.onload = function() {
  let close = document.getElementsByClassName('close')[0];
  let modal = document.getElementById('modal');
  
  // Add closing modal behavior
  closeModalBehavior(close, modal);
  closeModalBehavior(modal, modal);

  // Get categories from API
  let bestMovies = listMoviesForCategory(CATEGORIES[0]);
  let bestMovie = bestMovies.splice(0, 1);

  let cat1Movies = listMoviesForCategory(CATEGORIES[1]);
  let cat2Movies = listMoviesForCategory(CATEGORIES[2]);
  let cat3Movies = listMoviesForCategory(CATEGORIES[3]);

  // Show movies on modal and index page
  showMovies(bestMovies, `${CATEGORIES[0].htmlId}-`);

  showMovies(cat1Movies, `${CATEGORIES[1].htmlId}-`);
  showMovies(cat2Movies, `${CATEGORIES[2].htmlId}-`);
  showMovies(cat3Movies, `${CATEGORIES[3].htmlId}-`);

  // Titles on index
  document.getElementById(`${CATEGORIES[1].htmlId}-titre`).textContent = CATEGORIES[1].category;
  document.getElementById(`${CATEGORIES[2].htmlId}-titre`).textContent = CATEGORIES[2].category;
  document.getElementById(`${CATEGORIES[3].htmlId}-titre`).textContent = CATEGORIES[3].category;
}
