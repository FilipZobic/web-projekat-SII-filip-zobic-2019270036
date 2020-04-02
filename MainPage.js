let loggedInUser = JSON.parse(localStorage.getItem('logedInUser'));

var navigationItems = document.querySelector('.navigationItems > ul');

let movieList = JSON.parse(localStorage.getItem('movies'));

var form = document.querySelector("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

var createNavigationItem = function(text,filename) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let span = document.createElement('span');
    span.textContent = text;
    a.setAttribute('href',filename);
    a.appendChild(span);
    li.appendChild(a);
    if(text.length>8) {
        li.style.width = '150px';
    }
    navigationItems.appendChild(li);
}

var plugUsersName = function(name,isAdmin) {

    var plugUserLocation = document.getElementById('showWhoIsOnline');
    plugUserLocation.innerHTML = name;
    if(isAdmin) {
        plugUserLocation.style.color = 'red';
    }
}

if(loggedInUser==null) {
    window.location.href = "UserLogin.html";
}if(loggedInUser.type == 'user'){
    createNavigationItem('cart','CartShow.html');
    createNavigationItem('purchases','PurchaseHistory.html');
    createNavigationItem('profile','UserShowProfile.html');
    plugUsersName(loggedInUser.username,false);
}else if(loggedInUser.type == 'admin'){
    
    createNavigationItem('ADD M.','MovieAdd.html');
    createNavigationItem('ADD Prod.','AddProducer.html');
    createNavigationItem('ADD A.','AddAdmin.html');
    plugUsersName(loggedInUser.username,true);
}else {
    window.location.href = "UserLogin.html";
}

document.querySelector('#userInfo > span > p').addEventListener('click', ()=>{
    window.localStorage.removeItem('logedInUser');
    window.location.href = "UserLogin.html";
})

var movieExists = function() {
    if(localStorage.getItem('movies')==null) {
        let movies = JSON.stringify([]);
        localStorage.setItem('movies',movies);
    }
    
}

var isThisTheMovie = function(movieName,text) {
    movieName = movieName.toLowerCase();
    itemFound = movieName.includes(text);
    if(itemFound == true) {
        return true;
    }
}

let findMovieById = function (id) {

    for (let i = 0; i < movieList.length; i++) {
                
                
        if(id == movieList[i].id) {
            return movieList[i];
        }
        
    }

    return movieObject;
}

let movieIdentifer = "uniqueMovieID-";

let navigateToDetails = function(){

    let movieId = this.id;
    let cutTo = movieIdentifer.length;

    movieId = movieId.slice(cutTo);

    let movieObject = findMovieById(movieId);

    let movieObjectJSON = JSON.stringify(movieObject);

    window.localStorage.setItem('movieDetail',movieObjectJSON);
}

var carousel = document.querySelector(".movie-carousel");

movieExists();


var createCarouselItem = function(cover,name,id) {
    var a = document.createElement("a");
        a.setAttribute('class','movie-item');
        a.setAttribute('href','MovieDetails.html');
        a.setAttribute('id',`${movieIdentifer}${id}`);

        var coverImg = document.createElement("div");
        coverImg.setAttribute('class','coverImgCarousel');

        var img = document.createElement('img');
        img.setAttribute('src',`./Pictures/${cover}`);
        img.setAttribute('alt','');

        var h5 = document.createElement('h5');
        h5.textContent = name;

        a.appendChild(coverImg);
        a.appendChild(img);
        a.appendChild(h5);

        a.addEventListener('click',navigateToDetails)

        carousel.appendChild(a);
}

// Init cover images

var initCover = function() {

    var coverList = ['Fight Club','Alien','Pulp Fiction','Taxi Driver','Moonlight','Shutter Island','Inception','The Departed','District 9','Joker (2019)', 'Stone Hearst Asylum'];

    parsedCoverList = JSON.stringify(coverList);

    localStorage.setItem('coverList', parsedCoverList);
}


var renderAllMovies = function() {
    

    initCover();

    for (let i = 0; i < movieList.length; i++) {
        
        createCarouselItem(movieList[i].cover,movieList[i].name,movieList[i].id);
    }
}

renderAllMovies();

var searchBarExists = document.querySelector('.SearchBar input');

if(searchBarExists != null) {
    document.querySelector('.SearchBar input').addEventListener('input', function(){
        var text = this.value;
    
        var child = carousel.lastElementChild;  
            while (child) { 
                carousel.removeChild(child); 
                child = carousel.lastElementChild; 
            }
    
        if(text.length == 0) {
            renderAllMovies();
        }else{
            text = text.toLowerCase();
            var showItem;
            for (let i = 0; i < movieList.length; i++) {
                
                
                showItem = isThisTheMovie(movieList[i].name,text);
    
                if(showItem == true) {
                    createCarouselItem(movieList[i].cover,movieList[i].name);
                }
                
            }
        }
    })
}

if(localStorage.getItem('billNumber') ==null){
    localStorage.setItem('billNumber',JSON.stringify(0));
}