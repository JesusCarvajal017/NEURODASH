import {
            toastLiveExample, 
            bodytoadt, 
            toastBootstrap, 
            alerttoast 
        }
from '../../assets/js/global/tostadas.js';
import DataExtraction from '../../assets/js/global/peticiones.js';
import ValidationDash from '../../assets/js/global/validations.js';
import Loader from '../../assets/js/animation/classLoder.js';

let domLoader = document.querySelector('.loader-default');


let validaciones = new ValidationDash(); 
let loader_login = new Loader(domLoader);

// variables gloables
let vali_1 = false;
let vali_2 = false;


// seleccion del DOM
let user_email_acces = document.getElementById('txtUserEmailA');
let user_password_acces = document.getElementById('txtUserpasswordA');

// formulario de acceso
const form_acceso = document.querySelector('.sign-in-form');
const form_register = document.querySelector('.sign-up-form');

// acciones de acceseso
form_acceso.addEventListener('submit', (event)=>{
    event.preventDefault();

    if(user_email_acces.value && user_password_acces.value){
        const data_acceso_send = {
            user_email: user_email_acces.value,
            user_password: user_password_acces.value
        }
    
        fetch('../../processes/login/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_acceso_send)
        })
        .then(respose => respose.json())
        .then(data_acceso =>{
            if(data_acceso.status == 'ok'){
                window.location = '../../views/home.html'
            }else{
                alerttoast('No hay usuario registrado');
            }
        })
        .catch(err => {
            console.log(err);
        })
        

    }else{
        alerttoast('Usuario y contraseña no validos');
    }

})

// ----------------------------------------------- acciones de registrar ------------------------------------------------------------
let name_user = document.querySelector('#txtUsernameB'); 
let email_user = document.querySelector('#txtEmailB'); 

let getData = new DataExtraction();

// --------------------------------------------------- validacion de correo valido y no en uso --------------------------------------
email_user.addEventListener('input', async ()=>{
    const data = {
        email_user: email_user.value
    }
    let dataEmail = await getData.dataCaptura('../../processes/user/emailExist.php', data);
    
    if(dataEmail.status == 'ok'){
        alerttoast('El correo ya esta en uso, inicie session');
        validaciones.incorrect(email_user);
        camVal1(false)
    }else{
        validaciones.correct(email_user);
        camVal1(true)
    }

    if(validaciones.validationEmail(data.email_user) && dataEmail.status == 'no'){
        name_user.removeAttribute('disabled');
        name_user.classList.remove('disabled-input');
    }else{
        name_user.setAttribute("disabled", "disabled");
        name_user.classList.add('disabled-input');
    }
})

// --------------------------------------------------- validacion de nombre valido y no en uso -----------------------------------------
name_user.addEventListener('input', async ()=>{
    const data = {
        name_user: name_user.value
    }

    let dataName = await getData.dataCaptura('../../processes/user/nameExist.php', data);
   
    if(dataName.status == 'ok'){
        validaciones.incorrect(name_user);
        alerttoast('El nombre ya esta en uso');
        camVal2(false)
    }else{
        validaciones.correct(name_user);
        camVal2(true)
    }
})

// --------------------------------------- verificacion final de pre registro ---------------------------------------
form_register.addEventListener('submit', (event)=>{
    if(vali_1 && vali_2){
        // event.preventDefault();
        //loader_login.show(); // abandono de pagina
        // alert('datos correctos');
    }else{
        alert('datos son icorrectos');
        event.preventDefault();
    }
})

function camVal1(info){
   return vali_1 = info;
}

function camVal2(info){
   return vali_2 = info;
}
