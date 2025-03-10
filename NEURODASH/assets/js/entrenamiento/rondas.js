window.addEventListener("load", init);

function init() {
    // Recuperar los parámetros de localStorage
    const idNivel = localStorage.getItem('idNivel');
    const idModo = localStorage.getItem('idModo');
    const idItem = localStorage.getItem('idItem');

    if (!idNivel || !idModo || !idItem) {
        console.error("Faltan parámetros en localStorage");
        return;
    }

    // Llamar a la función que obtiene las rondas
    cargarRondas(idNivel, idModo, idItem)
        .then((rondas) => {
            const juego = new Juego(rondas);
            juego.iniciarRonda();
        })
        .catch((error) => console.error("Error en la carga de rondas:", error));
}

// Función para cargar rondas
async function cargarRondas(idNivel, idModo, idItem) {
    const response = await fetch("../../model/entrenamiento/cargar_rondas.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idNivel: idNivel,
            mdo_juegoId: idModo,
            idItem: idItem
        })
    });

    if (!response.ok) throw new Error("Error al cargar las rondas");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Datos de rondas inválidos");
    return data.map((r) => new Ronda(r.id, r.tiempos, r.secuencia));
}

// Clase Ronda
class Ronda {
    constructor(id, tiempos, secuencia) {
        this.id = id;
        this.tiempos = tiempos;
        this.secuencia = secuencia;
    }
}


class Temporizador {
    constructor(minutos, segundos, callback, callbackAntesDeTerminar = null) {
        this.minutos = minutos;
        this.segundos = segundos;
        this.callback = callback;
        this.callbackAntesDeTerminar = callbackAntesDeTerminar;
        this.intervalo = null;

        this.tiempoTMP = 0;//atributo que sirve para calcualar los puntos por ronda
    }

    iniciar() {
        if (this.intervalo) return;

        this.actualizarUI();
        this.intervalo = setInterval(() => {
            if (this.segundos > 0) {
                this.segundos--;
                this.tiempoTMP++;

                // Ejecuta el callback antes de terminar si queda menos de 1 segundo
                if (this.minutos === 0 && this.segundos === 0 && this.callbackAntesDeTerminar) {
                    this.callbackAntesDeTerminar();
                }
            } else if (this.minutos > 0) {
                this.minutos--;
                this.segundos = 59;
            } else {
                this.detener();
                if (this.callback) this.callback();
                return;
            }
            this.actualizarUI();
        }, 1000);
    }

    detener() {
        clearInterval(this.intervalo);
        this.intervalo = null;
    }

    actualizarUI() {
        document.getElementById("minutos").textContent = String(
            this.minutos
        ).padStart(2, "0");
        document.getElementById("segundos").textContent = String(
            this.segundos
        ).padStart(2, "0");
    }

    tiempoRestante() {
        return this.minutos * 60 + this.segundos;
    }
}

class Juego {
    // Inicializa el juego con rondas, puntos por término y bonificación por rapidez
    constructor(rondas, puntosPorTermino = 500, bonificacionRapidez = 50) {
        this.rondas = rondas.map(r => new Ronda(r.id, r.tiempos, r.secuencia));
        this.indiceActual = 0;
        this.temporizadorVisual = null;
        this.temporizadorRonda = null;

        this.historial = new HistorialPuntuaciones();
        this.puntosPorTermino = puntosPorTermino;
        this.bonificacionRapidez = bonificacionRapidez;
        this.secuenciaValidada = false;
        this.secuenciaVisual = null;
    }

    // Comienza el juego iniciando la primera ronda
    iniciarJuego() {
        this.iniciarRonda();
    }

