import DataExtraction  from '../../assets/js/global/peticiones.js';
import Loader from '../../assets/js/animation/classLoder.js';
import {
    toastLiveExample, 
    bodytoadt, 
    toastBootstrap, 
    alerttoast 
}
from '../../assets/js/global/tostadas.js';

// ============================ controladores iniciales ===============================



// ================  OBJETOS GLOBALES (UTILIDAD) ================
let data_sys = new DataExtraction();

// ================  OBJETOS GLOBALES (INFORMACION) ================
let data_modoJuego = await data_sys.receptorData('../../model/entrenamiento/modoJuego.php');
let data_nivel = await data_sys.receptorData('../../model/entrenamiento/niveles.php');
let data_tematica = await data_sys.receptorData('../../model/entrenamiento/tematica.php');


// informacion del usuario
let data_user = await data_sys.receptorData('../../processes/user/allinfo.php');


// informacion de juego
let icons_nivel = {
    "facil" : '../../assets/img/iconos/facil.png',
    "medio" : '../../assets/img/iconos/medio.png',
    "dificil" : '../../assets/img/iconos/dificil.png',
}

// ================ VARIABLES GLOBALES ================
const list_modoJuego = document.querySelector('.radio-groupS'); 
let loader_suppor = document.querySelector(".loader-support");

let modal_status = document.getElementById('modalMiembroSala'); 
let menssage_status = document.querySelector('.message-modal');
let modal_controll = new bootstrap.Modal(modal_status);

let bnt_seguir_sala = document.querySelector('#btnSeguirSla')
let bnt_abandonar_sala = document.querySelector('#btnSalirSla')


let lodaer_create = new Loader(loader_suppor);

// ******** contenedores de crear sala  ******** 
const container_modos = document.querySelector('.modo-juegos');
const container_niveles = document.querySelector('.containt-nivles');
const container_tematicas = document.querySelector('.container-tematica');

//  ================ EJECUTADOR DEL DOM, MOSTRAR SEGUN LA BASE DE DATOS ================
function list_modoJuegos(){
    const iconos = {
        "terminos" : 'fa-solid fa-a',
        "numeros" : 'fas fa-hashtag',
        "imagenes" : 'fas fa-image',
    }

    let html = "";
    data_modoJuego.forEach(modo => {
        let id_modo = modo.mdo_juegoId;
        let name_modo  = modo.mdo_nombre;
        let name_minus = name_modo.toLowerCase();
        let icon_modo = iconos[name_modo.toLowerCase()];
        

        html += `<input  type="radio" id="${name_minus}" name="options" value="${id_modo}">
                <label for="${name_minus}"><i class="${icon_modo}"></i>${name_modo}</label>`;
    });

    container_modos.innerHTML = html;
}

function list_nivles(){
    let html = "";
    data_nivel.forEach(nivel => {
        let id_nivel = nivel.nvel_id
        let name_nivel  = nivel.nvel_nombre;

        let name_minus = name_nivel.toLowerCase();
        let icon_nivel = icons_nivel[name_minus];

        html += `<input type="radio" id="${name_minus}" name="dificultad" value="${id_nivel}">
                <label for="${name_minus}" class="cardfipe2">
                    <img src="${icon_nivel}" alt="${name_nivel}" class="imgfipe">
                    <span class="fontSalas5">${name_nivel}</span>
                </label>`;
    });

    container_niveles.innerHTML = html;
}

function list_tematica(){
    let html = "";
    data_tematica.forEach(tematica => {
        let id_temati = tematica.id_item
        let name_temati  = tematica.nombre_item;

        // let condition = name_temati == 'Cuerpo Humano' ? unionText(name_temati) : name_temati;
        // console.log(condition)

        let name_minus = name_temati.toLowerCase();
    
    html += `<input type="radio" id="${name_minus}" name="tematica" value="${id_temati}">
            <label for="${name_minus}" class="cardfipe">
                <img src="../../assets/img/iconos/icon-terminos/${name_minus}.png" alt="${name_minus}" class="imgfipe">
                <span class="fontSalas5">${name_temati}</span>
            </label>`;
    });

    container_tematicas.innerHTML = html;
}

async function statusSalaUser(){
    let data_satus = await data_sys.receptorData('../../model/sessiones_sys/globalSala.php');
    if(data_satus.status){
        let mensaje = data_satus.rool == 1 ? "Eres afitrion de una sala" : "Estas dentro de una sala de espera";
        let direccion_seguir = data_satus.rool == 1 ? 'crearsala2.html' : '../juego/salaEspera.html';
        let direccion_aban = "../home.html";

        bnt_seguir_sala.addEventListener('click', ()=>{
            window.location = direccion_seguir;
        })
        
        menssage_status.textContent = mensaje;
        modal_controll.show();
    }
}

