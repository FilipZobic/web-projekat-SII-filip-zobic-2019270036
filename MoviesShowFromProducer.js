const movieProducerSelect = document.getElementById('movieProducer')

const logedInUser = JSON.parse(localStorage.getItem('logedInUser'))

var renderProducers = function() {
    let localStorageProducer = JSON.parse(localStorage.getItem('producers'))
    for (let i = 0; i < localStorageProducer.length; i++) {
        var option = document.createElement("option")
        var fullName = producerFullName(localStorageProducer[i].name,localStorageProducer[i].surname)
        var value = fullName
        option.setAttribute('value',value)
        option.textContent = fullName
        movieProducerSelect.appendChild(option);
    }
}

var producerFullName = function(name,surname) {
    return name + ' ' + surname;
}

var searchButton = document.querySelector('.SearchBar button')



var carousel = document.querySelector(".movie-carousel")



searchButton.addEventListener('click', function(){
    var text = movieProducerSelect.value;

    var child = carousel.lastElementChild;  
            while (child) { 
                carousel.removeChild(child); 
                child = carousel.lastElementChild; 
            }

    var producerFullName;
    for (let i = 0; i < movieList.length; i++) {
        
        producerFullName = movieList[i].producer;

        if(text == producerFullName) {
            createCarouselItem(movieList[i].cover,movieList[i].name)
        } else if (text == 'all') {
            createCarouselItem(movieList[i].cover,movieList[i].name)
        }
        
    }

})

renderProducers()