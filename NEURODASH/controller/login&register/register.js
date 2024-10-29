import {
    toastLiveExample, 
    bodytoadt, 
    toastBootstrap, 
    alerttoast 
}
from '../../assets/js/global/tostadas.js';

let contra_1 = document.querySelector('.contra-1');
let contra_2 = document.querySelector('.contra-2');

let paseUno = false;
let paseDos = false;
let contraSegura = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

contra_1.addEventListener('input', ()=>{
    // alerttoast('holaa')

    let contraV1 = validarCampo({
        expre: contraSegura,
        input: contra_1
    });
    
    if(contraV1){
        contra_2.removeAttribute('disabled');
        contra_2.classList.remove('disabled-input');
    }else{
        contra_2.setAttribute("disabled", "disabled");
        contra_2.classList.add('disabled-input');
    }

    cambioUno(contraV1)
})


contra_2.addEventListener('input', ()=>{
    let respuesta = false;
    if(contra_1.value == contra_2.value){
        contra_2.classList.add('yes-valid')
        contra_2.classList.remove('no-valid')
        respuesta = true;
    }else{
        contra_2.classList.remove('yes-valid')
        contra_2.classList.add('no-valid')
        respuesta = false;
    }

    cambioDos(respuesta);

}
)

document.querySelector('.registrar-login').addEventListener('click', (event)=>{
    event.preventDefault();
    if(paseUno && paseDos){
        // fetch('')
        
        // alerttoast('Las contraseñas coinciden');
    
    }else{
        alerttoast('verifica que ambas contraseñas sean válidas y coincidan');
    }
})


function validarCampo(info = {}){
    let respuesta;
    if(info.expre.test(info.input.value)){
        info.input.classList.add('yes-valid')
        info.input.classList.remove('no-valid')
       
        respuesta = true;
    }else{
        info.input.classList.remove('yes-valid')
        info.input.classList.add('no-valid')
        respuesta = false;
    }

    return respuesta;
}


function cambioUno(uno){
    paseUno = uno;
}

function cambioDos(dos){
    paseDos = dos;

}

// function contraVl(){



//     return pase;


// }