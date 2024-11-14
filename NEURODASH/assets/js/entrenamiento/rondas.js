window.addEventListener("load", init);
function init() {
    cargarRondas()
        .then((rondas) => {
            const juego = new Juego(rondas);
            juego.iniciarRonda();
        })
        .catch((error) => console.error("Error en la carga de rondas:", error));
}
async function cargarRondas() {
    const response = await fetch("../../model/entrenamiento/cargar_rondas.php");
    if (!response.ok) throw new Error("Error al cargar las rondas");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Datos de rondas inválidos");
    return data.map((r) => new Ronda(r.id, r.tiempos, r.secuencia));
}
class Ronda {
    constructor(id, tiempos, secuencia) {
        this.id = id;
        this.tiempos = tiempos;
        this.secuencia = secuencia;
    }
}

class Temporizador {
    constructor(minutos, segundos, callback) {
        this.minutos = minutos;
        this.segundos = segundos;
        this.callback = callback;
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
                // console.log(this.tiempoTMP);

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

        if (this.minutos === 0 && this.segundos === 0) {
            this.detener();
            if (this.callback) this.callback();
        }
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

    iniciarJuego() {
        this.iniciarRonda();
    }
    iniciarJuego() {
        this.iniciarRonda();
    }

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

    mostrarRonda(ronda) {
        document.getElementById('ronda').textContent = `Ronda ${ronda.id}`;
    }

    iniciarTemporizadorRonda(tiempoRonda) {
        document.getElementById('titulo-tiempo').textContent = 'Lo recuerdas';
        this.secuenciaValidada = false;

        this.temporizadorRonda = new Temporizador(tiempoRonda.minutos, tiempoRonda.segundos, () => {
            this.ocultarBotonValidar();
            if (!this.secuenciaValidada) {
                this.validarSecuencia();
            }
        });
        this.temporizadorRonda.iniciar();
    }

    ocultarBotonValidar() {
        document.getElementById('validarBtn').style.display = 'none';
    }
    ocultarBotonValidar() {
        document.getElementById('validarBtn').style.display = 'none';
    }

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

    handleValidSequence(secuenciaFormateada, secuenciaActual, rondaActual) {
        const resultado = this.compararSecuencias(secuenciaFormateada, secuenciaActual);
        return {
            correctas: resultado.correctas,
            incorrectas: resultado.incorrectas,
            puntuacionRonda: this.calcularPuntuacion(resultado.correctas, rondaActual.tiempos.tiempoRonda),
            tiempoRestante: this.temporizadorRonda.tiempoRestante()
        };
    }

    updateDOMResults(correctas, incorrectas, puntuacionRonda) {
        document.getElementById('aciertos').textContent = `Aciertos: ${correctas}`;
        document.getElementById('fallos').textContent = `Fallos: ${incorrectas}`;
        document.getElementById('tiempo-restante').textContent = `puntuación: ${puntuacionRonda.toFixed(2)}`;
    }

    showScoreSection() {
        const puntuacionElem = document.getElementById('puntuacion');
        puntuacionElem.classList.remove('disabled');
        document.getElementById("rondas").classList.add("disabled");
        document.getElementById("temporizador").classList.add("disabled");
        document.getElementById("ocultar-secuencia").classList.add("disabled");
    }

    hideScoreSection() {
        const puntuacionElem = document.getElementById('puntuacion');
        puntuacionElem.classList.add('disabled');
        document.getElementById("rondas").classList.remove("disabled");
        document.getElementById("temporizador").classList.remove("disabled");
        document.getElementById("ocultar-secuencia").classList.remove("disabled");
    }


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

    calcularPuntuacion(correctas, tiemposRonda) {
        const tiempoMaximo = tiemposRonda.minutos * 60 + tiemposRonda.segundos;
        const tiempoUsado = this.temporizadorRonda.tiempoTMP;

        const factorRapidez = (tiempoMaximo - tiempoUsado) / tiempoMaximo;

        console.log(`Tiempo usado: ${tiempoUsado}, Factor rapidez: ${factorRapidez}`);

        if (isNaN(factorRapidez) || factorRapidez === Infinity) {
            return correctas * this.puntosPorTermino;
        }

        let puntuacion = correctas * this.puntosPorTermino;

        if (correctas > 0) {
            puntuacion += factorRapidez * this.bonificacionRapidez;
        }

        console.log(`Respuestas correctas: ${correctas}, Puntuación: ${puntuacion.toFixed(2)}`);

        return puntuacion;
    }

    finalizarJuego() {
        this.historial.mostrarHistorialCompleto();
    }

    botonValidar() {
        this.secuenciaValidada = true;
        this.temporizadorRonda.detener();

        const tiempoRestante = this.temporizadorRonda.tiempoRestante();
        this.ocultarDatos();
        this.esperando(tiempoRestante);
    }

    ocultarDatos() {
        document.getElementById('validarBtn').style.display = 'none';
        const mostrar = document.querySelectorAll('.mostrar');

        mostrar.forEach(element => {
            element.classList.toggle('disabled');
        });
    }

    esperando(tiempoRestante) {
        let esperando = document.getElementById("espera")
        esperando.textContent = "";
        if (tiempoRestante === 0) {
            esperando.textContent = "";
            this.validarSecuencia();
            this.temporizadorRonda.detener();
        } else {
            esperando.textContent = "Esperando"
            setTimeout(() => {
                this.ocultarDatos();
                this.validarSecuencia();
                this.temporizadorRonda.detener();
            }, tiempoRestante * 1000);
        }
    }
}


class SecuenciaVisual {
    constructor(secuencia, botonValidarCallback) {
        this.secuencia = secuencia;
        this.sortable = null;
        this.botonValidarCallback = botonValidarCallback; // Recibir callback
    }

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

