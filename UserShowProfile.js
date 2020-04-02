var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

document.getElementById('modify').addEventListener('click',function(){
    window.location.href = 'UserChangeProfile.html'
})
document.getElementById('back').addEventListener('click',function(){
    window.location.href = 'MainPage.html'
})

const user = JSON.parse(localStorage.getItem('logedInUser'));

let heading = document.querySelector('#user-startMenu-heading');

let createProfileBanner = function() {
    var p = document.createElement('p')
    p.textContent = 'Your' + ' profile.';
    p.style.fontSize = '34px';
    p.style.marginBottom = '28px';
    heading.appendChild(p);
}

const name = document.getElementById('name');
const surname = document.getElementById('surname');

const username = document.getElementById('username');
const password = document.getElementById('password');

const allInputs = document.querySelectorAll('input');

const renderAllFields = function() {
    name.value = user.name;
    surname.value = user.surname;
    username.value = user.username;
    password.value = user.password;
}

createProfileBanner();
renderAllFields();