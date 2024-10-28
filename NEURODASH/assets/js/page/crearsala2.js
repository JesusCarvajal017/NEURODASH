// chat

const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

function enviarMensaje() {
    const mensaje = chatInput.value.trim();
    if (mensaje !== "") {
        addMensaje(mensaje, 'usuario');
        chatInput.value = '';
    }
}

chatInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviarMensaje();
    }
});

function addMensaje(mensaje, enviando) {
    const mensajeElemento = document.createElement('div');
    mensajeElemento.classList.add('chat-message'); 

    const avatar = enviando === 'usuario' ? 'avatar1.png' : 'avatar2.png';

    mensajeElemento.innerHTML = `
        <img src="${avatar}" alt="Avatar" class="avatar">
        <div>
            <span class="username">${enviando}</span>
            <span class="message-text">${mensaje}</span>
        </div>
    `;
    chatBox.appendChild(mensajeElemento);
    chatBox.scrollTop = chatBox.scrollHeight;
}
// cambiar fondo
const tabla = document.getElementById('usuariosTabla');

function crearTablaUsuarios() {
    const usuarios = [
        { avatar: '../../assets/img/iconos/albert.png', nombre: 'Andres' },
        { avatar: '../../assets/img/iconos/albert.png', nombre: 'Juan' },
        { avatar: '../../assets/img/iconos/albert.png', nombre: 'Charry' },
        { avatar: '../../assets/img/iconos/albert.png', nombre: 'Maria' },
        { avatar: '../../assets/img/iconos/albert.png', nombre: 'Johan' },
    ];

    const tbody = document.querySelector(' tbody');

    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${usuario.avatar}" alt="Avatar" width="50px"></td>
            <td>${usuario.nombre}</td>
        `;
        tbody.appendChild(fila);
        tbody.scrollTop = tbody.scrollHeight;
    });
    
}

crearTablaUsuarios();


    // Función para cambiar la clase de fondo
    function cambiarFondo(clase) {
        // Elimina las clases de fondo anteriores
        document.body.classList.remove("background-terminos", "background-numeros", "background-imagenes");

        // Agrega la nueva clase de fondo
        document.body.classList.add(clase);
    }

    // Cambiar fondo para el primer modo de juego
    document.getElementById("fondo2").onclick = function (event) {
        event.preventDefault(); 
        cambiarFondo("background-terminos");
    }

    document.getElementById("fondo3").onclick = function (event) {
        event.preventDefault(); 
        cambiarFondo("background-numeros");
    },


    document.getElementById("fondo4").onclick = function (event) {
        event.preventDefault(); 
        cambiarFondo("background-imagenes");
    }

    const cantidadInput = document.getElementById("cantidadInput");
    const actualizarCantidadBtn = document.getElementById("actualizarCantidad");
    const cantidadJugadoresDiv = document.querySelector(".cantidad-jugadores");
    const incrementarBtn = document.getElementById("incrementar");
    const decrementarBtn = document.getElementById("decrementar");
    

    const actualizarCantidad = () => {
        const cantidadJugadores = parseInt(cantidadInput.value);
        if (cantidadJugadores < 1 || cantidadJugadores > 24) {
            alert("Por favor, selecciona un número entre 1 y 24.");
        } else {
            cantidadJugadoresDiv.textContent = `${cantidadJugadores} Jugadores`;
        }
    };
    

    actualizarCantidadBtn.onclick = actualizarCantidad;
    

    incrementarBtn.onclick = () => {
        let cantidadJugadores = parseInt(cantidadInput.value);
        if (cantidadJugadores < 24) {
            cantidadInput.value = cantidadJugadores + 1;
        }
    };
    
    decrementarBtn.onclick = () => {
        let cantidadJugadores = parseInt(cantidadInput.value);
        if (cantidadJugadores > 1) {
            cantidadInput.value = cantidadJugadores - 1;
        }
    };
    
    cantidadInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            actualizarCantidad();
        }
    });
    