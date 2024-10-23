
function nameValidation(name){
    fetch('')
}

// selecion de datos de registro
let name_user = document.getElementById('txtUsernameR');
let name_emial = document.getElementById('txtEmailR');

const formRegistrar = document.querySelector('.sign-up-form');

name_user.addEventListener('change', ()=>{
    alert(name_user.value)
})

formRegistrar.addEventListener('submit', (event)=>{
    event.preventDefault();

    
    

})

// name_user.addEventListener('input', ()=>{
//     alert(name_user.value)
// })