    iniciarTemporizadorVisual(tiempoVisual, callback) {
        document.getElementById('titulo-tiempo').textContent = 'Memoriza';

        const { minutos = 0, segundos = 0 } = tiempoVisual;

        const temporizadorVisual = new Temporizador(minutos, segundos, callback);
        temporizadorVisual.iniciar();
    }

    ocultarSecuencia() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            secuenciaDom.style.display = 'none';
            this.desordenarSecuencia();
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
        }
    }

    desordenarSecuencia() {
        const secuenciaDesordenada = this.desordenar([...this.secuencia]);
        this.mostrarSecuenciaEnDOM(secuenciaDesordenada);
        this.habilitarSortable();
    }

    mostrarSecuenciaEnDOM(secuencia) {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            secuenciaDom.innerHTML = '';
            secuencia.forEach(num => {
                const item = document.createElement('div');
                item.classList.add('sortable-item');
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

    desordenar(secuencia) {
        return [...secuencia].sort(() => Math.random() - 0.5);
    }

    habilitarSortable() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            this.sortable = Sortable.create(secuenciaDom, {
                animation: 150,
                onEnd: () => {
                    this.secuenciaDesordenada = Array.from(secuenciaDom.children).map(item => parseInt(item.textContent));
                }
            });

            const validarBtn = document.getElementById('validarBtn');
            if (validarBtn) validarBtn.onclick = this.botonValidarCallback; // Usar el callback
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
        }
    }

    obtenerSecuenciaDelDOM() {
        const secuenciaDom = document.getElementById('secuencia');
        if (secuenciaDom) {
            return Array.from(secuenciaDom.children).map(item => item.textContent.trim());
        } else {
            console.error('Elemento DOM "secuencia" no encontrado');
            return [];
        }
    }

    formatearSecuencia(secuenciaDesordenada) {
        const esSecuenciaNumerica = secuenciaDesordenada.every(item => !isNaN(item) && item.trim() !== '');
        return esSecuenciaNumerica
            ? secuenciaDesordenada.map(item => parseFloat(item))
            : secuenciaDesordenada;
    }
}

class HistorialPuntuaciones {
    constructor() {
        this.historialCorrectas = [];
        this.historialIncorrectas = [];
        this.puntuacionesRonda = [];
        this.puntuacionTotal = 0;
    }

    actualizar(correctas, incorrectas, puntuacionRonda) {
        this.historialCorrectas.push(correctas);
        this.historialIncorrectas.push(incorrectas);
        this.puntuacionesRonda.push(puntuacionRonda);
        this.puntuacionTotal += puntuacionRonda;
    }

    mostrarHistorialCompleto() {
        document.getElementById("rondas").classList.add("disabled");
        document.getElementById("temporizador").classList.add("disabled");
        document.getElementById("ocultar-secuencia").classList.add("disabled");
        document.getElementById("ocultar").classList.add("ocultar");

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
                    <button class="btn btn-primary" id="btn-podio">Hola</button>
                </div>
            </div>
        `;
        resultadoDom.style.display = "block";
        this.iniciarTemporizadorBoton();
    }

    iniciarTemporizadorBoton() {
        const botonPodio = document.getElementById("btn-podio");
        let temporizador = setTimeout(() => {
            botonPodio.click();
        }, 5000);

        botonPodio.addEventListener("click", () => {
            clearTimeout(temporizador);
            document.getElementById("puntajes-container").classList.add("disabled");
            this.mostrarPodio();
        });
    }

    async mostrarPodio() {
        try {
            const jugadores = await this.obtenerJugadores();

            if (jugadores.length < 3) {
                throw new Error('No se encontraron suficientes jugadores en la base de datos');
            }

            const [podio1, podio2, podio3] = this.obtenerElementosPodio();
            // console.log('Elementos del podio:', podio1, podio2, podio3);
            this.actualizarPodio([podio2, podio1, podio3], jugadores.slice(0, 3));
        } catch (error) {
            console.error('Error al mostrar el podio:', error);
        }
    }

    async obtenerJugadores() {
        const response = await fetch('../../model/entrenamiento/jugadores.php');
        if (!response.ok) {
            throw new Error('Error al obtener los datos de los jugadores');
        }
        const datos = await response.json();
        // console.log('Datos de jugadores:', datos);
        return datos;
    }

    obtenerElementosPodio() {
        const podio1 = document.querySelector('.podio1');
        const podio2 = document.querySelector('.podio2');
        const podio3 = document.querySelector('.podio3');

        if (!podio1 || !podio2 || !podio3) {
            throw new Error('No se encontraron los elementos del podio en el DOM');
        }

        return [podio1, podio2, podio3];
    }

    actualizarPodio(podios, jugadores) {
        document.getElementById("container-podio").classList.remove("disabled");
        console.log('Actualizando podio con jugadores:', jugadores);
        podios.forEach((podio, index) => {
            const jugador = jugadores[index];
            // console.log('Actualizando podio:', podio, 'con jugador:', jugador);
            const nombreJugador = podio.querySelector('.nombre-Jugador');
            const puntuacionJugador = podio.querySelector('.punText');

            if (nombreJugador) {
                nombreJugador.textContent = jugador.nombre;
                // console.log(`Nombre actualizado: ${jugador.nombre}`);
            } else {
                console.log('No se encontró el elemento .nombre-Jugador');
            }

            if (puntuacionJugador) {
                puntuacionJugador.textContent = `Puntuación: ${jugador.puntuacion}`;
                // console.log(`Puntuación actualizada: ${jugador.puntuacion}`);
            } else {
                console.log('No se encontró el elemento .punText');
            }
        });
    }
}
