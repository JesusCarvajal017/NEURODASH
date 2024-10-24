// ---------- Base de datos de preguntas ----------//
const preguntas = [
    {
        id: "A",
        pregunta: "Empresa reconocida que se dedica a los servidores",
        respuestaCorrecta: "amazon",
        respuestasIncorrectas: ["almacen", "amigo"],
    },
    {
        id: "B",
        pregunta: "Término en inglés que hace referencia a una copia de seguridad",
        respuestaCorrecta: "backup",
        respuestasIncorrectas: ["bajar", "restaurar"],
    },
    {
        id: "C",
        pregunta:
        "Nombre de la memoria que almacena temporalmente los datos de la computadora",
        respuestaCorrecta: "cache",
        respuestasIncorrectas: ["caché", "cinta"],
    },
    {
        id: "D",
        pregunta:
        "Archivo que controla los periféricos que se conectan a la computadora",
        respuestaCorrecta: "driver",
        respuestasIncorrectas: ["demonio", "diseño"],
    },
    {
        id: "E",
        pregunta:
        "Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado",
        respuestaCorrecta: "encriptar",
        respuestasIncorrectas: ["enviar", "empaquetar"],
    },
    {
        id: "F",
        pregunta: "Famosa red social creada por Mark Zuckerberg",
        respuestaCorrecta: "facebook",
        respuestasIncorrectas: ["flickr", "foursquare"],
    },
    {
        id: "G",
        pregunta: "Lenguaje de programación creado por Google",
        respuestaCorrecta: "go",
        respuestasIncorrectas: ["gobernar", "golem"],
    },
    {
        id: "H",
        pregunta: "Lenguaje utilizado para la estructura de las páginas web",
        respuestaCorrecta: "html",
        respuestasIncorrectas: ["haskell", "horizonte"],
    },
    {
        id: "I",
        pregunta:
        "Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con estos",
        respuestaCorrecta: "interfaz",
        respuestasIncorrectas: ["interrupción", "instrucción"],
    },
    {
        id: "J",
        pregunta:
        "Lenguaje de programación con el cual se diseñó el sistema operativo Android",
        respuestaCorrecta: "java",
        respuestasIncorrectas: ["javadoc", "javascript"],
    },
];

// ---------- configuracioes del  juego ----------//