    // Inicia una nueva ronda o finaliza el juego si ya no hay más rondas
    iniciarRonda() {
        if (this.indiceActual >= this.rondas.length) {
            this.finalizarJuego();
            return;
        }

        const rondaActual = this.rondas[this.indiceActual];
        this.mostrarRonda(rondaActual);

        this.secuenciaVisual = new SecuenciaVisual(rondaActual.secuencia, this.botonValidar.bind(this));
        this.secuenciaVisual.mostrarSecuencia();
        this.secuenciaVisual.iniciarTemporizadorVisual(rondaActual.tiempos.tiempoVisual, () => {
            this.secuenciaVisual.ocultarSecuencia();
            this.iniciarTemporizadorRonda(rondaActual.tiempos.tiempoRonda);
        });
    }

    // Actualiza el DOM para mostrar el número de la ronda actual
    mostrarRonda(ronda) {
        document.getElementById('ronda').textContent = `Ronda ${ronda.id}`;
    }

    // Inicia un temporizador para la ronda, controlando el tiempo que tiene el jugador
    iniciarTemporizadorRonda(tiempoRonda) {
        document.getElementById('titulo-tiempo').textContent = 'Lo recuerdas';
        this.secuenciaValidada = false;

        const validarBtn = document.getElementById('validarBtn');
        if (validarBtn) validarBtn.disabled = false; // Asegúrate de habilitarlo al inicio de la ronda

        this.temporizadorRonda = new Temporizador(
            tiempoRonda.minutos,
            tiempoRonda.segundos,
            () => {
                this.ocultarBotonValidar();
                if (!this.secuenciaValidada) {
                    this.validarSecuencia();
                }
            },
            // Callback antes de que el temporizador termine
            () => {
                if (validarBtn) validarBtn.disabled = true; // Deshabilita el botón justo antes de llegar a 0
            }
        );

        this.temporizadorRonda.iniciar();
    }


    // Oculta el botón de validación en el DOM  
    ocultarBotonValidar() {
        document.getElementById('validarBtn').style.display = 'none';
    }

    // Valida la secuencia del jugador y actualiza la interfaz y el historial
    validarSecuencia() {
        const rondaActual = this.rondas[this.indiceActual];
        const secuenciaActual = rondaActual.secuencia;
        const secuenciaDesordenada = this.secuenciaVisual.obtenerSecuenciaDelDOM();
        const secuenciaFormateada = this.secuenciaVisual.formatearSecuencia(secuenciaDesordenada);

        const { correctas, incorrectas, puntuacionRonda, tiempoRestante } = this.temporizadorRonda.minutos === 0 && this.temporizadorRonda.segundos === 0
            ? this.handleTimeUp(secuenciaActual)
            : this.handleValidSequence(secuenciaFormateada, secuenciaActual, rondaActual);

        this.updateDOMResults(correctas, incorrectas, puntuacionRonda);
        this.showScoreSection();

        setTimeout(() => {
            this.hideScoreSection();
            this.indiceActual++;
            this.iniciarRonda();
        }, 5000);

        this.historial.actualizar(correctas, incorrectas, puntuacionRonda);
        if (this.secuenciaVisual.sortable) {
            this.secuenciaVisual.sortable.destroy();
        }
    }

