import DataExtraction from '../../assets/js/global/peticiones.js';

let refresh_lis_sala;
let btn_calcel = document.querySelector('.btn-confirm');
let btn_verific_token = document.querySelector('.verify-token');


// funcion global => alto alcance
window.entrarSala = function(id_sala, token_origin){
    buscador.classList.add('ocultarSala');
    formSalas.classList.remove('ocultarSala'); 
    brdContainer.classList.add('ocultarSala');
    imgSal.classList.add('imgSalTop');
    formSalas.classList.add('imgSalTop');

    let info_validation_sala = {
        id_sala,
        token_origin
    }

    // informacion temporal => no es la mejor solucion pero es por ahora
    localStorage.setItem('sala_temp', JSON.stringify(info_validation_sala));

    // detener el consumo de recursos => tecnica pulling
    clearInterval(refresh_lis_sala);
}

// objeto de peticciones http
let sys_data = new DataExtraction();

// ----------------------------- funcion de listar las salas --------------------------------------
async function ListarSalas(Domview){
    let data_salas = await sys_data.receptorData('../../processes/juego/salas/allSalas.php');

    let html_sala = "";

    data_salas.forEach(sala => {
        let estadoSala = sala.sla_estado == 1 ? 'Activa' : 'En juego';

        html_sala += `
                        <div class="col-12 d-flex justify-content-center align-items-center mt-3">
                            <div class="weather-card">
                                <div class="top-section">
                                    <div class="position-relative">
                                        <img src="../../assets/img/avatars/avatar1.jpg" alt="Rainbow Icon" class="icon">
                                    </div>
                                    <div class="weather-info">
                                        <h3>ID: ${sala.id_sala}</h3>
                                        <h2>${sala.user_name}</h2>
                                        <h5>${estadoSala}</h5>
                                    </div>
                                </div>
                            
                                <div class="separator"></div>
                            
                                <div class="bottom-section">
                                    <div class="weather-details">
                                        <div class="detail-item">
                                            <i class="fas fa-wind"></i> Modo de juego: ${sala.mdo_nombre}
                                        </div>
                                        <div class="separator"></div>
                                            <div class="detail-item">
                                            <i class="fas fa-leaf"></i> Nivel de dificultad: ${sala.nvel_nombre}
                                        </div>
                                        <div class="separator"></div>
                                        <div class="detail-item">
                                            <i class="fas fa-tint"></i> Cantidad de jugadores: ${sala.jugadores}/${sala.cfg_cantidadjugadores}
                                        </div>
                                    </div>
                                    <div class="frog-section">
                                        <button class="frog-icon btnUnirse" onclick="entrarSala(${sala.id_sala}, ${sala.sla_token});">Unirse</button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    });

    Domview.innerHTML = html_sala; 
}

//  ____________________________________ selector de las salas disponibles en el dom ____________________________________
let viewsSalas = document.querySelector('.list-sala-diponibles');

// listar las salas en un inicio
ListarSalas(viewsSalas);

// listadore de salas en linea => fake
function refresh_sala(){
    refresh_lis_sala = setInterval(()=>{
        ListarSalas(viewsSalas);
    }, 2000)
};

// evento de cacelacion de proceso validar token de sala
btn_calcel.addEventListener('click', ()=>{
    document.querySelectorAll('.digit').forEach(Element => {
        Element.value = "";
    })
    localStorage.clear();
    refresh_sala();
})

btn_verific_token.addEventListener('click',(event)=>{
    let info_sala_temp = JSON.parse(localStorage.getItem('sala_temp'));
    let pase_validation = validarToken(info_sala_temp.token_origin);

    if(!pase_validation){
        event.preventDefault();
    }
    console.log(pase_validation);
})


// utilidad de refresh_sala => fake
refresh_sala();


// ========================================================================= stard funcionalidades de unirse a la sala front end =========================================================================
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

// // Evento para cancelar la alerta y seguir con el formulario
cancelAlert.addEventListener('click', function () {
    hideAlert(); 
});

// // Asignar evento a cada botón de "Unirse"
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



// arreglo del funcionalidad frontend del codigo de verificacion 
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


// ========================================================================= end funcionalidades de unirse a la sala front end =========================================================================


// funcion de validacion  => observacion : se puede modular 
function validarToken(token_origin){
    // captura de valores
    let cd_1 = document.querySelector('.dgto-1').value;
    let cd_2 = document.querySelector('.dgto-2').value;
    let cd_3 = document.querySelector('.dgto-3').value;
    let cd_4 = document.querySelector('.dgto-4').value;


    let codigo_completo = parseFloat([cd_1, cd_2, cd_3, cd_4].join(""));

    let pase = codigo_completo === token_origin ? true : false;

    return pase;

}