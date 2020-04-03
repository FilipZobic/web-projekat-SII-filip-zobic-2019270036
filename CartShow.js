let user = JSON.parse(localStorage.getItem('logedInUser'));

var itemCreateBasic = function(elementClass,elementText,parentElement) {

    let P = document.createElement('p');
    P.textContent = elementText;

    let TD = document.createElement('td');
    TD.setAttribute('class',elementClass);
    TD.appendChild(P);

    parentElement.appendChild(TD)
}

var itemCreateInput = function(parentElement,copies) {
    let TD = document.createElement('td');
    let input = document.createElement('input');
    input.value = copies;
    input.addEventListener('input',function() {


        let parent = this.parentElement.parentElement;

        let newValue = this.value;

        newValue = parseInt(newValue);

        let max = getStockNumberMax(input);
    
        if(newValue > max){
            newValue = max;
        }
    
    
        if(newValue <= 0 || isNaN(newValue) || newValue == null) {
            this.value = '';
        } else {
            this.value = newValue;
        }
    
    
    });
    TD.appendChild(input);
    parentElement.appendChild(TD);
}

//


var setSumDOM = function(element){
    let input = element.parentElement.querySelector('input')

    let value = input.value;
    let price = element.parentElement.querySelector('price p').innerHTML;

    let multiplication = value * price;

    //setsum ide tek kad renderujemo doc
}

var itemCreateUpdate = function (parentElement) {

    let span = document.createElement('span');
    span.textContent = 'update';

    span.addEventListener('click',function(){

        let parentElement = this.parentElement.parentElement.parentElement;
        let input = parentElement.querySelector('input')
        let value = input.value;
        let cartID = parentElement.getAttribute('id')

        if(value.length == 0){
            return
        }

        user.cart[cartID][1] = value;
        setDatabase()
        setTotalPriceDom()

        
    })

    let P = document.createElement('p');
    P.appendChild(span);
    P.setAttribute('class','update');

    let TD = document.createElement('td');
    TD.appendChild(P);

    parentElement.appendChild(TD)
}

// Database manipulation

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

let setDatabase = function() {
    setUserLoginInfo();
    let databaseIndex = parseInt(getLogedInUserDatabaseIndex());
    setUsersInfo(databaseIndex);
}

// Delet Button

var o = 0

var itemDelete = function(item) {

    let TR = this.parentElement.parentElement.parentElement;

    

    


    if(TR == null || undefined || NaN) {
        return
    }

    let cartPosition = parseInt(TR.getAttribute("id"));

    user.cart.splice(cartPosition,1);

    setDatabase();

    itemsCreate();

    setTotalPriceDom();
    
}

var itemCreateDelete = function (parentElement) {

    let span = document.createElement('span');
    span.textContent = 'remove';

    span.addEventListener('click',itemDelete);

    let P = document.createElement('p');
    P.setAttribute('class','delete');
    P.appendChild(span);

    let TD = document.createElement('td');
    TD.appendChild(P);

    parentElement.appendChild(TD)
}

var itemCreateImg = function (parentElement,cover) {
    
    let img = document.createElement('img');
    img.setAttribute('src',`./Pictures/${cover}`)

    let TD = document.createElement('td');
    TD.setAttribute('class','coverImg');

    TD.appendChild(img);
    TD.appendChild(img);

    parentElement.appendChild(TD);
}

var itemsCreate = function() {

    let cart = user.cart;

    let allTR = document.querySelectorAll('tr');

    for (let i = 1; i < allTR.length; i++) {
        allTR[i].parentElement.removeChild(allTR[i])
    }

    for (let i = 0; i < cart.length; i++) {


        let TR = document.createElement("tr");
        TR.setAttribute('id',`${i}`)

        let movieParams = cart[i][0];
        let copiesInCart = cart[i][1];
        let moviePrice = parseFloat(cart[i][0].price);

        itemCreateBasic("name",movieParams.name,TR);
        itemCreateBasic("producer",movieParams.producer,TR);
        itemCreateBasic("genre",movieParams.genre,TR);
        itemCreateBasic("date",movieParams.releaseDate,TR);
        itemCreateBasic("price",movieParams.price+"$",TR);
        itemCreateInput(TR,copiesInCart);
        itemCreateBasic("max",movieParams.stock,TR);
        let sum = copiesInCart*moviePrice+"$";
        itemCreateBasic("sum",sum,TR);
        itemCreateUpdate(TR);
        itemCreateDelete(TR);
        itemCreateImg(TR,movieParams.cover);


        document.querySelector('tbody').appendChild(TR);
    }

}

var getInputValue = function(){
    return cartAmount.value;
}

var setInputValueToEmpty = function(){
    cartAmount.value = '';
}


var getStockNumberMax = function(element) {
    let id = element.parentElement.parentElement.getAttribute('id');
    let maxStock = parseInt(user.cart[id][0].stock);
    return maxStock;
}

var getCurrentAmountStockProfile = function(element) {
    let id = element.parentElement.parentElement.getAttribute('id');
    let stockAmount = parseInt(user.cart[id][1]);
    return stockAmount;
}



document.querySelector('#updateAll').addEventListener('click',function(){

    let allInputs = document.querySelectorAll('input');

    if(allInputs.length == 0) {
        return;
    }



    for (let i = 0; i < allInputs.length; i++) {
        if(allInputs[i].value.length==0){
            alert("Not everything is good")
            return
        }
    }
    let positionInCart;
    for (let i = 0; i < user.cart.length; i++) {
        positionInCart = allInputs[i].parentElement.parentElement.getAttribute('id');
        
        user.cart[positionInCart][1] = allInputs[i].value;
        
    }
    
    setDatabase();
    setTotalPriceDom();

})

var getTotalPrice = function(){

    let price = 0;

    for (let i = 0; i < user.cart.length; i++) {
        price += user.cart[i][0].price * user.cart[i][1];
    }

    if(isNaN(price)){
        return 0;
    }

    return price;
}

var setTotalPriceDom = function() {
    let display = document.querySelector('#totalPrice span')
    display.innerHTML = getTotalPrice() + "$";
}

document.querySelector('#checkOut').addEventListener('click',function(){
    


    let price = 0;
    price = getTotalPrice();
    let check = document.querySelectorAll('input');

    if(check.length == 0) {
        return;
    }
    
    let bill = user.cart.splice(0);
    let billNu = JSON.parse(localStorage.getItem('billNumber'));
    
    bill.unshift([billNu,price])
    billNu++;

    user.bills.push(bill)

    let allMovies = JSON.parse(localStorage.getItem('movies'));

    for (let i = 1; i < bill.length; i++) {
        for (let j = 0; j < allMovies.length; j++) {
            if(bill[i][0].id==allMovies[j].id){
                allMovies[j].stock -= bill[i][1];
                break;
            }
            
        }
        
    }

    localStorage.setItem('movies',JSON.stringify(allMovies));


    localStorage.setItem('billNumber',JSON.stringify(billNu));
    setDatabase();
    itemsCreate();
    setTotalPriceDom()
})

var plugUsersName = function(name,isAdmin) {

    var plugUserLocation = document.getElementById('showWhoIsOnline')
    plugUserLocation.innerHTML = name
    if(isAdmin) {
        plugUserLocation.style.color = 'red';
    }

    document.querySelector('#userInfo > span > p').addEventListener('click', ()=>{
        window.localStorage.removeItem('logedInUser');
        window.location.href = "userLogin.html";
    })
}

itemsCreate();
setTotalPriceDom();
plugUsersName(user.username,false);
