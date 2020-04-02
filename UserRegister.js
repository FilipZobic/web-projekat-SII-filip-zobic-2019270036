const btn = document.getElementById('btn-startMenu')


const name = document.getElementById('name')
const surname = document.getElementById('surname')

const username = document.getElementById('username')
const password = document.getElementById('password')

const allInputs = document.querySelectorAll('input')

var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

let willAddUser = true

var createUserObject = function(name,surname,username,password,type){

    this.name = name;
    this.surname = surname;
    this.username = username;
    this.password = password;
    this.type = type;
    if(this.type=='user'){
        this.cart = []
        this.bills = [];
    }
}

var userExist = function() {
    if(localStorage.getItem('users')==null) {
        let users = JSON.stringify([])
        localStorage.setItem('users',users)
    }
    
}

username.addEventListener('input', function () {
    userExist()
    let LocalStorageArray = JSON.parse(localStorage.getItem('users'))

    let newUser = this.value
    let warning = document.querySelector('.user-startMenu-warning')
    for (let i = 0; i < LocalStorageArray.length; i++) {
        if (LocalStorageArray[i].username == newUser) {
            willAddUser = false;
            warning.style.display = 'block';
            break
        }else{
            warning.style.display = 'none'
            willAddUser = true
         }
        
    }
});

btn.addEventListener('click', ()=>{

    userExist()
    

    allInputs.forEach(element => {
        if(element.value.length == 0){
            willAddUser = false
            return
        }
    });
    
    if(willAddUser) {
        let type = 'user'
        if(name.value=='Filip'){
            type = 'admin'
        }
        var newUser = new createUserObject(name.value,surname.value,username.value,password.value,type)
        let parsedUsersArray = JSON.parse(localStorage.getItem('users'));
        parsedUsersArray.push(newUser)
        let serializedUsersArray = JSON.stringify(parsedUsersArray)
        localStorage.setItem('users',`${serializedUsersArray}`)



        allInputs.forEach(inputField => {
            inputField.value = ''
        });
        alert("Registration Completed")
        window.location.href = "UserLogin.html";
    }

    

})