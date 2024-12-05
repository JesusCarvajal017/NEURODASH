import DataExtraction from '../../assets/js/global/peticiones.js';
import Loader from '../../assets/js/animation/classLoder.js';

let data_sys = new DataExtraction();
let loader_sys = new Loader(document.querySelector('.loader-default')); 

let modal_status = document.getElementById('modalMiembroSala'); 
let menssage_status = document.querySelector('.message-modal');
let modal_controll = new bootstrap.Modal(modal_status);

let data_sala = {};

async function resfrehsData(){
  // let data_sala_temp = JSON.parse(localStorage.getItem('sala_temp'));
  data_sala =  await data_sys.receptorData('../../processes/juego/salas/jugadoresSla.php');
}

async function listJugadoresSala(){
  // {id_sala: 1, token_origin: 5001} => formato  
  await resfrehsData();
  let resulta_data_jugadores = "";
  if(Array.isArray(data_sala)){
      resulta_data_jugadores = data_sala[0].jugadores_sala.map(item => {
      return {
          name: item.name,
          image: `../../${item.imageUser}`,
          // image: item.imageUser,
          identificador: item.id
      }
    });
  }else{
    menssage_status.textContent = "Te han expulsado de la sala :("
    modal_controll.show();

    setTimeout(()=>{
      window.location = '../home.html';
    }, 2500)
  }
  return resulta_data_jugadores;  
}

async function startSala() {
  if((data_sala[0].status_sala == 2)){
    loader_sys.show();

    // setTimeout(()=>{
      window.location = '../multijugador/rondas.html';
    // }, 3000)
  }
}

// arreglo que contiene la ubicación y la cantidad de hexágonos
let  ubicaciones = [
  { clase: "content-top", hexagonosCant: 4 },
  { clase: "content-top2", hexagonosCant: 5 },
  { clase: "content-half", hexagonosCant: 6 },
  { clase: "content-button2", hexagonosCant: 5 },
  { clase: "content-button", hexagonosCant: 4 },
];

//   arreglo temporal de jugadores
let jugadoresEspera = await listJugadoresSala();
// console.log(jugadoresEspera);

// console.log(jugadoresEspera);
// Ejemplo para orden de matriz => antigua
// const jugadoresEspera = [
//   {
//     name: "Jugador 1",
//     image: "../../assets/img/avatars/avatar2.png",
//     puntos: 1500,
//     puntosMax: 2000,
//     bonos: 6,
//     liga: "oro",
//   },

// contenedor principal del HTML
let main = document.getElementById("contenedor-hexagonos");
// variable encargada de iterar sobre los jugadoresEspera
var jugadorIteracion = 0;


// ******************* observacion => la version anterior error_refresh_sala se trataba de la creaacion de elementos, por lo cual no se asignaban de la forma correcta 
async function crearContenedores() {
  jugadoresEspera = await listJugadoresSala();
  let htmlContent = ""; // Variable para almacenar el HTML

  ubicaciones.forEach((element) => {
    // Inicia un contenedor de hexágonos con clases aplicadas
    let contenedorHexagonosHTML = `
      <div class="hexagonos aling-item-centerN m-0 ${element.clase}">
    `;

    // Ciclo para crear los hexágonos y añadirlos al contenedor
    for (let iteracion = 0; iteracion < element.hexagonosCant; iteracion++) {
      if (jugadorIteracion < jugadoresEspera.length) {
        const jugador = jugadoresEspera[jugadorIteracion];
        let data_temp = JSON.stringify(jugador).replace(/'/g, "\\'").replace(/"/g, '&quot;')

        // Genera el HTML de un hexágono usando la función crearHexagonoHTML
        contenedorHexagonosHTML += ` <div class="content-hex aling-item-centerN flex-column" data-bs-toggle="modal" data-bs-target="#infoJugador" onclick="infoModal('${data_temp}')">
                                      <div class="content-img mt-3">
                                        <img src="${jugador.image}" alt="${jugador.name}">
                                      </div>
                                      <div class="content-name">
                                        <p class="text-center">${jugador.name}</p>
                                      </div>
                                    </div>`;
        jugadorIteracion++;
      } else {
        break;
      }
    }

    // Cierra el contenedor de hexágonos
    contenedorHexagonosHTML += `</div>`;
    // Agrega el HTML del contenedor al contenido principal
    htmlContent += contenedorHexagonosHTML;
  });

  // Agrega todo el HTML generado al contenedor principal con innerHTML
  main.innerHTML = htmlContent;
}

window.infoModal = function(jugador){
  let data_jugador = JSON.parse(jugador);


  document.querySelector(".icon-liga").src = data_jugador.image;
  document.querySelector(".name-user-sala").textContent = data_jugador.name;
  // document.getElementById("modalBono").value = jugador.bonos;
  // console.log(avatar)

}

function crearHexagonoHTML(jugador) {
  // Genera el HTML de un hexágono con la información del jugador
  return `
   
  `;
}


// cargar modal
function infoModal(avatar) {
  alert(avatar);
  // const modalExp = document.getElementById("modalExp");
  // modalExp.style.width = "0%"; // Comienza en 0%
  // const calcularExp = (jugador.puntos / jugador.puntosMax) * 100;

  // // Animación gradual
  // let currentWidth = 0;
  // const interval = setInterval(() => {
  //   if (currentWidth < calcularExp) {
  //     currentWidth++;
  //     modalExp.style.width = `${currentWidth}%`;
  //     modalExp.textContent = `${jugador.puntos}/${jugador.puntosMax}`;
  //   } else {
  //     clearInterval(interval);
  //   }
  // }, 10); // Ajusta la velocidad de la animación
}

// invocamos  la función para crear los contenedores
await crearContenedores();
setInterval(async ()=>{
  jugadorIteracion = 0;
  crearContenedores();
  startSala();
}, 1000)


// boton de primera confirmacion
let btn_salir_sala = document.querySelector('.salir-sala-user');
let btn_modal_salir = document.querySelector('.salirSalUser');

// boton de ultima confirmacion
let btn_salir_sla = document.querySelector('#btnSalirSla');

btn_salir_sala.addEventListener('click', ()=>{
  btn_modal_salir.click();

})

btn_salir_sla.addEventListener('click', async ()=>{
  let temp_user = await data_sys.receptorData('../../model/public/sessionUses.php'); 
  let temp_sala =  JSON.parse(localStorage.getItem('sala_temp')); 

  const data_delete = {
    id_user: temp_user.id_usuario,
    id_sala: temp_sala.id_sala
  };
  
  let proceso_delete = await data_sys.dataCaptura('../../processes/juego/salas/deleteUser2.php', data_delete);

  if(!proceso_delete.status){
    alert('No se logro salir de la sala');
  }else{
    localStorage.clear();
    window.location = '../unirse-sala/salasDispo.html'
    // alert('el suario a salido de la sala');
  }
})


