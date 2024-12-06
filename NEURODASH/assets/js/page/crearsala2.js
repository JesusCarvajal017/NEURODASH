// chat
import Loader from '../animation/classLoder.js';
import DataExtraction from '../global/peticiones.js';
import AudioControllers from '../sound/controlles.js';
import {
    toastLiveExample, 
    bodytoadt, 
    toastBootstrap, 
    alerttoast 
}
from '../global/tostadas.js';

let data_sys = new DataExtraction();
let lodaer_sys = new Loader(document.querySelector('.loader-default'));

// ============================= data temporal =============================
let data_temp_user = null;


// ==================== data del usuario =================================
let data_user = await data_sys.receptorData('../../processes/user/allinfo.php');
let salaActive = null;

let musicaJuego = new AudioControllers('../../assets/music/sala_espera.mp3');

musicaJuego.sound();
musicaJuego.loopMusisc();


// console.log(salaActive)

// ======================= Variables globales del DOM =================================
let domSalaId = document.querySelector('.id-sala');
let domNameUser = document.querySelector('.name-user');
let domNivel = document.querySelector('.nivel-info');
let domModo = document.querySelector('.modo-juego-info');
let domJugadoresMax = document.querySelector('.max-jugadores');
let domJugadorEntran = document.querySelector('.jugadores-sala');
let domEstadoSla = document.querySelector('.estado-sala');
let domToken = document.querySelector('.toke-sala');

let container_jugadores = document.querySelector('.sala-espera-juego');
let btn_comenzar_sala = document.querySelector('.iniciar-juego');
let btn_cancelar_sala = document.querySelector('.cancelar-juego ');

// Función para abrir el modal de expulsión
// function openExpulsarModal() {
//     document.getElementById("expulsarModal").style.display = "block"
// }


// ============================= cambio de valores =============================
function guardarId(value){
    data_temp_user = value;
}

async function refreshInfoSala(){
    salaActive =  await data_sys.receptorData('../../processes/user/salaActive.php');
}


btn_cancelar_sala.addEventListener('click', async ()=>{
    lodaer_sys.show();
    await data_sys.dataCaptura('../../processes/juego/salas/cancelarSala.php', { status: true });
    setTimeout(()=>{
        window.location= '../home.html';
    }, 3000)

});

btn_comenzar_sala.addEventListener('click', async ()=>{
    lodaer_sys.show();

    // alert('cambio de estado')
    setTimeout(async ()=>{
        await data_sys.dataCaptura('../../processes/juego/salas/updateEstado.php', { status: true });
        window.location= '../multijugador/rondas.html';
    }, 3000)

});


window.openExpulsarModal = function (id){
    document.getElementById("expulsarModal").style.display = "block";
    guardarId(id);
    // alert(id)
}

// let dom = document.querySelector('.');

// informacion target sala
async function infoSala(){
    await refreshInfoSala();
    salaActive.forEach(data => {
        domSalaId.textContent = data.id_sala;
        domToken.textContent = data.sla_token;
        domNameUser.textContent = data.user_name;
        domNivel.textContent = data.nvel_nombre;
        domModo.textContent = data.mdo_nombre;
        domJugadoresMax.textContent = data.cfg_cantidadjugadores;
        domJugadorEntran.textContent = data.jugadores;
        domEstadoSla.textContent = data.sla_estado == 1 ? "Activa" : "";
    });
}

async function jugadoresSala(){
    await refreshInfoSala();
    let jugadores_sala_info = salaActive[0].salaJugadores;
    let html = "";
    jugadores_sala_info.forEach(jugador =>{
        html+= ` <div class="jugador-sala">
                    <img class="icono-perfil" src="../../${jugador.img_avatar}" alt="Icono del perfil">
                    <span class="user">${jugador.user_name}</span>`;
        if(jugador.tipo_usuer == 1){
            html += `<div class="anfitrion-sala">
                        <img src="../../assets/img/iconos-desarrollo/corona.png" alt="">
                    </div>`
        }else{
            html+= `<div class="expulsar-jugador">
                        <i class="text-danger banear fa-solid fa-trash-can" onclick="openExpulsarModal(${jugador.user_id})"></i>
                    </div>`;
        }
        html += `</div>`;
    });
    container_jugadores.innerHTML = html;
}

infoSala();
jugadoresSala();

setInterval(()=>{
    infoSala();
    jugadoresSala();
}, 2000)

// console.log(jugadores_sala_info);


const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

function enviarMensaje() {
    const mensaje = chatInput.value.trim();
    if (mensaje !== "") {
        addMensaje(mensaje, 'usuario');
        chatInput.value = '';
    }
}

chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviarMensaje();
    }
});


function addMensaje(mensaje, enviando) {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add('chat-message'); 

    const avatar = enviando === 'usuario' ? '../../assets/img/iconos/perfil.png' : '../../assets/img/iconos/perfil.png';

    mensajeElemento.innerHTML = `
        <img src="../../assets/img/iconos/perfil.png" alt="Avatar" class="avatar">
                <span class="username">${enviando}</span>
        <div class="comentario">
        <span class="message-text">${mensaje}</span>
        </div>
    `;
    chatBox.appendChild(mensajeElemento);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// token
const btnToken = document.getElementById('token');
btnToken.addEventListener('click', function(){
    alert('token copiado')
})



const chatBox2 = document.getElementById('chat-box2');
const chatInput2 = document.getElementById('chat-input2');

function enviarMensaje2() {
    const mensaje2 = chatInput2.value.trim();
    if (mensaje2 !== "") {
        addMensaje2(mensaje2, 'usuario2');
        chatInput2.value = '';
    }
}

chatInput2.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviarMensaje2();
    }
});

function addMensaje2(mensaje2, usuario2) {
    const mensajeElemento2 = document.createElement('div');
    mensajeElemento2.classList.add('chat-message2'); 

    const avatar = usuario2 === 'usuario' ? '../../assets/img/iconos/perfil.png' : '../../assets/img/iconos/perfil.png';

    mensajeElemento2.innerHTML = `
        <img src="${avatar}" alt="Avatar" class="avatar">
        <span class="username2">${usuario2}</span>
        <div class="comentario2">
            <span class="message-text2">${mensaje2}</span>
        </div>
    `;
    chatBox2.appendChild(mensajeElemento2);
    chatBox2.scrollTop = chatBox2.scrollHeight;
}

// menú-desplegable



  
  // Función para cerrar el modal de expulsión
  
  // Función para expulsar al jugador
   window.expulsarJugador =  async function () {

    const data_delete = {
        "id_user": data_temp_user,
        "id_sala": salaActive[0].id_sala
    }
    let delete_player =  await data_sys.dataCaptura('../../processes/juego/salas/deleteUser.php', data_delete);

    // console.log(delete_player);

    if(delete_player.status){
        jugadoresSala();
        alerttoast('El jugador ha sido expulsado')
        closeExpulsarModal(); 
    }

  }

window.closeExpulsarModal =   function() {
    document.getElementById("expulsarModal").style.display = "none";
    guardarId(null);
}

  
 
window.onclick = function(event) {
    let modal = document.getElementById("expulsarModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
