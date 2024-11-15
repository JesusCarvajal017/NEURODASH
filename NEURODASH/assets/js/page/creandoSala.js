
localStorage.clear();
const radioButtons = document.querySelectorAll('input[name="options"]');
const thematicSection = document.getElementById("ocul");

    // Escucha los cambios en los radios
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            // Oculta o muestra la sección según si se seleccionó 'terms'
            thematicSection.style.display = radio.id === 'numbers' ? 'none' : 'flex';            
        });
    });


// let btn_create  = document.querySelector('.-create-room-btn');


const inputs_modo = document.querySelectorAll('.radio-groupS input[type="radio"]');

// Agregamos un evento "click" a cada radio button
inputs_modo.forEach((radio) => {
  radio.addEventListener('click', () => {
    // Capturamos el valor del radio button que fue clickeado
    localStorage.setItem('data_modo', radio.value);
    creadorSala();
    console.log(localStorage.getItem('data_modo'));
    // activadorCrearSala();
  });
});

const inputs_dificultad = document.querySelectorAll('.radios_dificultad input[type="radio"]');

// Agregamos un evento "click" a cada radio button
inputs_dificultad.forEach((radio) => {
  radio.addEventListener('click', () => {
    // Capturamos el valor del radio button que fue clickeado
    localStorage.setItem('data_dificultad', radio.value);
    creadorSala();
    console.log(localStorage.getItem('data_dificultad'));
  });
});


function creadorSala(){
    let modo_juego = localStorage.getItem('data_modo');
    let dificultad = localStorage.getItem('data_dificultad'); 

    if(modo_juego && dificultad){
        alert('no se a seleccionado')
        activadorCrearSala();
    }

}


function activadorCrearSala(){
    let bnt_crar_sala  = document.querySelector('.create-room-btn'); 

    bnt_crar_sala.classList.remove('disabled-input');
}

