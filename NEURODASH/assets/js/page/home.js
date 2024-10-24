// window.addEventListener('popstate', ()=>{
//   // window.location.reload();
//   alert('hola')
// })


// import SYS_USER from '';
import Loader from '../animation/classLoder.js';

let domLoader = document.querySelector('.loader-default');

let loader = new Loader(domLoader);
// async function main(){

//   let session_respose = await fetch('../model/public/data.php');

//   // let pase = await session_respose;



// }
// loader.show();
// main();
fetch('../model/public/data.php')
.then(response => {
  if(!response.ok){
    if(response.status === 401){
      window.location = '../index.html'
    }
  }else{
    loader.hidde();
  }
})
.then(data => {
  

  // loader.hidde();
  // if(data.session == 'no'){
  //   console.log('no hay session');
  //   window.location = '../index.html';
  // }else{
    
  // }

})



// data default
const jugadores = [
  { puesto: 1, nombre: 'Jesus', bonos: 2, puntos: 1000, puntosMax: 2000 },
  { puesto: 2, nombre: 'Natalia', bonos: 4, puntos: 800, puntosMax: 2000 },
  { puesto: 3, nombre: 'Guerrero', bonos: 6, puntos: 600, puntosMax: 2000 },
];


// window.addEventListener('load', ()=>{
  
//   fetch('../model/login/session.php')
//   .then(respose => respose.json())
//   .then(data => {
//     if(data.status == 'no'){
//       window.location = 'http://localhost/NEURODASH-REPO/NEURODASH/views/forms/login.html';
//     }else{

//     }
//   })  

// })

// const loader = document.querySelector('.loader-default');

// window.addEventListener('load', ()=>{
//   loader.style = 'display: none';
// })

// document.addEventListener("DOMContentLoaded", () => {
//   loader.style = 'display: block';

// invocar funciones 
  cargarDatos();
  cargarTabla();
  configurarNotificaciones();
  configurarModales();
// });

  
function cargarDatos() {
  fetch('../assets/json/prueba.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('card-container');
      const swiperWrapper = document.getElementById('swiper-wrapper');
    
      data.forEach(card => {
        // function encargada de crear las cartas para pc 
        // container.innerHTML += cartasPC(card);
        // function encargada de crear las cartas para moviles 
        swiperWrapper.innerHTML += cartasMovil(card);
        cardSwiper();
      });
      
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}

function cartasMovil(card) {
  return /*html*/`
    <div class="swiper-slide swiper-slide-home card-fondo">
      <div class="img-card-home h-100">
        <img src="${card.image}" alt="${card.title}" />
      </div>
      <a href="${card.link}" class="title">${card.buttonText}</a>
    </div>
  `;
}

function cardSwiper() {
  new Swiper('.swiper-home', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1
    }
  });
}

function cargarTabla() {
  const tabla = document.getElementById('tablaJugadores');

  jugadores.forEach(data => {
    const fila = document.createElement('tr');
    fila.setAttribute('data-bs-toggle', 'modal');
    fila.setAttribute('data-bs-target', '#modalLigas');
    
    fila.innerHTML = `
      <th scope="row">${data.puesto}</th>
      <td>${data.nombre}</td>
      <td>${data.puntos}</td>
    `;

    fila.onclick = () => infoModal(data);
    tabla.appendChild(fila);
  });
}

function infoModal(jugador) {
  document.getElementById('modalUsername').textContent = jugador.nombre;

  const calcularExp = (jugador.puntos / jugador.puntosMax) * 100;
  document.getElementById('modalExp').style.width = `${calcularExp}%`;
  document.getElementById('modalExp').textContent = `${jugador.puntos}/${jugador.puntosMax}`;
  document.getElementById('modalBono').value = jugador.bonos;

  animarExp(calcularExp, jugador);
}

function animarExp(calcularExp, jugador) {
  let currentWidth = 0;
  const interval = setInterval(() => {
    if (currentWidth < calcularExp) {
      currentWidth++;
      const modalExp = document.getElementById('modalExp');
      modalExp.style.width = `${currentWidth}%`;
      modalExp.textContent = `${jugador.puntos}/${jugador.puntosMax}`;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

function configurarModales() {
  const modalBonos = document.getElementById('modalBonos');
  const modalLigas = document.getElementById('modalLigas');

  const dropdownUser = document.querySelector('.usuario');
  const dropdownLigas = document.querySelector('.ligas');

  modalBonos.addEventListener('hidden.bs.modal', () => mostrarMenu(dropdownUser));
  modalLigas.addEventListener('hidden.bs.modal', () => mostrarMenu(dropdownLigas));
}

function mostrarMenu(dropdown) {
  const dropdownToggle = dropdown.querySelector('button[data-bs-toggle="dropdown"]');
  dropdownToggle.click(); // Alterna el estado del dropdown
}

function configurarNotificaciones() {
  const notificationModal = document.querySelector('.notification.icon-home');
  const notificationDropdown = document.querySelector('.btn-nav .notification');

  const notificaciones = 3; // Por ejemplo, 3 notificaciones para el dropdown

  notificationModal.style.setProperty('--notification-content', `"${notificaciones}"`);
  notificationDropdown.style.setProperty('--notification-content', `"${notificaciones}"`);
}


