// ronda 1 tiempo 

function temporizador() {
    
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

            const especial = document.querySelectorAll('.especial');

    especial.forEach(element => {
        if (element.classList.contains('disabled')) {
            element.classList.remove('disabled');
        } else {
            element.classList.add('disabled');
        }
    })
            // window.location.href = 'ronda1.1-entrenamiento.html';
        }, 1000);
        return; // Termina la función aquí
    }

    minutesElement.textContent = String(timeLeftMinutes).padStart(2, '0');
    secondsElement.textContent = String(timeLeftSeconds).padStart(2, '0');
}, 1000);
}

document.addEventListener('DOMContentLoaded', function () {
    temporizador();
    // Llamar a la función para mostrar los datos
    mostrarDatos(mostrarNumeros, secuenciaDes);
    mostrarDatos(arrayNmeros, secuencia);   
})

// setTimeout(function () {
//     const especial = document.querySelectorAll('.especial');
//     especial.forEach(element => {
//         if (element.classList.contains('disabled')) {
//             element.classList.remove('disabled');
//         } else {
//             element.classList.add('disabled');
//         }
//     });
// }, 5000);


const arrayNmeros = ["CDXLIV","DCCCXC","MCMXCIX","MMMDCCCLXXXVIII","CMXXXIX","CDXLV","MMMDCCCLXXX","MCDXLVI","DCCCXXXVII","MCMXXXVII","MMDCCCXXI","MMDCCCXLV","MCMXLV","MMMCMXCIII","MMDCCCLXXVII"];
const mostrarNumeros = [...arrayNmeros].sort(() => Math.random() - 0.5);

const secuencia = document.getElementById('secuencia');
// secuencia desordenada 
const secuenciaDes = document.getElementById('secuenciaDes');
// ubicar secuencia 
const ubicarSec = document.getElementById('ubicarSec');

const result = document.getElementById('result');
const btnValidar = document.getElementById('btnValidar'); 

Sortable.create(secuenciaDes, {
    group: 'numeros',
    animation: 150,
    // ghostClass: 'active'

    chosenClass: 'active'
    
});

Sortable.create(ubicarSec, {
    group: 'numeros',
    animation: 150,
    // ghostClass: 'active'
    chosenClass: 'active'
    
});

function mostrarDatos(array, contenedor) {
    // Limpiar el contenedor antes de añadir nuevos elementos
    contenedor.innerHTML = '';

    array.forEach(data => { 
        const div = document.createElement('div');
        div.classList.add('list-group-item');
        div.innerHTML = `${data}`;
        contenedor.appendChild(div);
    });
}




btnValidar.addEventListener('click', () => {
    const validarSec = Array.from(ubicarSec.children).map(item => item.innerText);

    const validacion = validarSec.join(',') === arrayNmeros.join(',');
    
    // Limpiar clases anteriores
    Array.from(ubicarSec.children).forEach(item => {
        item.classList.remove('correct', 'incorrect');
    });

    // Aplicar estilos según la validez
    validarSec.forEach((num, index) => {
        if (num === arrayNmeros[index]) {
            ubicarSec.children[index].classList.add('correct');
        } else {
            ubicarSec.children[index].classList.add('incorrect');
        }
    });

    // Mostrar resultado
        result.innerText = validacion ? "¡Correcto!" : "Incorrecto, intenta de nuevo.";
})
