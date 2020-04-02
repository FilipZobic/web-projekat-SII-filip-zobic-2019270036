//import renderMovieDetails from movieDetails;



// Prevent Refresh

var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

// Decleration

var btnContainer = document.querySelector('#startMenu-button-container');

let movie = JSON.parse(localStorage.getItem('movieDetail'));


// Render Producers

const movieProducerSelect = document.getElementById('movieProducer');


// Inits it so its not null

if(localStorage.getItem('producers') == null) {
    localStorage.setItem('producers',JSON.stringify([]));
}


const localStorageProducer = JSON.parse(localStorage.getItem('producers'));

// Init Cover list

const movieCoverSelect = document.getElementById('movieCover');
coverList = JSON.parse(localStorage.getItem('coverList'));

var producerFullName = function(name,surname) {
    return name + ' ' + surname;
}

// Default prudcer option

var optionMakeSelectedProducer = function() {
    
    let allSelectedProducerOptions = document.querySelectorAll('#movieProducer option')

    for (let i = 0; i < allSelectedProducerOptions.length; i++) {
        if(movie.producer == allSelectedProducerOptions[i].value) {
            allSelectedProducerOptions[i].selected = 'selected';
        }
    }
}

var renderProducers = function() {
    for (let i = 0; i < localStorageProducer.length; i++) {
        var option = document.createElement("option")
        var fullName = producerFullName(localStorageProducer[i].name,localStorageProducer[i].surname)
        var value = fullName
        option.setAttribute('value',value)
        option.textContent = fullName
        movieProducerSelect.appendChild(option);
    }

    optionMakeSelectedProducer();
}

renderProducers();


// Default cover option

var optionMakeSelectedCover = function() {
    
    let allSelectedCoverOptions = document.querySelectorAll('#movieCover option');

    for (let i = 0; i < allSelectedCoverOptions.length; i++) {
        if(movie.cover == allSelectedCoverOptions[i].value) {
            allSelectedCoverOptions[i].selected = 'selected';
        }
    }
}

// Render Covers

var renderCovers = function() {
    

    for (let i = 0; i < coverList.length; i++) {
        var option = document.createElement("option");
        var value = coverList[i].toLowerCase();
        value = value.replace(/\s+/g,'');
        value += '.jpg';
        option.setAttribute('value',value);
        option.textContent = coverList[i];
        movieCoverSelect.appendChild(option);
        
    }

    optionMakeSelectedCover();
}

renderCovers();

// Enable input

var allInputs = document.querySelectorAll('input');

allInputs.forEach(input => {
    input.disabled = false;
});

// Create check

let willAddMovie = true;
let idIsUnique  = true;

movieId.addEventListener('input', function () {
    let LocalStorageArray = JSON.parse(localStorage.getItem('movies'));

    let newMovieId = this.value;
    let currentMovieId = movie.id;
    let warning = document.querySelector('.user-startMenu-warning');

    for (let i = 0; i < LocalStorageArray.length; i++) {

        //add check is it the existing id
        if(newMovieId == currentMovieId) {
            warning.style.display = 'none';
            willAddMovie = true;
            idIsUnique  = true;
            break;
        }else if (LocalStorageArray[i].id == newMovieId) {
            willAddMovie = false;
            idIsUnique  = false;
            warning.style.display = 'block';
            break
        }else{
            warning.style.display = 'none'
            willAddMovie = true;
            idIsUnique  = true;
         }
        
    }
});

//Create Buttons


// // Save

var createButtonSave = function() {
    var btn = document.createElement('button');
    btn.setAttribute('class', 'btn-startMenuCosmetics');
    btn.setAttribute('id', 'btnSave');

    btn.style = "margin-left: 5px !important;";
    btn.setAttribute('type', 'submit');
    btn.setAttribute('for', 'user-startMenu');

    btn.textContent = 'save';

    btn.addEventListener('click',function(){
        let movies = JSON.parse(localStorage.getItem('movies'));

            let movieIndex;

            for (let i = 0; i < movies.length; i++) {

                if(movies[i].id == movie.id) {

                    movieIndex = i;

                    break
                }
                
            }

            const allInputs = document.querySelectorAll('input');

            if(idIsUnique) {
                willAddMovie = true;
            }

            allInputs.forEach(element => {
                if(element.value.length == 0){
                    willAddMovie = false;
                    return
                }
            });

            if(willAddMovie) {
                var movieId = document.getElementById('movieId').value
                var movieName = document.getElementById('movieName').value
                var movieGenre = document.getElementById('movieGenre').value
                var moviePrice = document.getElementById('moviePrice').value
                var movieStock = document.getElementById('movieStock').value
                var movieReleaseDate = document.getElementById('movieDate').value

                var movieProducerSelect = document.getElementById('movieProducer').value
                var movieCoverSelect = document.getElementById('movieCover').value

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

                var newMovie = new createMovieObject(movieId,movieName,movieGenre,movieReleaseDate,moviePrice,movieStock,movieProducerSelect,movieCoverSelect);
                let formLocalToJsMovies = JSON.parse(localStorage.getItem('movies'));
                formLocalToJsMovies[movieIndex] = newMovie;
                let serializedMoviesArray = JSON.stringify(formLocalToJsMovies);
                localStorage.setItem('movies',`${serializedMoviesArray}`);

                let movieDetail = JSON.stringify(newMovie);

                localStorage.setItem('movieDetail',movieDetail);


                window.location.href = "MovieDetails.html";
            }
    })
    btnContainer.appendChild(btn);
}


// // Back

var createButtonBack = function() {
    var btn = document.createElement('button');
    btn.setAttribute('class', 'btn-startMenuCosmetics');
    btn.setAttribute('id', 'btnBack');

    btn.textContent = 'back';
    

    btn.addEventListener('click',function() {
        window.location.href = "MovieDetails.html";
    })

    btnContainer.appendChild(btn);

}

// Render all info

let renderMovieDetails = function() {

    const movieId = document.getElementById('movieId');
    const movieName = document.getElementById('movieName');
    const movieGenre = document.getElementById('movieGenre');
    const moviePrice = document.getElementById('moviePrice');
    const movieStock = document.getElementById('movieStock');
    const movieReleaseDate = document.getElementById('movieDate');
    const movieProducer = document.getElementById('movieProducer');

    movieId.value = movie.id;
    movieName.value = movie.name;
    movieGenre.value = movie.genre;
    moviePrice.value = movie.price;
    movieReleaseDate.value = movie.releaseDate;
    movieStock.value = movie.stock;
    movieProducer.value = movie.producer;

    const form = document.querySelector('form');
    form.style.backgroundImage = `url('./Pictures/${movie.cover}')`;
}

renderMovieDetails();
createButtonBack();
createButtonSave();

//renderMovieDetails()



