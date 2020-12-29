//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//eventListeners
eventListeners();
function eventListeners() {
  formulario.addEventListener('submit', agregarTweet)

  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse( localStorage.getItem('tweets') ) || []


    crearHtml();
  });
}





//Functions

function agregarTweet(e) {
  e.preventDefault();

  //textarea donde el usuario escribe
  const tweet = document.querySelector('#tweet').value;

  //validacion
  if( tweet === '' ) {
    mostrarError('Un mensaje no puede ir vacio');

    return //Sale de la funcion y evita que se ejecute mas codigo
  }
  const tweetObj = {
    id: Date.now(),
    tweet
  }
  //Añadir tweet al arreglo de tweets
  tweets = [...tweets, tweetObj];

  //Crear HTML
  crearHtml();

  //Resetear el formulario
  formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  //insertarlo en el contenido
  const contenido = document.querySelector('#contenido');
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    //elimina la alerta despues de 3 segundos
    mensajeError.remove();
  }, 3000);
}

function crearHtml() {

  limpiarHTML();
  if( tweets.length > 0 ) {
    tweets.forEach( tweet => {
      //Agregar boton de eliminar
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';
      
      //Añadir funcion de eliminar 
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      }

      //Crear HTML
      const li = document.createElement('li');

      //añadir texto
      li.innerText = tweet.tweet;

      //Asignar boton de eliminar
      li.appendChild(btnEliminar);

      //insertarlo en el html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

//limpiar HTML

function limpiarHTML() {
  while( listaTweets.firstChild ) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

//Eliminar tweet
function borrarTweet(id) {
  tweets = tweets.filter( tweet => tweet.id !== id);

  crearHtml();
}

//Agrega los tweets actuales a local storage
function sincronizarStorage() {
  localStorage.setItem('tweets', JSON.stringify(tweets))
}