const configuraciones = {
    TIEMPO_JUEGO: 60, // tiempo en segundos
    TOTAL_PREGUNTAS: preguntas.length,
    RADIO_CIRCULO: 120,
    CENTRO_XY: 90,
    };

    // estado base del juego
    let estadoPreguntas = Array(configuraciones.TOTAL_PREGUNTAS).fill(false);

    let puntaje = 0;
    let numPreguntaActual = -1;
    let  tiempoRestante = configuraciones.TIEMPO_JUEGO;

    let countdown;

    // elementos del html

    // ---------- section  ---------- //


    // section inical
    const pantallaInical = document.getElementById("pantalla-inicial");

    // ---------- sectiion juego  ---------- //
    const pantallaJuego = document.getElementById('pantalla-juego');
    const tiempo = document.getElementById('tiempo');
    const palabrasCirculos = document.querySelector('.palabras-circule');
    const containerCirculos = document.querySelector('.container-tiempo');
    const msgError = document.getElementById('mensaje-error');
    const letraPregunta = document.getElementById('letra-pregunta');
    const pregunta = document.getElementById('pregunta');
    const respuesta = document.getElementById('respuesta');

    // ---------- section final   ---------- //

    const pantallaFinal = document.getElementById('pantalla-final');
    const  puntajeFinal = document.getElementById('acertadas');
    const porcentajeFinal = document.getElementById('score');


    // ---------- botones   ---------- //

    const btnnComenzar = document.getElementById('btn-comenzar');
    const btnResponder = document.getElementById('responder');
    const btnPasar = document.getElementById('pasar');
    const btnRecomenzar = document.getElementById('recomenzar');

    
    document.addEventListener('DOMContentLoaded', function () {
        cargarEventos();
    });


    // ---------- funcion para cargar eventos al DOM ---------- //
    function cargarEventos() {
        btnnComenzar.addEventListener('click', iniciarJuego);
        btnResponder.addEventListener('click', manejarRespuesta);
        btnPasar.addEventListener('click', pasarPregunta);
        btnRecomenzar.addEventListener('click', reiniciarJuego);
    }

    // ---------- funcion para iniciar el juego ---------- //
    function iniciarJuego() {
        pantallaInical.classList.add('ocultar');
        pantallaJuego.classList.remove('ocultar');
    
        crearCirculos();
        cargarPregunta();
        temporizador();
    }

    // ---------- funcion encargada de la cuenta regresiva ---------- //
    function temporizador() {
        clearInterval(countdown);

        countdown = setInterval(
            () => {
                tiempoRestante--;
                tiempo.textContent = tiempoRestante;

                if (tiempoRestante < 0) {
                    clearInterval(countdown);
                    finJuego();
                }
            }, 1000
        );
    }

    // ---------- funcion para crear los circulos y insertalos al DOM ---------- //
    function crearCirculos() {

        for (let iteracion = 0; iteracion < configuraciones.TOTAL_PREGUNTAS; iteracion++) {
            
            const circulo = document.createElement('div');
            circulo.classList.add('circulo');
            // las letras se crean con el codigo ASCII, inica con 65 = A
            circulo.textContent = String.fromCharCode(65 + iteracion);
            circulo.id = circulo.textContent;

            // se calcula los angulos en radianes
            const angulos = (iteracion/ configuraciones.TOTAL_PREGUNTAS) * Math.PI * 2 - Math.PI / 2;

            //? consultar
            const x = Math.round(configuraciones.CENTRO_XY + configuraciones.RADIO_CIRCULO * Math.cos(angulos));
            const y = Math.round(configuraciones.CENTRO_XY + configuraciones.RADIO_CIRCULO * Math.sin(angulos));
            circulo.style.left = `${x}px`;
            circulo.style.top = `${y}px`;

            palabrasCirculos.appendChild(circulo)
        }
    }

    // ---------- funcion encargada de revolver las opciones de respuesta ---------- //
    function generarOpioens(preguntaActual) {
        const opciones = new Set ([
            preguntaActual.respuestaCorrecta,
            ...preguntaActual.respuestasIncorrectas
        ]);

        return Array.from(opciones).sort(()=> Math.random() - 0.5);
    }

    // ---------- funcion que se encarga de validar las preguntas que se van cargando, respondiendo y de  insertalas al DOM ---------- //
    function cargarPregunta() {
        do {
            numPreguntaActual=(numPreguntaActual+1)%configuraciones.TOTAL_PREGUNTAS;

            if (estadoPreguntas.every(v => v)) {
                finJuego();
                return;
            }
        } while (estadoPreguntas[numPreguntaActual]);

        preguntaAct(numPreguntaActual)
    }

    // ---------- funcion encargada de colocarle un indice de color a la pregunta ---------- //
    function preguntaAct(numPreguntaActual) {
        const preguntaActual = preguntas[numPreguntaActual];
        letraPregunta.textContent = preguntaActual.id;
        pregunta.textContent = preguntaActual.pregunta;
    
        // Agrega la clase pregunta-actual aquí
        const circulo = document.getElementById(preguntaActual.id);
        circulo.classList.add('pregunta-actual');
    
        cargarOpciones(preguntaActual);
    }

    // ---------- funcion encargada de insertar las opciones al DOM ---------- //
    function cargarOpciones(preguntaActual) {
        const opciones = generarOpioens(preguntaActual);
        respuesta.innerHTML = `<option value='' selected disabled>Opciones</option>`; 

        opciones.forEach(opcion => {
            const opcionElemt = document.createElement('option');
            opcionElemt.value = opcion.toLowerCase();
            opcionElemt.textContent = opcion;
            respuesta.appendChild(opcionElemt);
        })
    }

    // ---------- funcion encargada de manejar los mensaje, mostrarlos y ocultarlos por un tiempo en el DOM ---------- //

    function manejarRespuesta() {
        const respuestaSelect = respuesta.value.toLowerCase();
        if (!respuestaSelect) {
            msgError.textContent = 'Debe seleccionar una respuesta.';
            msgError.classList.remove('ocultar');

            setInterval(
                () => {
                    msgError.classList.add('ocultar');
                },3000
            )
        }else{
            controlarRespuesta(respuestaSelect)
        }
    }

    // ---------- funcion ecargadad de aplicarle las clases correspondientes a las preguntas respondidas ---------- //
    function controlarRespuesta(respuesta) {
        const respuestaCorrecta = preguntas[numPreguntaActual].respuestaCorrecta.toLowerCase();
        estadoPreguntas[numPreguntaActual] = true;
    
        const circulo = document.getElementById(preguntas[numPreguntaActual].id);
    
        circulo.classList.remove('pregunta-actual');
    
        if (respuesta === respuestaCorrecta) {
            circulo.classList.add('correcto');
            puntaje++;
        } else {
            circulo.classList.add('incorrecto');
        }
    
        cargarPregunta();
    }

    // ---------- funcion que se encarga de saltar la palabre y limpiar las clases ---------- //
    function pasarPregunta() {
        document.getElementById(preguntas[numPreguntaActual].id).classList.remove('pregunta-actual');
        cargarPregunta();
    }


    function finJuego() {
        clearInterval(countdown);
        puntajeFinal.textContent = puntaje;
        porcentajeFinal.textContent = `${(puntaje*100)/configuraciones.TOTAL_PREGUNTAS}% de aciertos`;
        pantallaJuego.classList.add('ocultar');
        pantallaFinal.classList.remove('ocultar');
    }
    function reiniciarJuego() {
        // Restablecer el puntaje y estado de preguntas
        puntaje = 0;
        estadoPreguntas = Array(configuraciones.TOTAL_PREGUNTAS).fill(false);
        numPreguntaActual = -1;
        tiempoRestante = configuraciones.TIEMPO_JUEGO;
    
        // Restablecer el temporizador
        clearInterval(countdown);
        tiempo.textContent = tiempoRestante;
    
        // Limpiar la pantalla de juego y volver a la pantalla inicial
        pantallaFinal.classList.add('ocultar');
        pantallaInical.classList.remove('ocultar');
        
        // Limpiar el contenedor de círculos
        palabrasCirculos.innerHTML = '';
    }