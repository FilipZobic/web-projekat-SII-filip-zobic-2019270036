const btn = document.getElementById('btn-startMenu')


const name = document.getElementById('name')
const surname = document.getElementById('surname')

const allInputs = document.querySelectorAll('input')

var form = document.getElementById("user-startMenu");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

let willAddProducer = true

var createProducerObject = function(name,surname){

    this.name = name;
    this.surname = surname;
    this.movies = [];
}

var producerExists = function() {
    if(localStorage.getItem('producers')==null) {
        let producers = JSON.stringify([])
        localStorage.setItem('producers',producers)
    }
    
}

name.addEventListener('input', function () {
    producerExists()
    let LocalStorageArray = JSON.parse(localStorage.getItem('producers'))

    let newProducer = this.value
    let warning = document.querySelector('.user-startMenu-warning')
    for (let i = 0; i < LocalStorageArray.length; i++) {
        if (LocalStorageArray[i].name == newProducer) {
            willAddProducer = false;
            warning.style.display = 'block';
            break
        }else{
            warning.style.display = 'none'
            willAddProducer = true
         }
        
    }
});

btn.addEventListener('click', ()=>{

    producerExists()
    

    allInputs.forEach(element => {
        if(element.value.length == 0){
            willAddProducer = false
            return
        }
    });
    
    if(willAddProducer) {

        var newProducer = new createProducerObject(name.value,surname.value)
        let parsedProducersArray = JSON.parse(localStorage.getItem('producers'));
        parsedProducersArray.push(newProducer)
        let serializedProducersArray = JSON.stringify(parsedProducersArray)
        localStorage.setItem('producers',`${serializedProducersArray}`)



        allInputs.forEach(inputField => {
            inputField.value = ''
        });
        alert("Added producer")
    }

    

})

document.querySelector('#btn-back').addEventListener('click', ()=>{
    window.location.href = "./MainPage.html";
})