// seleccion del DOM
let user_email_acces = document.getElementById('txtUserEmailA');
let user_password_acces = document.getElementById('txtUserpasswordA');

// formulario de acceso
const form_acceso = document.querySelector('.sign-in-form');
const alertTrigger = document.getElementById('liveAlertBtn');


const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
const bodytoadt = document.querySelector('.toast-body');

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

function alerttoast(mensage){
    bodytoadt.textContent = mensage;
    toastBootstrap.show()
}

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
            console.log(data_acceso)
        })
        .catch(err => {
            console.log(err);
        })
        

    }else{
        alerttoast('Usuario y contraseña no validos');
    }

})




