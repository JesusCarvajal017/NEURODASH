let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivo = null;

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo-restante');
let mensajeFinal = document.getElementById('mensajeFinal');

// Lista de imágenes
let frutas = [
    "../../assets/img/avatars/avatar1.jpg",
    "../../assets/img/avatars/avatar1.jpg",
    "../../assets/img/avatars/avatar2.png",
    "../../assets/img/avatars/avatar2.png",
    "../../assets/img/avatars/avatar3.jpg",
    "../../assets/img/avatars/avatar3.jpg",
    "../../assets/img/avatars/avatar4.jpg",
    "../../assets/img/avatars/avatar4.jpg",
    "../../assets/img/avatars/avatar5.png",
    "../../assets/img/avatars/avatar5.png",
    "../../assets/img/avatars/avatar6.png",
    "../../assets/img/avatars/avatar6.png",
    "../../assets/img/avatars/avatar7.png",
    "../../assets/img/avatars/avatar7.png",
    "../../assets/img/avatars/avatar8.png",
    "../../assets/img/avatars/avatar8.png"
];

// Barajar frutas
frutas = frutas.sort(() => Math.random() - 0.5);
console.log(frutas);

function contarTiempo() {
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer <= 0) {
            clearInterval(tiempoRegresivo);
            document.getElementById("cart").classList.add("cart");
            bloquearTarjetas();
            mensajeFinal.innerHTML = '¡Se acabó el tiempo! Mejor suerte la próxima vez.';
            mostrarSoloMensajeFinal();
        window.location.href = "../home.html";        }
    }, 3000);
}

function bloquearTarjetas() {
    for (let i = 0; i < 16; i++) {
        let tarjetaBloqueada = document.getElementById(i).querySelector('.btnCartas-inner');
        tarjetaBloqueada.classList.add('flipped');
        tarjetaBloqueada.disabled = true;
        tarjetaBloqueada.querySelector('.btnCartas-back').innerHTML = `<img src="${frutas[i]}" alt="Fruta" class="img-fruta">`;
    }
}

function destapar(id) {
    if (!temporizador) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    const tarjeta = document.getElementById(id).querySelector('.btnCartas-inner');

    if (tarjetasDestapadas === 1) {
        tarjeta1 = tarjeta;
        primerResultado = frutas[id];
        tarjeta1.classList.add('flipped');
        tarjeta1.querySelector('.btnCartas-back').innerHTML = `<img src="${primerResultado}" alt="Fruta" class="img-fruta">`;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = tarjeta;
        segundoResultado = frutas[id];
        tarjeta2.classList.add('flipped');
        tarjeta2.querySelector('.btnCartas-back').innerHTML = `<img src="${segundoResultado}" alt="Fruta" class="img-fruta">`;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivo);
                mensajeFinal.innerHTML = `¡Felicidades! Ganaste el juego con ${movimientos} movimientos en ${timerInicial - timer} segundos. 😎`;
                mostrarSoloMensajeFinal();
            }
        } else {
            setTimeout(() => {
                tarjeta1.classList.remove('flipped');
                tarjeta2.classList.remove('flipped');
                tarjetasDestapadas = 0;
            }, 1000);
        }
    }
}

// Función para mostrar solo el mensaje final
function mostrarSoloMensajeFinal() {
    // Ocultar las cartas
    const contenedorCartas = document.getElementById('contenedorCartas');
    if (contenedorCartas) {
        contenedorCartas.style.display = 'none';
    }

    // Ocultar las estadísticas
    const estadisticas = [mostrarMovimientos, mostrarAciertos, mostrarTiempo];
    estadisticas.forEach((elemento) => {
        if (elemento) {
            elemento.style.display = 'none';
        }
    });
}



 // Mostrar la pantalla de carga al entrar
window.onload = function() {
    document.getElementById('loadingScreen').style.display = 'flex';
    // Ocultar la pantalla de carga después de 1 segundo
    setTimeout(function() {
        document.getElementById('loadingScreen').style.display = 'none';
        }, 1000);
    };

// Volver a mostrar la pantalla de carga al salir de la página
    window.onbeforeunload = function() {
        document.getElementById('loadingScreen').style.display = 'flex';
    };
