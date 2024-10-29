// import registraUsuario from '../login&register/register.js';

const btnValidar = document.querySelector('.verify-token');
// obtencion de token
let codigoSys = await codigo();
console.log(codigoSys);

// token_user

btnValidar.addEventListener('click', (event)=>{
    if(validarToken()){
        // window.location = '../forms/validationToken.html';
    }else{
        event.preventDefault();
    }
})

function validarToken(){
    // captura de valores
    let cd_1 = document.querySelector('.dgto-1').value;
    let cd_2 = document.querySelector('.dgto-2').value;
    let cd_3 = document.querySelector('.dgto-3').value;
    let cd_4 = document.querySelector('.dgto-4').value;


    let codigo_completo = parseFloat([cd_1, cd_2, cd_3, cd_4].join(""));

    let pase = codigo_completo === codigoSys.token_user ? true : false;

    return pase;

}

async function codigo(){

    try {
        let response = await fetch('../../model/emial/tokenRegister.php');

        let data_codigo = await response.json();

        return data_codigo;
    } catch (error) {
        console.log(error);
    }
   
}

// arreglo del f
const digitInputs = document.querySelectorAll('.digit');

digitInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        // Si el campo actual tiene un valor, y no es el último input, avanza al siguiente
        if (e.target.value && index < digitInputs.length - 1) {
            digitInputs[index + 1].focus();
        }
    });

    // Permitir retroceso con la tecla "Backspace"
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            digitInputs[index - 1].focus();
        }
    });
});


