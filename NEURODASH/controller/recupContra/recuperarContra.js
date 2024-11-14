import {
    toastLiveExample, 
    bodytoadt, 
    toastBootstrap, 
    alerttoast 
}
from '../../assets/js/global/tostadas.js';
import DataExtraction from '../../assets/js/global/peticiones.js';
import ValidationDash from '../../assets/js/global/validations.js';


let vali_1 = false;


let email_user = document.querySelector('#txtUserEmailA');
let btn_confirmas = document.querySelector('#btnConfirmar');

let formCorreo = document.querySelector('.correoContra');

let getData = new DataExtraction();
let validaciones = new ValidationDash(); 

// --------------------------------------------------- validacion de correo valido y no en uso --------------------------------------
email_user.addEventListener('input', async ()=>{
    const data = {
        email_user: email_user.value
    }
    let dataEmail = await getData.dataCaptura('../../processes/user/emailExist.php', data);
    
    if(dataEmail.status == 'ok'){
        alerttoast('El correo se encuentra registrado');
        btn_confirmas.classList.remove('disabled-input');
        validaciones.correct(email_user);
        camVal1(true)
    }else{
        alerttoast('Correo no registrado');
        btn_confirmas.classList.add('disabled-input');
        validaciones.incorrect(email_user);
        camVal1(false)
    
    }
})




formCorreo.addEventListener('submit', (event)=>{
    if(!vali_1){
        event.preventDefault();
        alerttoast('Accion no valida');
    }
})


function camVal1(info){
    return vali_1 = info;
 }
 
 function camVal2(info){
    return vali_2 = info;
 }
 