document.addEventListener("DOMContentLoaded", () => {

  fetch('../assets/json/prueba.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('card-container');
      const swiperWrapper = document.getElementById('swiper-wrapper');

      data.forEach(card => {
        // Crear tarjetas para la vista de escritorio
        const cardHTML = `
          <div class="col">
            <div class="card card-home card-fondo text-center">
              <h5 class="card__title">${card.title}</h5>
              <img src="${card.image}" class="img-card-home" alt="${card.title}" />
              <div class="card-body card__content">
                <p class="card__description">${card.description}</p>
                <a href="${card.link}" class="btn btn-home mt-2">${card.buttonText}</a>
              </div>
            </div>
          </div>
        `;
        container.innerHTML += cardHTML;

        // Crear slides para la vista móvil
        const slideHTML = `
          <div class="swiper-slide card-fondo">
            <img src="${card.image}" class="img-card-home" alt="${card.title}" />
            <a href="${card.link}" class="title btn btn-primary btn-lg">${card.buttonText}</a>
          </div>
        `;
        swiperWrapper.innerHTML += slideHTML;
      });

      // Inicializar Swiper
      var TrandingSlider = new Swiper('.swiper', {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          loop: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          },

        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));


    // tabla de jugadores 

    const jugadores  = [
      {puesto: 1, nombre: 'Jesus', bonos:2, puntos: 1000, puntosMax : 2000 },
      {puesto: 2, nombre: 'Natalia', bonos:4, puntos: 800, puntosMax : 2000 },
      {puesto: 3, nombre: 'Guerrero', bonos:6, puntos: 600, puntosMax : 2000 },
    ]

    function cargarTabla() {
      const tabla = document.getElementById('tablaJugadores');

      jugadores.forEach(data => {
        const fila = document.createElement('tr');
        fila.setAttribute('data-bs-toggle', 'modal');
        fila.setAttribute('data-bs-target', '#modalLigas');
        
        fila.innerHTML = 
        `
          <th scope="row"> ${data.puesto} </th>
          <td> ${data.nombre} </td>
          <td> ${data.puntos} </td>
        `;

        fila.onclick =  () => infoModal(data);
        tabla.appendChild(fila);
      });
    }

    // cargar modal 
    function infoModal(jugador) {
      document.getElementById('modalUsername').textContent = jugador.nombre;

      const calcularExp = (jugador.puntos/jugador.puntosMax)*100;

      document.getElementById('modalExp').style.width = `${calcularExp}%`;
      document.getElementById('modalExp').textContent = `${jugador.puntos}/${jugador.puntosMax}`
      document.getElementById('modalBono').value = jugador.bonos;
    }

    cargarTabla()



  // Selecciona los modales y los dropdowns
  const modalBonos = document.getElementById('modalBonos');
  const modalLigas = document.getElementById('modalLigas');

  const dropdownUser = document.querySelector('.usuario');
  const dropdownLigas = document.querySelector('.ligas');

  // Función para manejar la apertura y cierre del dropdown
  function mostrarMenu(dropdown) {
    const dropdownToggle = dropdown.querySelector('button[data-bs-toggle="dropdown"]');

    dropdownToggle.click(); // Alterna el estado del dropdown
  }

  // Añade listeners para el evento 'hidden.bs.modal' en ambos modales
  modalBonos.addEventListener('hidden.bs.modal', () => mostrarMenu(dropdownUser));
  modalLigas.addEventListener('hidden.bs.modal', () => mostrarMenu(dropdownLigas));

});
