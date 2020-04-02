let movie = JSON.parse(localStorage.getItem('movieDetail'));
let user = JSON.parse(localStorage.getItem('logedInUser'));

// Prevent Refresh

var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

document.querySelector('button').addEventListener('click',()=>{
    window.location.href = "MainPage.html";
})

// render items based on user

let buttonContainer = document.querySelector('#startMenu-button-container');

let previusValue;
previusValue = document.querySelector('#cartAmount').value;

const movieStock = document.getElementById('movieStock');
const cartAmount = document.querySelector('#cartAmount');

const cartAmountContainer = document.querySelector('.cartAmountContainer');

cartAmount.setAttribute('max',movieStock.value.length);

var shouldMakeChange

var checkMovieStock = function() {
    if(parseInt(getStockNumberMax()) - getStockNumberCurrent() == 0) {
        cartAmount.disabled = true;
        //buttonC.disabled = true;   
        document.querySelector('#btn-addToCart').style.display = 'none';
    }else{
        cartAmount.disabled = false;
        document.querySelector('#btn-addToCart').style.display = 'block'; 
        }
}

let renderAdminBtn1 = function() {
    let buttonM = document.createElement('button');
    buttonM.setAttribute('class', 'btn-startMenuCosmetics');
    buttonM.setAttribute('id', 'btn-modify');
    buttonM.style = "margin-right: 5px;";
    
    buttonM.addEventListener('click',()=>{
        window.location.href = "MovieChange.html";
    });
    
    buttonM.textContent = "MODIFY";
        
    
    buttonContainer.appendChild(buttonM);
};

let renderAdminBtn2 = function() {
    let buttonD = document.createElement('button');
        buttonD.setAttribute('class', 'btn-startMenuCosmetics');
        buttonD.setAttribute('id', 'btn-delete');
    
    
        buttonD.textContent = "DELETE";

        buttonD.addEventListener('click',()=>{

            let movies = JSON.parse(localStorage.getItem('movies'));

            for (let i = 0; i < movies.length; i++) {

                if(movies[i].id == movie.id) {
                    movies.splice(i,1);
                    break;
                }
                
            }

            let serializedMoviesArray = JSON.stringify(movies);
            localStorage.setItem('movies',`${serializedMoviesArray}`);

            alert("Movie has been deleted")
            window.location.href = "MainPage.html";
        })
    
        buttonContainer.appendChild(buttonD)
};

// Add function to user button 

var getInputValue = function(){
    return cartAmount.value;
}

var setInputValueToEmpty = function(){
    cartAmount.value = '';
}

var addFunctionToBtn = function(buttonC) {
    buttonC.addEventListener('click',function(){

        if(cartAmount.value == ''){
            alert("Error empty field")
            return
        }
        let newAmount = parseInt(getInputValue());
        setInputValueToEmpty();

        let movieIsInUserCart = getHasMovieInCart();

        if(movieIsInUserCart){
            let cartMovieIndex = getMovieCartIndex();
            user.cart[cartMovieIndex][1] = parseInt(getCurrentAmountStockProfile()) + newAmount;
        }else {
            user.cart.push([movie,newAmount]);
        }


        setUserLoginInfo()
        let userIndex = getLogedInUserDatabaseIndex();
        setUsersInfo(userIndex);

        setStockInfo();


        previusValue = '';
        checkMovieStock();

    })
}

let renderUserBtn1 = function() {
    let buttonC = document.createElement('button');
        buttonC.setAttribute('class', 'btn-startMenuCosmetics');
        buttonC.setAttribute('id', 'btn-addToCart');
        buttonC.style.marginLeft = '5px';
        buttonC.style = 'max-width: 400px;';
        buttonC.style.display = 'inline-block !important';

        buttonC.textContent = "ADD TO CART";

        buttonContainer.appendChild(buttonC);
        checkMovieStock();
        addFunctionToBtn(buttonC);
}



// Render buttons based on user type

