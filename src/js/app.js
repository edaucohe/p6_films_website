// ** HTML Code **

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

// HTML carousel code
function activeCarousel(movies, category, slider_index){
  const moviesNumber = 7;
  let imgCarouselCategory = [];

  if (slider_index_0 < 0) {
    slider_index_0 = 6;
    slider_index = slider_index_0;
  }
  else if (slider_index_0 > 6) {slider_index_0 = 0;}
  else {slider_index_0 = slider_index_0;}

  if (slider_index_1 < 0) {
    slider_index_1 = 6;
    slider_index = slider_index_1;
  }
  else if (slider_index_1 > 6) {slider_index_1 = 0;}
  else {slider_index_1 = slider_index_1;}

  if (slider_index_2 < 0) {
    slider_index_2 = 6;
    slider_index = slider_index_2;
  }
  else if (slider_index_2 > 6) {slider_index_2 = 0;}
  else {slider_index_2 = slider_index_2;}

  if (slider_index_3 < 0) {
    slider_index_3 = 6;
    slider_index = slider_index_3;
  }
  else if (slider_index_3 > 6) {slider_index_3 = 0;}
  else {slider_index_3 = slider_index_3;}

  for (let movieNumber = 0; movieNumber < moviesNumber; movieNumber++) {
    imgCarouselCategory.push(category + movieNumber.toString())
    movieNumberOut = movieNumber+slider_index;
  }
  let moviesElements = imgCarouselCategory.splice(0, slider_index);
  imgCarouselCategory.push(...moviesElements);

  showMoviesFromCarousel(movies, category, imgCarouselCategory)
}

function clicArrowLeft(clickingElement, movies, category){
  clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target === clickingElement) {
      let slider_index = 0;
      let imgCarouselCategory = [];
      const moviesNumber = 7;

      if (category === "cat-0-") {
        slider_index_0 -= 1;
        slider_index = slider_index_0;
      }
      else if (category === "cat-1-") {
        slider_index_1 -= 1;
        slider_index = slider_index_1;
      }
      else if (category === "cat-2-") {
        slider_index_2 -= 1;
        slider_index = slider_index_2;
      }
      else if (category === "cat-3-") {
        slider_index_3 -= 1;
        slider_index = slider_index_3;
      }

      activeCarousel(movies, category, slider_index);
    }
  })
}

function clicArrowRight(clickingElement, movies, category){
  clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target === clickingElement) {
      let slider_index = 0;
      let imgCarouselCategory = [];
      const moviesNumber = 7;

      if (category === "cat-0-") {
        slider_index_0 += 1;
        slider_index = slider_index_0;
      }
      else if (category === "cat-1-") {
        slider_index_1 += 1;
        slider_index = slider_index_1;
      }
      else if (category === "cat-2-") {
        slider_index_2 += 1;
        slider_index = slider_index_2;
      }
      else if (category === "cat-3-") {
        slider_index_3 += 1;
        slider_index = slider_index_3;
      }

      activeCarousel(movies, category, slider_index);
    }
  })
}

// ** API code **

// Display code
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

function showMoviesFromCarousel(movies, category, newCategory) {
  movies
  .then(moviesData => {
    for (let movieData = 0; movieData < moviesData.results.length; movieData++) {

      let clickingMovieElement = document.getElementById(newCategory[movieData]);
      let modal = document.getElementById('modal');
      urlMovie = getMovieDetails(moviesData.results[movieData].url);

      urlMovie.then(details => document.getElementById(newCategory[movieData]).src = details.image_url)
      openModalBehavior(clickingMovieElement, modal, urlMovie);
    }
  })
  .catch(error => console.error("il y a une erreur :", error));
}

function showMoviesByDefault(movies, category) {
  movies
  .then(moviesData => {
    for (let movieData = 0; movieData < moviesData.results.length; movieData++) {

      let clickingMovieElement = document.getElementById(category + movieData.toString());
      let modal = document.getElementById('modal');
      urlMovie = getMovieDetails(moviesData.results[movieData].url);

      urlMovie.then(details => document.getElementById(category + movieData.toString()).src = details.image_url)
      openModalBehavior(clickingMovieElement, modal, urlMovie);
    }
  })
  .catch(error => console.error("il y a une erreur :", error));
}

