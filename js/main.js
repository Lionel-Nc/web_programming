document.addEventListener('DOMContentLoaded', function() {
// Quand l'utilisateur scrole la page, execute myFunction
window.addEventListener('scroll', myFunction);

// récupère la barre de navigation grace à son id
var header = document.getElementById("monHeader");

// récupère la position offset de la navbar
var sticky = header.offsetTop;

// Ajoute la classe figée au header lorsque la position de scroll. 
//Enlève "sticky" quand tu quittes le scroll
function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } 
  else {
    header.classList.remove("sticky");
  }
}
})