let renderButtons = function() {
    if(user.type == 'admin') {
        renderAdminBtn1();
        renderAdminBtn2();
    
    }else if(user.type == 'user') {cartAmountContainer.style.display = 'inline-block';
        renderUserBtn1();
    }else {
        window.location.href = "UserLogin.html";
    }
}

// Fills out the blank spaces


//declared line 26 movieStock
const movieId = document.getElementById('movieId');
let cartArray;
if(user.cart == undefined) {
    cartArray = [[function(){this.id = movie.id},movie.stock]];
}else {
    cartArray = user.cart;
}

var getStockNumberMax = function() {
    return parseInt(movie.stock);
}

var getStockNumberCurrent = function() {
    return parseInt(movieStock.value.slice(-getStockNumberMax().length));
}

var setStockInfo = function() {
    let hasItemInCart = getHasMovieInCart();

    if(hasItemInCart){
        movieStock.value = getCurrentAmountStockProfile() + " / " + getStockNumberMax();
    }else{
        movieStock.value = '0' + " / " + getStockNumberMax();
    }

    
}

var getHasMovieInCart = function() {
    let getHasMovieInCart;
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i][0].id == movieId.value){
            getHasMovieInCart = true;
            break;
        }else{
            getHasMovieInCart = false;
        }
    }
    return getHasMovieInCart;
}

var getCurrentAmountStockProfile = function() {
    let currentAmountInCart;
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i][0].id == movieId.value){
            currentAmountInCart = cartArray[i][1];
            return parseInt(currentAmountInCart);
        }
    }
    return 0;
}

var getMovieCartIndex = function() {
    let movieIndexInCart;
    for (let i = 0; i < cartArray.length; i++) {
        if(cartArray[i][0].id == movieId.value){
            movieIndexInCart = i;
            return movieIndexInCart;
        }
    }
}

let renderMovieDetails = function() {

    const movieName = document.getElementById('movieName');
    const movieGenre = document.getElementById('movieGenre');
    const moviePrice = document.getElementById('moviePrice');
    const movieReleaseDate = document.getElementById('movieDate');
    const movieProducer = document.getElementById('movieProducer');
    //declared line 26 movieStock

    

    movieId.value = movie.id;
    movieName.value = movie.name;
    movieGenre.value = movie.genre;
    moviePrice.value = movie.price +' $';
    movieReleaseDate.value = movie.releaseDate;
    movieProducer.value = movie.producer;

    const form = document.querySelector('form');
    form.style.backgroundImage = `url('./Pictures/${movie.cover}')`;

    let movieIsInCart = getHasMovieInCart();

    if(!movieIsInCart){
        currentAmountInCart = 0;
    }
    
    
    setStockInfo();
    
}

let setDummyUserLoginInfo = function(index,newAmount) {
    user.cart[index][1] = newAmount;
}

let setUserLoginInfo = function() {
    localStorage.setItem('logedInUser',JSON.stringify(user));
}

let getLogedInUserDatabaseIndex = function(usersUserId = user.username) {
    let users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == usersUserId) {
            return i;
        }
        
    }
}

let setUsersInfo = function(databaseIndex,userUpdated = user) {
    let users = JSON.parse(localStorage.getItem('users'));
    users[databaseIndex] = userUpdated;
    localStorage.setItem('users',JSON.stringify(users));
}

let setMovieInfo = function() {

}

// Add event listener to input

cartAmount.addEventListener('input',function() {
    let newValue = parseInt(this.value);
    let movieValueStock = getStockNumberMax();
    let diffrence = getStockNumberMax() - getCurrentAmountStockProfile();

    if(newValue > diffrence){
        newValue = diffrence;
    }


    if(newValue.length > movieValueStock.length || newValue <= 0) {
        this.value = previusValue;
        return;
    } else {
        this.value = newValue;
        previusValue = newValue;
    }


});


renderButtons()
renderMovieDetails()
if(user.type == 'user') {
    checkMovieStock();
}else{
    movieStock.value = movie.stock;
}