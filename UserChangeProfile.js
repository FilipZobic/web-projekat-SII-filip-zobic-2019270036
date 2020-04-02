var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

const user = JSON.parse(localStorage.getItem('logedInUser'));

let heading = document.querySelector('#user-startMenu-heading');

let createProfileBanner = function() {
    var p = document.createElement('p')
    p.textContent = 'Your' + ' profile.';
    p.style.fontSize = '34px';
    p.style.marginBottom = '28px';
    heading.appendChild(p);
}

const name = document.getElementById('name')
const surname = document.getElementById('surname')

const username = document.getElementById('username')
const password = document.getElementById('password')

const allInputs = document.querySelectorAll('input')

const renderAllFields = function() {
    name.value = user.name;
    surname.value = user.surname;
    username.value = user.username;
    password.value = user.password;
}



// User state management.

let setUserLoginInfo = function() {
    localStorage.setItem('logedInUser',JSON.stringify(user));
}

let getLogedInUserDatabaseIndex = function(usersUserId = user.username) {
    let users = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == usersUserId) {
            console.log(users[i])
            console.log(usersUserId)
            return i;
        }
        
    }
}

let setUsersInfo = function(databaseIndex,userUpdated = user) {
    let users = JSON.parse(localStorage.getItem('users'));
    console.log(databaseIndex)
    users[databaseIndex] = userUpdated;
    localStorage.setItem('users',JSON.stringify(users));
}

//

let warning = document.querySelector('.user-startMenu-warning')
let willUpdateState = true;


for (let i = 0; i < allInputs.length; i++) {
    document.querySelectorAll('input')[i].addEventListener('input',function(){
        willUpdateState = true;
        warning.style.display = 'none';
        for (let j = 0; j < allInputs.length; j++) {
            if(allInputs[j].value.length == 0){
                warning.style.display = 'block';
                break;
            }else {
                warning.style.display = 'none';
                willUpdateState = true;
            }
        }
    })
}



document.getElementById('save').addEventListener('click',function(){
    if(willUpdateState) {

        user.name = name.value;
        user.surname = surname.value;
        user.password = password.value;

        setUserLoginInfo();

        let index = getLogedInUserDatabaseIndex(user.username);

        setUsersInfo(index);
        window.location.href = 'UserShowProfile.html';
    }else{
        return
    }
})
document.getElementById('back').addEventListener('click',function(){
    window.location.href = 'UserShowProfile.html'
})


createProfileBanner()
renderAllFields()