statusSalaUser();


// ================================ EJECUCION EN EL DOM ================================
list_modoJuegos();
list_nivles();
list_tematica(); 
// ===================================================================================================================================================================

// ===================== Varibles globales =====================
const form_crear_sala = document.querySelector('.form-crearsala');
const bnt_crar_sala  = document.querySelector('.create-room-btn'); 
const inputs_modo = document.querySelectorAll('.card-group2 input[type="radio"]');
const option_tematica = document.querySelectorAll('.tematicas-options input[type="radio"]')

const radioButtons = document.querySelectorAll('input[name="options"]');
const thematicSection = document.getElementById("ocul");

let sala_creation = {
    "id_user": data_user[0].user_id,
    "modoJuego": null,
    "nivelJuego": null,
    "jugadores": 6,
    "tematica": null,
};


// ================== bandera de validacion de formulario ===========================
let pase1 = false; // modo juego
let pase2 = false; // dificultad
let pase3 = null; // !tematica

//  =============================== funcionalidades  ===============================
function dataUserSys(){
    let img_user = document.querySelector('.ImgGran');
    img_user.src = '../../' + data_user[0].img_avatar;
}

function validacion_1(value, boolean){
    sala_creation.modoJuego = parseFloat(value);
    pase1 = boolean;
}

function validacion_2(value, boolean){
    pase2 = boolean;
    sala_creation.nivelJuego = parseFloat(value);
}

function validacion_3(value, boolean){
    sala_creation.tematica = parseFloat(value);
    pase3 = boolean;
}

// se tiene que mejorar esta vaina, esta re contra rancio  => se encarga de habilitar el boton de crear salas
function showCreateroom(){
    if(pase3 === null){
        if(pase1 && pase2){
            bnt_crar_sala.classList.remove('disabled-input');
            bnt_crar_sala.disabled = false;
        }else{
            bnt_crar_sala.classList.add('disabled-input');
             bnt_crar_sala.disabled = true;
        }
    }else{
        if(pase1 && pase2 && pase3){
            bnt_crar_sala.classList.remove('disabled-input');
             bnt_crar_sala.disabled = false;
        }else{
            bnt_crar_sala.classList.add('disabled-input');
             bnt_crar_sala.disabled = true;
        }
    }
}

function unionText(text){
    let resul = text.split("").join("-").toLowerCase();
    return resul;
}

// ================= ejecucion de reset =======================
dataUserSys();
localStorage.clear();

form_crear_sala.addEventListener('submit', async (event)=>{
    event.preventDefault();
    let numeroJugadores = document.querySelector('#playerCount');
    sala_creation.jugadores = parseFloat(numeroJugadores.value);

    // crecion de la sala
    await data_sys.dataCaptura('../../processes/juego/salas/createSala.php', sala_creation);

    lodaer_create.show();
    setTimeout(()=>{
        // form_crear_sala.submit();
        window.location = 'crearsala2.html';
    }, 5000)
})


//  ====================== MODO DE JUEGO ====================== 
// Escucha los cambios en los radios
radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        resetOption();
        // Oculta o muestra la sección según si se seleccionó 'terms'
        if(radio.id === 'numeros'){
            validacion_3(null,null);
            thematicSection.style.display = 'none';
        }else{            
            validacion_3(null,undefined);
            thematicSection.style.display = 'flex';
        }

        validacion_1(radio.value,true); 
        
        showCreateroom(); 
    });
});

//  ====================== MODO DE JUEGO ====================== 
// Agregamos un evento "click" a cada radio button
inputs_modo.forEach((radio) => {
  radio.addEventListener('click', () => {
    validacion_2(radio.value, true); // cambio de valor de validacion
    showCreateroom();
  });
});

//  ====================== TEMATICA ====================== 

// Agregamos un evento "click" a cada radio button
option_tematica.forEach((radio) => {
radio.checked = false; 
  radio.addEventListener('click', () => {
    validacion_3(radio.value,true);
    showCreateroom();
  });
});

function resetOption(){
    option_tematica.forEach((radio) => {
        radio.checked = false; 
    })
}

function activadorCrearSala(){
    let bnt_crar_sala  = document.querySelector('.create-room-btn'); 

    bnt_crar_sala.classList.remove('disabled-input');
}