    // Maneja el escenario en que el tiempo se agota, marcando todo como incorrecto
    handleTimeUp(secuenciaActual) {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            secuenciaDom.childNodes.forEach((item) => {
                item.style.backgroundColor = 'red';
            });
        }
        return {
            correctas: 0,
            incorrectas: secuenciaActual.length,
            puntuacionRonda: 0,
            tiempoRestante: 0
        };
    }

    // Compara la secuencia ingresada con la correcta y calcula la puntuación
    handleValidSequence(secuenciaFormateada, secuenciaActual, rondaActual) {
        const resultado = this.compararSecuencias(secuenciaFormateada, secuenciaActual);
        return {
            correctas: resultado.correctas,
            incorrectas: resultado.incorrectas,
            puntuacionRonda: this.calcularPuntuacion(resultado.correctas, rondaActual.tiempos.tiempoRonda),
            tiempoRestante: this.temporizadorRonda.tiempoRestante()
        };
    }

    // Muestra los resultados (aciertos, fallos y puntuación) en el DOM
    updateDOMResults(correctas, incorrectas, puntuacionRonda) {
        document.getElementById('aciertos').textContent = `Aciertos: ${correctas}`;
        document.getElementById('fallos').textContent = `Fallos: ${incorrectas}`;
        document.getElementById('tiempo-restante').textContent = `puntuación: ${puntuacionRonda.toFixed(2)}`;
    }

    // Muestra la sección de puntuación en la interfaz
    showScoreSection() {
        const puntuacionElem = document.getElementById('puntuacion');
        puntuacionElem.classList.remove('disabled');
        document.getElementById("rondas").classList.add("disabled");
        document.getElementById("temporizador").classList.add("disabled");
        document.getElementById("ocultar-secuencia").classList.add("disabled");
    }

    // Oculta la sección de puntuación y restaura la interfaz para la siguiente ronda
    hideScoreSection() {
        const puntuacionElem = document.getElementById('puntuacion');
        puntuacionElem.classList.add('disabled');
        document.getElementById("rondas").classList.remove("disabled");
        document.getElementById("temporizador").classList.remove("disabled");
        document.getElementById("ocultar-secuencia").classList.remove("disabled");
    }

    // Compara dos secuencias y marca las respuestas correctas e incorrectas
    compararSecuencias(secuenciaFormateada, secuenciaActual) {
        const secuenciaDom = document.getElementById('secuencia');
        let correctas = 0;
        let incorrectas = 0;

        secuenciaDom.childNodes.forEach((item, index) => {
            if (secuenciaFormateada[index] === secuenciaActual[index]) {
                item.classList.add('correct');
                correctas++;
            } else {
                item.classList.add('incorrect');
                incorrectas++;
            }
        });

        return { correctas, incorrectas };
    }

    // Calcula la puntuación basada en respuestas correctas y rapidez
    calcularPuntuacion(correctas, tiemposRonda) {
        // Calcula el tiempo máximo permitido en segundos.
        const tiempoMaximo = tiemposRonda.minutos * 60 + tiemposRonda.segundos;
        // Obtiene el tiempo usado por el jugador de un temporizador activo.
        const tiempoUsado = this.temporizadorRonda.tiempoTMP;

        // Calcula el factor de rapidez basado en el tiempo restante (entre 0 y 1).
        const factorRapidez = (tiempoMaximo - tiempoUsado) / tiempoMaximo;

        console.log(`Tiempo usado: ${tiempoUsado}, Factor rapidez: ${factorRapidez}`);

        // Si el factor de rapidez no es un número válido, se calcula la puntuación solo con los puntos básicos.
        if (isNaN(factorRapidez) || factorRapidez === Infinity) {
            return correctas * this.puntosPorTermino;
        }

        // Calcula la puntuación base multiplicando las respuestas correctas por los puntos asignados.
        let puntuacion = correctas * this.puntosPorTermino;

        // Si hay respuestas correctas, se añade la bonificación de rapidez.
        if (correctas > 0) {
            puntuacion += factorRapidez * this.bonificacionRapidez;
        }

        // console.log(`Respuestas correctas: ${correctas}, Puntuación: ${puntuacion.toFixed(2)}`);

        // Devuelve la puntuación calculada para la ronda.
        return puntuacion;
    }

    // Muestra el historial de puntuaciones y finaliza el juego
    finalizarJuego() {
        this.historial.mostrarHistorialCompleto();
        localStorage.clear();
    }

    // Detiene el temporizador y procede a validar la secuencia actual
    botonValidar() {
        this.secuenciaValidada = true;
        this.temporizadorRonda.detener();

        const tiempoRestante = this.temporizadorRonda.tiempoRestante();
        this.ocultarDatos();
        this.esperando(tiempoRestante);
    }

    // Oculta elementos del DOM relacionados con la validación de la secuencia
    ocultarDatos() {
        document.getElementById('validarBtn').style.display = 'none';
        const mostrar = document.querySelectorAll('.mostrar');

        mostrar.forEach(element => {
            element.classList.toggle('disabled');
        });
    }

    // Controla la espera antes de validar la secuencia si queda tiempo
    esperando(tiempoRestante) {
        const esperando = document.getElementById("espera");
        const ESPERANDO_TEXTO = "Esperando";
        const IMAGEN_URL = "../../assets/img/iconos-desarrollo/loaderRonda.gif";
        esperando.textContent = "";

        if (tiempoRestante > 0) {
            const textoEsperando = document.createElement("h1");
            textoEsperando.className = "fontSalas";
            textoEsperando.textContent = ESPERANDO_TEXTO;
            esperando.appendChild(textoEsperando);

            // Crear la imagen y agregarla debajo del h1
            const imagen = document.createElement("img");
            imagen.src = IMAGEN_URL;
            imagen.alt = "Esperando";
            imagen.style.marginTop = "10px"; // Ajusta el espaciado entre el texto y la imagen
            esperando.appendChild(imagen);

            setTimeout(() => {
                this.ocultarDatos();
                this.ejecutarAccionesFinales();
            }, tiempoRestante * 1000);
        } else {
            this.ejecutarAccionesFinales();
        }
    }

    ejecutarAccionesFinales() {
        this.validarSecuencia();
        this.temporizadorRonda.detener();
    }

}


