// JS Modal code
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

function getMovieDetails(movieId){
    return fetch('api-url-for-movie').then(response => response.json())
}

function listMoviesForCategory(searchParams) {
    const params = new URLSearchParams({
        page_size: 12,
        category: searchParams.category
    })
    return fetch('....?' + params.toString()).then(response => response.json())
}

window.onload = function() {
    let btn = document.getElementsByClassName('btn');
    let modal = document.getElementById('modal');
    let close = document.getElementsByClassName('close')[0];

    // Add modal behavior
    addOpenModalBehavior(btn, modal);
    addClosingModalBehavior(close, modal);
    addClosingModalBehavior(modal, modal);


}
