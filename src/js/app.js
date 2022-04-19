// JS Modal code
let btn = document.getElementsByClassName('btn');
let modal = document.getElementById('modal');
let close = document.getElementsByClassName('close')[0];

function openModal (clickingElement){
  for (let element of clickingElement){
      element.addEventListener("click", function(event){
      event.preventDefault();
      modal.style.display = "block";
    });
  }
}

function closeModal(clickingElement){
  clickingElement.addEventListener("click", function(event){
    event.preventDefault();
    if (event.target == clickingElement) {
      modal.style.display = "none";
    }
  });
}

openModal(btn);
closeModal(close);
closeModal(modal);