class SecuenciaVisual {
    constructor(secuencia, botonValidarCallback) {
        this.secuencia = secuencia; // Almacena la secuencia original
        this.sortable = null; // Inicializa la instancia de Sortable
        this.botonValidarCallback = botonValidarCallback; // Callback para validar la secuencia
    }

    // Muestra la secuencia original en el DOM
    mostrarSecuencia() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            secuenciaDom.innerHTML = '';

            this.secuencia.forEach((elemento) => {
                const div = document.createElement('div');
                div.classList.add('list-group-item', 'sortable-item');
                div.textContent = elemento;
                secuenciaDom.appendChild(div);
            });

            const validarBtn = document.getElementById('validarBtn');
            if (validarBtn) validarBtn.style.display = 'none';
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
        }
    }


    // Inicia un temporizador con un mensaje de "Memoriza"
    iniciarTemporizadorVisual(tiempoVisual, callback) {
        document.getElementById('titulo-tiempo').textContent = 'Memoriza';

        const { minutos = 0, segundos = 0 } = tiempoVisual;

        const temporizadorVisual = new Temporizador(minutos, segundos, callback);
        temporizadorVisual.iniciar();
    }

    // Oculta la secuencia en el DOM y la desordena
    ocultarSecuencia() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            secuenciaDom.style.display = 'none';
            this.desordenarSecuencia();
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
        }
    }

    // Desordena y muestra la secuencia desordenada en el DOM
    desordenarSecuencia() {
        const secuenciaDesordenada = this.desordenar([...this.secuencia]);
        this.mostrarSecuenciaEnDOM(secuenciaDesordenada);
        this.habilitarSortable();
    }

    // Muestra la secuencia desordenada en el DOM
    mostrarSecuenciaEnDOM(secuencia) {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            secuenciaDom.innerHTML = '';
            secuencia.forEach(num => {
                const item = document.createElement('div');
                item.classList.add('sortable-item'); // Aplica clase para manejo de arrastre
                item.textContent = num;
                secuenciaDom.appendChild(item);
            });
            secuenciaDom.style.display = 'flex';
            const validarBtn = document.getElementById('validarBtn');
            if (validarBtn) validarBtn.style.display = 'block';
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
        }
    }

    // Desordena una secuencia de manera aleatoria
    desordenar(secuencia) {
        return [...secuencia].sort(() => Math.random() - 0.5);
    }

    // Habilita la función de arrastrar y soltar en el DOM
    habilitarSortable() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            this.sortable = Sortable.create(secuenciaDom, {
                multiDrag: true,
                selectedClass: 'selected',
                fallbackTolerance: 3,
                animation: 150,
                
                onEnd: () => {
                    this.secuenciaDesordenada = Array.from(secuenciaDom.children).map(item => parseInt(item.textContent));
                }
            });

            // Asigna el callback al botón de validación
            const validarBtn = document.getElementById('validarBtn');
            if (validarBtn) validarBtn.onclick = this.botonValidarCallback; // Usar el callback
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
        }
    }

    // Obtiene la secuencia actual desde el DOM
    obtenerSecuenciaDelDOM() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            return Array.from(secuenciaDom.children).map(item => item.textContent.trim());
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
            return [];
        }
    }

    // Formatea la secuencia desordenada a números si corresponde
    formatearSecuencia(secuenciaDesordenada) {
        return secuenciaDesordenada.map(item => {
            return !isNaN(item) ? parseFloat(item) : item.trim();
        });
    }

}

