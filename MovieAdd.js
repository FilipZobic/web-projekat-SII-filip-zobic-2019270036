const btn = document.getElementById('btn-startMenu');


const movieId = document.getElementById('movieId');
const movieName = document.getElementById('movieName');
const movieGenre = document.getElementById('movieGenre');
const moviePrice = document.getElementById('moviePrice');
const movieStock = document.getElementById('movieStock');
const movieReleaseDate = document.getElementById('movieDate');

const movieProducerSelect = document.getElementById('movieProducer');
const movieCoverSelect = document.getElementById('movieCover');

const allInputs = document.querySelectorAll('input');

var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

let willAddMovie = true;

var createMovieObject = function(id,name,genre,releaseDate,price,stock,producer,cover){

    this.id = id;
    this.name = name;
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.price = price;
    this.stock = stock;
    this.producer = producer;
    this.cover = cover;

}

var movieExists = function() {
    if(localStorage.getItem('movies')==null) {
        let movies = JSON.stringify([]);
        localStorage.setItem('movies',movies);
    }
    
}

movieId.addEventListener('input', function () {
    movieExists();
    let LocalStorageArray = JSON.parse(localStorage.getItem('movies'))

    let newMovieId = this.value;
    let warning = document.querySelector('.user-startMenu-warning');

    for (let i = 0; i < LocalStorageArray.length; i++) {
        if (LocalStorageArray[i].id == newMovieId) {
            willAddMovie = false;
            warning.style.display = 'block';;
            break
        }else{
            warning.style.display = 'none';
            willAddMovie = true;
         }
        
    }
});

btn.addEventListener('click', ()=>{

    movieExists();
    

    allInputs.forEach(element => {
        if(element.value.length == 0){
            willAddMovie = false;
            return;
        }
    });
    
    if(willAddMovie) {

        var newMovie = new createMovieObject(movieId.value,movieName.value,movieGenre.value,movieReleaseDate.value,moviePrice.value,movieStock.value,movieProducerSelect.value,movieCoverSelect.value);
        let parsedMoviesArray = JSON.parse(localStorage.getItem('movies'));
        parsedMoviesArray.push(newMovie);
        let serializedMoviesArray = JSON.stringify(parsedMoviesArray);
        localStorage.setItem('movies',`${serializedMoviesArray}`);



        allInputs.forEach(inputField => {
            inputField.value = '';
        });
        alert("Added movie");
    }

})

document.querySelector('#btn-back').addEventListener('click', ()=>{
    window.location.href = "MainPage.html";
})

var renderProducers = function() {
    if (JSON.parse(localStorage.getItem('producers') == null)){
        localStorage.setItem('producers',JSON.stringify([]));
    }
    let localStorageProducer = JSON.parse(localStorage.getItem('producers'));
    for (let i = 0; i < localStorageProducer.length; i++) {
        var option = document.createElement("option");
        var fullName = producerFullName(localStorageProducer[i].name,localStorageProducer[i].surname);
        var value = fullName;
        option.setAttribute('value',value);
        option.textContent = fullName;
        movieProducerSelect.appendChild(option);
    }
}

var producerFullName = function(name,surname) {
    return name + ' ' + surname;
}

var renderCovers = function() {

    coverList = JSON.parse(localStorage.getItem('coverList'));

    for (let i = 0; i < coverList.length; i++) {
        var option = document.createElement("option");
        var value = coverList[i].toLowerCase();
        value = value.replace(/\s+/g,'');
        value += '.jpg';
        option.setAttribute('value',value);
        option.textContent = coverList[i];
        movieCoverSelect.appendChild(option);
        
    }
}

renderCovers();
renderProducers();

// <option selected value="nocover">NONE</option>