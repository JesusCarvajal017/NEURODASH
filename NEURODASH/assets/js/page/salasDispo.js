document.addEventListener('DOMContentLoaded', function () {
    const btnsUnirse = document.querySelectorAll('.btnUnirse');
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

    // Evento para confirmar la cancelación
    confirmCancel.addEventListener('click', function () {
        resetFormAndCard(); 
        hideAlert(); 
    });

    // Evento para cancelar la alerta y seguir con el formulario
    cancelAlert.addEventListener('click', function () {
        hideAlert(); 
    });

    // Asignar evento a cada botón de "Unirse"
    btnsUnirse.forEach(btn => {
        btn.addEventListener('click', function () {
            buscador.classList.add('ocultarSala');
            formSalas.classList.remove('ocultarSala'); 
            brdContainer.classList.add('ocultarSala');
            imgSal.classList.add('imgSalTop');
            formSalas.classList.add('imgSalTop');
        });
    });

    // Evento para cerrar el formulario y mostrar la alerta
    closeForm.addEventListener('click', function (e) {
        e.preventDefault(); 
        showAlert(); 
    });
});

