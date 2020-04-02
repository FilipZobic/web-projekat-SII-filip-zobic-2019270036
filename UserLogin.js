if(localStorage.getItem('users')==null) {
    window.location.href = 'UserRegister.html'
}

const btn = document.getElementById('btn-startMenu')

const username = document.getElementById('username')
const password = document.getElementById('password')

const allInputs = document.querySelectorAll('input')

let warningUsername = document.querySelector('.user-startMenu-warning-username')
let warningPassword = document.querySelector('.user-startMenu-warning-password')

var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

username.addEventListener('input', function () {
    warningUsername.style.display = 'none';
})

password.addEventListener('input', function () {
    warningPassword.style.display = 'none';
})

btn.addEventListener('click', ()=>{


    warningUsername.style.display = 'none';
    warningPassword.style.display = 'none';
    let LocalStorage = window.localStorage

    let user = username.value
    let userExists = false
    let correctPassword = false

    let parsedUser = {}

    let parsedUsersArray = JSON.parse(localStorage.getItem('users'));

    for (let i = 0; i < parsedUsersArray.length; i++) {
        if(parsedUsersArray[i].username==user) {
            userExists = true;
            parsedUser = parsedUsersArray[i];
            break;
        }else{
            userExists = false
        }
        
    }

    if(userExists) {
        if(parsedUser.password==password.value){
            let serializedUserObject = JSON.stringify(parsedUser) 
            window.localStorage.setItem('logedInUser',serializedUserObject)
            alert("Welcome")
            window.location.href = "MainPage.html";
        }else{
            warningPassword.style.display = 'block'
        }
        
    }else{
        warningUsername.style.display = 'block'
    }

})

//warning.style.display = 'block'
