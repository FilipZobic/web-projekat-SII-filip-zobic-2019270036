const user = JSON.parse(localStorage.getItem('logedInUser'));

const bills = user.bills;

const selectBill = document.querySelector('select');

var form = document.querySelector("form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);


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

var itemCreateBasic = function(elementClass,elementText,parentElement) {

    let P = document.createElement('p');
    P.textContent = elementText;

    let TD = document.createElement('td');
    TD.setAttribute('class',elementClass);
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

var getTotalPrice = function(cart){

    let price = 0;

    for (let i = 1; i < cart.length; i++) {
        price += cart[i][0].price * cart[i][1];
    }

    if(isNaN(price)){
        return 0;
    }

    return price;
}

var setTotalPriceDom = function(cart) {
    let display = document.querySelector('#totalPrice span')
    display.innerHTML = getTotalPrice(cart) + "$";
}

var itemsCreate = function(value) {

    //bills


    let allTR = document.querySelectorAll('tr');
    let bill;
    let selected = selectBill.value;

    if(selected=='noSelect') return;

    for (let i = 0; i < bills.length; i++) {
        if(selected == bills[i][0][0]){
            bill = bills[i];
        }
        
    }

    for (let i = 1; i < allTR.length; i++) {
        allTR[i].parentElement.removeChild(allTR[i])
    }

    setTotalPriceDom(bill)

     

    for (let i = 1; i < bill.length; i++) {



        let TR = document.createElement("tr");
        TR.setAttribute('id',`${i}`)

        let movieParams = bill[i][0];
        let copiesInCart = bill[i][1];
        let moviePrice = parseFloat(bill[i][0].price);

        itemCreateBasic("name",movieParams.name,TR);
        itemCreateBasic("producer",movieParams.producer,TR);
        itemCreateBasic("genre",movieParams.genre,TR);
        itemCreateBasic("date",movieParams.releaseDate,TR);
        itemCreateBasic("price",movieParams.price+"$",TR);
        itemCreateBasic("input",copiesInCart,TR);
        let sum = copiesInCart*moviePrice+"$";
        itemCreateBasic("sum",sum,TR);
        itemCreateImg(TR,movieParams.cover);


        document.querySelector('tbody').appendChild(TR);
    

}
}

var renderBills = function() {
    for (let i = 0; i < bills.length; i++) {
        var option = document.createElement("option");
        var billID = bills[i][0][0]
        var totalPrice = bills[i][0][1]
        option.setAttribute('value',billID)
        option.textContent = billID;
        selectBill.appendChild(option);
    }
}

plugUsersName(user.username,false);

renderBills()

document.querySelector('button').addEventListener('click',itemsCreate);
    
