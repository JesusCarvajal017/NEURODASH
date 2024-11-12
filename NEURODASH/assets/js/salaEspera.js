import DataExtraction from '../../assets/js/global/peticiones.js';


let data_sys = new DataExtraction();

async function listJugadoresSala(){
  // {id_sala: 1, token_origin: 5001} => formato
  let data_sala_temp = JSON.parse(localStorage.getItem('sala_temp'));
  
  let data_juagadores = await  data_sys.dataCaptura('../../processes/juego/salas/jugadoresSla.php', data_sala_temp);

  // let informacion =  await data_juagadores;

  console.log(data_juagadores)

  let resulta_data_jugadores = data_juagadores.map(item => {
    return {
        name: item.name,
        image: `../../assets/img/avatars/${item.imageUser}`,
        // image: item.imageUser,
        identificador: item.id
    
    }
  });

  return resulta_data_jugadores;  

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

console.log(jugadoresEspera);

// const jugadoresEspera = [
//   {
//     name: "Jugador 1",
//     image: "../../assets/img/avatars/avatar2.png",
//     puntos: 1500,
//     puntosMax: 2000,
//     bonos: 6,
//     liga: "oro",
//   },
//   // {
//   //   name: "Jugador 2",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 3",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 4",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 5",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 6",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 7",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 8",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 9",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 10",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 11",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 12",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 13",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 14",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 15",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 16",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 17",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 18",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 19",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 20",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 21",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 22",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 23",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
//   // {
//   //   name: "Jugador 24",
//   //   image: "../../assets/img/iconos-desarrollo/icono-user.svg",
//   //   puntos: 1500,
//   //   puntosMax: 2000,
//   //   bonos: 6,
//   //   liga: "oro",
//   // },
// ];

// contenedor principal del HTML
let main = document.getElementById("contenedor-hexagonos");
// variable encargada de iterar sobre los jugadoresEspera
var jugadorIteracion = 0;

function crearContenedores() {
  ubicaciones.forEach((element) => {
    const contenedorHexagonos = document.createElement("div");
    contenedorHexagonos.classList.add(
      "hexagonos",
      "aling-item-centerN",
      "m-0",
      element.clase
    );

    // Ciclo para crear los hexágonos
    for (let iteracion = 0; iteracion < element.hexagonosCant; iteracion++) {
      if (jugadorIteracion < jugadoresEspera.length) {
        const jugador = jugadoresEspera[jugadorIteracion];

        const hexagono = crearHexagono(jugador);

        // Cargamos la información de los hexágonos
        contenedorHexagonos.appendChild(hexagono);
        jugadorIteracion++;
      } else {
        break;
      }
      // Cargamos los hexágonos al contenedor principal HTML fuera del ciclo
      main.appendChild(contenedorHexagonos);
    }
  });
}

function crearHexagono(jugador) {
  const hexagono = document.createElement("div");
  hexagono.classList.add(
    "content-hex",
    // "button-hex",
    "aling-item-centerN",
    "flex-column"
  );
  hexagono.setAttribute("data-bs-toggle", "modal");
  hexagono.setAttribute("data-bs-target", "#exampleModal");

  hexagono.innerHTML = `
            <div class="content-img mt-3">
              <img src="${jugador.image}" alt="${jugador.name}">
            </div>
            
            <div class="content-name">
                <p class="text-center">${jugador.name}</p>
            </div>
          `;
  // Se agrega el evento de click a los hexágonos
  hexagono.onclick = () => infoModal(jugador);

  return hexagono;
}

// cargar modal
function infoModal(jugador) {
  document.querySelector(".icon-liga").src = jugador.image;
  // document.getElementById("modalBono").value = jugador.bonos;
  document.querySelector(".name-user-sala").textContent = jugador.name;
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
crearContenedores();
setInterval(async ()=>{
  main.innerHTML = "";
  jugadorIteracion = 0;
  jugadoresEspera = await listJugadoresSala();
  crearContenedores();
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
    
   let proceso_delete = await data_sys.dataCaptura('../../processes/juego/salas/deleteUser.php', data_delete);


    if(!proceso_delete.status){
      alert('No se logro salir de la sala');
    }else{
      localStorage.clear();
      window.location = '../unirse-sala/salasDispo.html'
      // alert('el suario a salido de la sala');
    }
})


