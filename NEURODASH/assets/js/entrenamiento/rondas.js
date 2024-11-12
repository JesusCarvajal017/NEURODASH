document.addEventListener('DOMContentLoaded', init);

function init() {
    cargarRondas()
        .then(rondas => {
            const juego = new Juego(rondas);
            juego.iniciarRonda();
        })
        .catch(error => console.error('Error en la carga de rondas:', error));
}

async function cargarRondas() {
    const response = await fetch('../../model/entrenamiento/cargar_rondas.php');
    if (!response.ok) throw new Error('Error al cargar las rondas');
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Datos de rondas inválidos');
    return data.map(r => new Ronda(r.id, r.tiempos, r.secuencia));
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
        this.indiceTiempo = 0;
    }

    iniciar() {
        if (this.intervalo) return;
        this.actualizarUI();

        this.intervalo = setInterval(() => {
            if (this.segundos > 0) {
                this.segundos--;
                this.indiceTiempo++;
                console.log(this.indiceTiempo);
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
        document.getElementById('minutos').textContent = String(this.minutos).padStart(2, '0');
        document.getElementById('segundos').textContent = String(this.segundos).padStart(2, '0');
    }
}


class Juego {
    constructor(rondas, puntosPorTermino = 10, bonificacionRapidez = 50) {
        this.rondas = rondas.map(r => new Ronda(r.id, r.tiempos, r.secuencia));
        this.indiceActual = 0;
        this.temporizadorVisual = null;
        this.temporizadorRonda = null;

        this.historialCorrectas = [];
        this.historialIncorrectas = [];
        this.tiemposSobrantes = [];
        this.puntuacionTotal = 0;
        this.puntosPorTermino = puntosPorTermino;
        this.bonificacionRapidez = bonificacionRapidez;
        this.secuenciaValidada = false;
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
        this.mostrarSecuencia(rondaActual.secuencia);
        this.iniciarTemporizadorVisual(rondaActual.tiempos.tiempoVisual);
    }

    mostrarRonda(ronda) {
        document.getElementById('ronda').textContent = `Ronda ${ronda.id}`;
    }

    mostrarSecuencia(secuencia) {
        const secuenciaDom = document.getElementById('secuencia');
        secuenciaDom.innerHTML = '';

        secuencia.forEach((elemento) => {
            const div = document.createElement('div');
            div.classList.add('list-group-item', 'sortable-item');
            div.textContent = elemento;
            secuenciaDom.appendChild(div);
        });
        this.ocultarMensajes();
    }

    ocultarMensajes() {
        document.getElementById('mensaje').style.display = 'none';
        document.getElementById('validarBtn').style.display = 'none';
    }

    iniciarTemporizadorVisual(tiempoVisual) {
        document.getElementById('titulo-tiempo').textContent = 'Memoriza';

        const { minutos = 0, segundos = 0 } = tiempoVisual;

        this.temporizadorVisual = new Temporizador(minutos, segundos, () => {
            this.ocultarSecuencia();
            this.iniciarTemporizadorRonda(this.rondas[this.indiceActual].tiempos.tiempoRonda);
        });

        this.temporizadorVisual.iniciar();
    }

    ocultarSecuencia() {
        document.getElementById('secuencia').style.display = 'none';
        this.desordenarSecuencia();
    }

    desordenarSecuencia() {
        const secuenciaDesordenada = this.desordenar([...this.rondas[this.indiceActual].secuencia]);
        this.mostrarSecuenciaEnDOM(secuenciaDesordenada);
        this.habilitarSortable();
    }

    mostrarSecuenciaEnDOM(secuencia) {
        const secuenciaDom = document.getElementById('secuencia');
        secuenciaDom.innerHTML = '';
        secuencia.forEach(num => {
            const item = document.createElement('div');
            item.classList.add('sortable-item');
            item.textContent = num;
            secuenciaDom.appendChild(item);
        });
        secuenciaDom.style.display = 'flex';
        document.getElementById('validarBtn').style.display = 'block';
    }

    desordenar(secuencia) {
        return [...secuencia].sort(() => Math.random() - 0.5);
    }

    habilitarSortable() {
        const secuenciaDom = document.getElementById('secuencia');
        this.sortable = Sortable.create(secuenciaDom, {
            animation: 150,
            onEnd: () => {
                this.secuenciaDesordenada = Array.from(secuenciaDom.children).map(item => parseInt(item.textContent));
            }
        });

        document.getElementById('validarBtn').onclick = () => this.botonValidar();
    }



    botonValidar() {
        this.secuenciaValidada = true;
        this.temporizadorRonda.detener();

        let tiempoRestante = this.temporizadorRonda.minutos * 60 + this.temporizadorRonda.segundos;

        this.ocultarDatos();
        this.esperando(tiempoRestante);
    }

    iniciarTemporizadorRonda(tiempoRonda) {
        document.getElementById('titulo-tiempo').textContent = 'Lo recuerdas';
        this.secuenciaValidada = false;

        this.temporizadorRonda = new Temporizador(tiempoRonda.minutos, tiempoRonda.segundos, () => {
            this.ocultarBotonValidar(); // Ocultar el botón de validar
            if (!this.secuenciaValidada) {
                this.validarSecuencia();
                this.indiceActual++;
                setTimeout(() => this.iniciarRonda(), 2000);
            }
        });
        this.temporizadorRonda.iniciar();
    }

    ocultarBotonValidar() {
        document.getElementById('validarBtn').style.display = 'none';
    }

    validarSecuencia() {
        const secuenciaActual = this.rondas[this.indiceActual].secuencia;
        const secuenciaDesordenada = this.obtenerSecuenciaDelDOM();
        const secuenciaFormateada = this.formatearSecuencia(secuenciaDesordenada);

        const { correctas, incorrectas } = this.compararSecuencias(secuenciaFormateada, secuenciaActual);

        const tiempoRespuesta = this.temporizadorRonda.minutos * 60 + this.temporizadorRonda.segundos;
        const tiempoMaximo = this.rondas[this.indiceActual].tiempos.tiempoRonda.minutos * 60 + this.rondas[this.indiceActual].tiempos.tiempoRonda.segundos;

        // Si el tiempo se ha agotado, la puntuación de la ronda es 0
        let puntuacionRonda = 0;

        if (tiempoRespuesta > 0) {
            // Calcular la puntuación solo si el tiempo no se ha agotado
            const factorRapidez = tiempoRespuesta / tiempoMaximo;
            puntuacionRonda = (correctas * this.puntosPorTermino) + (factorRapidez * this.bonificacionRapidez);
            console.log(`Tiempo máximo: ${tiempoMaximo}, Tiempo de respuesta: ${tiempoRespuesta}, Factor de rapidez: ${factorRapidez}, Puntuación: ${puntuacionRonda}`);
        }

        // Ocultar el botón de validar si el tiempo se ha agotado
        this.ocultarBotonValidar();

        alert(`Ronda ${this.indiceActual + 1} finalizada. Puntuación de esta ronda: ${puntuacionRonda.toFixed(2)} puntos.`);

        this.actualizarHistorial(correctas, incorrectas);
        this.mostrarMensajeResultado(correctas, secuenciaActual.length);
        this.sortable.destroy();
    }




    obtenerSecuenciaDelDOM() {
        return Array.from(document.getElementById('secuencia').children)
            .map(item => item.textContent.trim());
    }

    formatearSecuencia(secuenciaDesordenada) {
        const esSecuenciaNumerica = secuenciaDesordenada.every(item => !isNaN(item) && item.trim() !== '');
        return esSecuenciaNumerica
            ? secuenciaDesordenada.map(item => parseFloat(item))
            : secuenciaDesordenada;
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

    actualizarHistorial(correctas, incorrectas) {
        this.historialCorrectas.push(correctas);
        this.historialIncorrectas.push(incorrectas);
        const tiempoRestante = this.temporizadorRonda.minutos * 60 + this.temporizadorRonda.segundos;
        this.tiemposSobrantes.push(tiempoRestante);
    }

    mostrarMensajeResultado(correctas, longitudSecuencia) {
        document.getElementById('mensaje').textContent =
            correctas === longitudSecuencia
                ? '¡Secuencia correcta!'
                : 'Algunas posiciones son incorrectas.';
    }

    mostrarHistorialCompleto() {
        alert('¡Juego finalizado! Puntajes finales:');
        this.ocultarDatos();
        document.getElementById('ocultar').classList.add('ocultar');

        const resultadoDom = document.getElementById('historial');
        resultadoDom.innerHTML = `
        <div class="puntajes-container">
          <h2>Puntajes finales</h2>
          <p>Puntuación total: ${this.puntuacionTotal.toFixed(2)}</p>
          <ul class="puntajes-lista">
            ${this.historialCorrectas.map((puntos, ronda) => `
              <li class="puntaje-item">
                <span class="ronda">Ronda ${ronda + 1}:</span>
                <span class="correctas"> ${puntos} correctas,</span>
                <span class="incorrectas"> ${this.historialIncorrectas[ronda]} incorrectas,</span>
                <span class="tiempo"> ${this.tiemposSobrantes[ronda]} segundos sobrantes,</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
        resultadoDom.style.display = 'block';
    }

    finalizarJuego() {
        this.mostrarHistorialCompleto();
    }

    ocultarDatos() {
        document.getElementById('validarBtn').style.display = 'none';
        const mostrar = document.querySelectorAll('.mostrar');

        mostrar.forEach(element => {
            element.classList.toggle('disabled');
        });
    }

    esperando(tiempoRestante) {
        if (tiempoRestante === 0) {
            this.validarSecuencia();
            this.temporizadorRonda.detener();
            this.indiceActual++;
            setTimeout(() => this.iniciarRonda(), 2000);
        } else {
            setTimeout(() => {
                this.ocultarDatos();
                this.validarSecuencia();
                this.temporizadorRonda.detener();
                this.indiceActual++;
                setTimeout(() => this.iniciarRonda(), 2000);
            }, tiempoRestante * 1000);
        }
    }
}

