const list_sala = document.querySelector('.list-sala-diponibles');



const formSalas = document.querySelector("#formSalaDis");
const closeForm = document.getElementById('closeForm');
const alertBox = document.getElementById('custom-alert');
const confirmCancel = document.getElementById('confirmCancel');
const cancelAlert = document.getElementById('cancelAlert');
const brdContainer = document.querySelector('.brd'); 
const buscador = document.getElementById('cover');
const imgSal = document.getElementById('imgSal');
const fondoActiva = document.getElementById('fondoActiva');

// Función para mostrar la alerta
function showAlert() {
    fondoActiva.style.display = 'block'; 
    alertBox.style.display = 'block'; 
    setTimeout(() => {
        alertBox.classList.add('show'); 
    }, 10); 
}

// Función para ocultar la alerta
function hideAlert() {
    alertBox.classList.remove('show'); 
    setTimeout(() => {
        alertBox.style.display = 'none'; 
        fondoActiva.style.display = 'none'; 
    }, 500); 
}

// Función para restablecer el formulario y mostrar las tarjetas
function resetFormAndCard() {
    formSalas.classList.add('ocultarSala'); 
    brdContainer.classList.remove('ocultarSala'); 
    buscador.classList.remove('ocultarSala'); 
    formSalas.classList.remove('imgSalTop');
    imgSal.classList.remove('imgSalTop');
}

export {
    showAlert,
    hideAlert,
    resetFormAndCard,
}

   
// });

