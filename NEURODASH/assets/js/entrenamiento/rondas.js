window.addEventListener('load', () => {
    let rondas = [];

    fetch('../../model/entrenamiento/cargar_rondas.php')
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar las rondas');
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Datos de rondas inválidos');
            rondas = data;
            const juego = new Juego(rondas);
            juego.iniciarRonda();
        })
        .catch(error => console.error('Error en la carga de rondas:', error));
});

class Temporizador {
    constructor(minutos, segundos, callback) {
        this.minutos = minutos;
        this.segundos = segundos;
        this.callback = callback;
        this.intervalo = null;
    }

    iniciar() {
        if (this.intervalo) return;
        this.actualizarUI();

        this.intervalo = setInterval(() => {
            if (this.segundos > 0) {
                this.segundos--;
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
    constructor(rondas) {
        this.rondas = rondas.map(r => new Ronda(r.id, r.tiempos, r.secuencia));
        this.indiceActual = 0;
        this.temporizadorVisual = null;
        this.temporizadorRonda = null;

        this.historialCorrectas = [];
        this.historialIncorrectas = [];
        this.tiemposSobrantes = [];
    }


    iniciarRonda() {
        if (this.indiceActual >= this.rondas.length) {
            this.finalizarJuego();
            return;
        }

        const rondaActual = this.rondas[this.indiceActual];
        document.getElementById('ronda').textContent = `Ronda ${rondaActual.id}`;
        this.mostrarSecuencia(rondaActual.secuencia);
        this.iniciarTemporizadorVisual(rondaActual.tiempos.tiempoVisual);
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

        document.getElementById('mensaje').style.display = 'none';
        document.getElementById('validarBtn').style.display = 'none';
    }

    iniciarTemporizadorVisual(tiempoVisual) {
        document.getElementById('titulo-tiempo').textContent = 'Memoriza';

        const minutos = tiempoVisual.minutos || 0;
        const segundos = tiempoVisual.segundos || 0;

        if (this.temporizadorVisual) {
            this.temporizadorVisual.detener();
        }

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
        const secuenciaDom = document.getElementById('secuencia');
        secuenciaDom.innerHTML = '';

        secuenciaDesordenada.forEach(num => {
            const item = document.createElement('div');
            item.classList.add('sortable-item');
            item.textContent = num;
            secuenciaDom.appendChild(item);
        });

        secuenciaDom.style.display = 'flex';
        this.habilitarSortable();
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

        // este evento nos permite validar la secuencia cuando se le da click  al botón y por medio de la bandera secuenciaValidada sabemos si el boton a sido precionado o no
        document.getElementById('validarBtn').onclick = () => {
            if (!this.secuenciaValidada) {
                this.secuenciaValidada = true;
                this.validarSecuencia();
                this.temporizadorRonda.detener();
                this.indiceActual++;
                setTimeout(() => this.iniciarRonda(), 2000);
            }
        };
    }

    iniciarTemporizadorRonda(tiempoRonda) {
        document.getElementById('titulo-tiempo').textContent = 'Lo recuerdas';
        this.secuenciaValidada = false;

        this.temporizadorRonda = new Temporizador(tiempoRonda.minutos, tiempoRonda.segundos, () => {
            if (!this.secuenciaValidada) {
                this.validarSecuencia();
                this.indiceActual++;
                setTimeout(() => this.iniciarRonda(), 2000);
            }
        });
        this.temporizadorRonda.iniciar();
    }


    validarSecuencia() {
        const secuenciaActual = this.rondas[this.indiceActual].secuencia;
        const secuenciaDesordenada = Array.from(document.getElementById('secuencia').children)
            .map(item => item.textContent.trim());

        const esSecuenciaNumerica = secuenciaDesordenada.every(item => !isNaN(item) && item.trim() !== '');
        const secuenciaFormateada = esSecuenciaNumerica
            ? secuenciaDesordenada.map(item => parseFloat(item))
            : secuenciaDesordenada;

        const secuenciaDom = document.getElementById('secuencia');
        let correctas = 0;
        let incorrectas = 0;

        //? investigar 
        secuenciaDom.childNodes.forEach((item, index) => {
            if (secuenciaFormateada[index] === secuenciaActual[index]) {
                item.classList.add('correct');
                correctas++;
            } else {
                item.classList.add('incorrect');
                incorrectas++;
            }
        });

        this.historialCorrectas.push(correctas);
        this.historialIncorrectas.push(incorrectas);
        const tiempoRestante = this.temporizadorRonda.minutos * 60 + this.temporizadorRonda.segundos;
        this.tiemposSobrantes.push(tiempoRestante);

        document.getElementById('mensaje').textContent = correctas === secuenciaActual.length
            ? '¡Secuencia correcta!' : 'Algunas posiciones son incorrectas.';
        this.mostrarResultadosRonda(correctas, incorrectas, tiempoRestante);
        this.sortable.destroy();
    }

    mostrarResultadosRonda(correctas, incorrectas, tiempoRestante) {
        alert(`
            Respuestas correctas: ${correctas}
            Respuestas incorrectas: ${incorrectas}
            Tiempo restante: ${Math.floor(tiempoRestante / 60)}:${String(tiempoRestante % 60).padStart(2, '0')}
        `);
    }

    mostrarHistorialCompleto() {
        alert('¡Juego finalizado! Puntajes finales:');

        document.querySelectorAll('.mostrar').forEach(element => {
            element.classList.remove('centrar');
            element.classList.add('ocultar');
        });

        const resultadoDom = document.getElementById('historial');
        resultadoDom.innerHTML = `
            <h2>Puntajes finales</h2>
            <ul>
                ${this.historialCorrectas.map((puntos, ronda) => `
                    <li>Ronda ${ronda + 1}: ${puntos} correctas, ${this.historialIncorrectas[ronda]} incorrectas, ${this.tiemposSobrantes[ronda]} segundos sobrantes</li>
                `).join('')}
            </ul>
        `;
        resultadoDom.style.display = 'block';
    }

    finalizarJuego() {
        console.log("Juego finalizado");
        document.getElementById('mensaje').textContent = '¡Juego terminado!';
        document.getElementById('mensaje').style.display = 'block';
        this.mostrarHistorialCompleto();
    }
}

class Ronda {
    constructor(id, tiempos, secuencia) {
        this.id = id;
        this.tiempos = tiempos;
        this.secuencia = secuencia;
    }
}