function showBestMovie(bestMovie, btn){
  bestMovie
  .then(movieData => {
    let clickingMovieElement = document.getElementById(btn);
    let modal = document.getElementById('modal');
    urlMovie = getMovieDetails(movieData[0].url);

    urlMovie.then(details => {
      document.getElementById("cover-page-title").textContent = details.title;
      document.getElementById("cover-page-image").src = details.image_url;
      document.getElementById("cover-page-description").textContent = details.description
    })
    openModalBehavior(clickingMovieElement, modal, urlMovie);
  })
}

// API fetch code
function getMovieDetails(urlMovie){
  return fetch(urlMovie).then(movieDetails => movieDetails.json())
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
  return fetch('http://localhost:8000/api/v1/titles/?' + searchParams.toString())
  .then(response => response.json())
}


const CATEGORIES = [
  {
    clickingElement: "cover-page-btn",
    count: 8,
    sortBy: "-imdb_score",
    htmlId: "cat-0"
  },
  {
    category: "Crime",
    count: 7,
    sortBy: "-imdb_score",
    htmlId: "cat-1"
  },
  {
    category: "Family",
    count: 7,
    sortBy: "-imdb_score",
    htmlId: "cat-2"
  },
  {
    category: "Fantasy",
    count: 7,
    sortBy: "-imdb_score",
    htmlId: "cat-3"
  }
];

let slider_index_0 = 0;
let slider_index_1 = 0;
let slider_index_2 = 0;
let slider_index_3 = 0;

window.onload = function() {
  let close = document.getElementsByClassName('close')[0];
  let modal = document.getElementById('modal');
  let left_arrow = document.getElementsByClassName('left_arrow');
  let right_arrow = document.getElementsByClassName('right_arrow');

  // Add closing modal behavior
  closeModalBehavior(close, modal);
  closeModalBehavior(modal, modal);

  // Get categories from API
  let bestMovies = listMoviesForCategory(CATEGORIES[0]);
  let bestMovie = bestMovies.then(details => details.results.splice(0, 1))

  let cat1Movies = listMoviesForCategory(CATEGORIES[1]);
  let cat2Movies = listMoviesForCategory(CATEGORIES[2]);
  let cat3Movies = listMoviesForCategory(CATEGORIES[3]);

  // Show movies on modal and index page
  showBestMovie(bestMovie, `${CATEGORIES[0].clickingElement}`);
  showMoviesByDefault(bestMovies, `${CATEGORIES[0].htmlId}-`);

  showMoviesByDefault(cat1Movies, `${CATEGORIES[1].htmlId}-`);
  showMoviesByDefault(cat2Movies, `${CATEGORIES[2].htmlId}-`);
  showMoviesByDefault(cat3Movies, `${CATEGORIES[3].htmlId}-`);

  // Titles on index
  document.getElementById(`${CATEGORIES[1].htmlId}-titre`).textContent = CATEGORIES[1].category;
  document.getElementById(`${CATEGORIES[2].htmlId}-titre`).textContent = CATEGORIES[2].category;
  document.getElementById(`${CATEGORIES[3].htmlId}-titre`).textContent = CATEGORIES[3].category;

  // Carousel behavior
  clicArrowLeft(left_arrow[0], bestMovies, `${CATEGORIES[0].htmlId}-`);
  clicArrowRight(right_arrow[0], bestMovies, `${CATEGORIES[0].htmlId}-`);
  clicArrowLeft(left_arrow[1], cat1Movies, `${CATEGORIES[1].htmlId}-`);
  clicArrowRight(right_arrow[1], cat1Movies, `${CATEGORIES[1].htmlId}-`);
  clicArrowLeft(left_arrow[2], cat2Movies, `${CATEGORIES[2].htmlId}-`);
  clicArrowRight(right_arrow[2], cat2Movies, `${CATEGORIES[2].htmlId}-`);
  clicArrowLeft(left_arrow[3], cat3Movies, `${CATEGORIES[3].htmlId}-`);
  clicArrowRight(right_arrow[3], cat3Movies, `${CATEGORIES[3].htmlId}-`);
}