class HistorialPuntuaciones {
    constructor() {
        this.historialCorrectas = []; // Array de respuestas correctas por ronda
        this.historialIncorrectas = []; // Array de respuestas incorrectas por ronda
        this.puntuacionesRonda = []; // Array de puntuaciones por ronda
        this.puntuacionTotal = 0; // Puntuación total acumulada
    }


    actualizar(correctas, incorrectas, puntuacionRonda) {
        this.historialCorrectas.push(correctas); // Agrega respuestas correctas
        this.historialIncorrectas.push(incorrectas); // Agrega respuestas incorrectas
        this.puntuacionesRonda.push(puntuacionRonda); // Agrega puntuación de la ronda
        this.puntuacionTotal += puntuacionRonda; // Actualiza la puntuación total
    }


    mostrarHistorialCompleto() {
        // Desactiva elementos de la UI y muestra el historial completo
        document.getElementById("rondas").classList.add("disabled");
        document.getElementById("temporizador").classList.add("disabled");
        document.getElementById("ocultar-secuencia").classList.add("disabled");
        document.getElementById("ocultar").classList.add("ocultar");

        // Muestra la lista de puntuaciones en el DOM
        const resultadoDom = document.getElementById("historial");
        resultadoDom.innerHTML = `
            <div class="puntajes-container" id="puntajes-container">
                <h2>Puntajes finales</h2>
                <p>Puntuación total: ${this.puntuacionTotal.toFixed(2)}</p>
                <ul class="puntajes-lista">
                    ${this.puntuacionesRonda.map((puntuacion, ronda) => `
                        <li class="puntaje-item">
                            <span class="ronda">Ronda ${ronda + 1}:</span>
                            <span class="correctas">${this.historialCorrectas[ronda]} correctas,</span>
                            <span class="incorrectas">${this.historialIncorrectas[ronda]} incorrectas,</span>
                            <span class="puntuacion">${puntuacion.toFixed(2)} puntos,</span>
                        </li>
                    `).join("")}
                </ul>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-irPodio" id="btn-podio">Ver podio</button>
                </div>
            </div>
        `;
        resultadoDom.style.display = "block"; // Muestra el historial
        this.iniciarTemporizadorBoton(); // Inicia temporizador para el botón
    }

    // Configura temporizador de 5 segundos para simular clic en el botón
    iniciarTemporizadorBoton() {
        const botonPodio = document.getElementById("btn-podio");
        let temporizador = setTimeout(() => {
            botonPodio.click();
        }, 5000);

        // Detiene temporizador al hacer clic manualmente
        botonPodio.addEventListener("click", () => {
            clearTimeout(temporizador);
            document.getElementById("puntajes-container").classList.add("disabled");
            window.location.href = "../home.html";
        });
    }

}
