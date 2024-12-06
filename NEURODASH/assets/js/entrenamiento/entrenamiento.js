import AudioControllers from '../sound/controlles.js';
let musicaJuego = new AudioControllers('../../assets/music/juegos_dash.mp3');


musicaJuego.sound();
musicaJuego.loopMusisc();


// ronda 1 tiempo 

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let timeLeftMinutes = 0; 
let timeLeftSeconds = 15; 

const countdown = setInterval(() => {
    if (timeLeftSeconds > 0) {
        timeLeftSeconds--;
    } else if (timeLeftMinutes > 0) {
        timeLeftMinutes--;
        timeLeftSeconds = 59; 
    } else {
        clearInterval(countdown);
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
     
        setTimeout(() => {
            window.location.href = 'ronda1.1-entrenamiento.html';
        }, 1000);
        return; // Termina la función aquí
    }

    minutesElement.textContent = String(timeLeftMinutes).padStart(2, '0');
    secondsElement.textContent = String(timeLeftSeconds).padStart(2, '0');
}, 1000);





// ver y ocultar secciones de tutoriales 
   
// function showSection(seccionId) {
//     // Ocultar todas las secciones
//     const sections = document.querySelectorAll('.seccion');
//     sections.forEach(section => section.classList.remove('active'));

//     // Mostrar la sección seleccionada
//     const activeSection = document.getElementById(seccionId);
//     activeSection.classList.add('active');
// }



// ----------

  
    

    
