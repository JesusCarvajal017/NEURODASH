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

    const avatar = enviando === 'usuario' ? '../../assets/img/iconos/perfil.png' : '../../assets/img/iconos/perfil.png';

    mensajeElemento.innerHTML = `
        <img src="../../assets/img/iconos/perfil.png" alt="Avatar" class="avatar">
                <span class="username">${enviando}</span>
        <div class="comentario">
        <span class="message-text">${mensaje}</span>
        </div>
    `;
    chatBox.appendChild(mensajeElemento);
    chatBox.scrollTop = chatBox.scrollHeight;
}
// cambiar fondo
// const tabla = document.getElementById('usuariosTabla');

// function crearTablaUsuarios() {
//     const usuarios = [
//         { avatar: '../../assets/img/iconos/albert.png', nombre: 'Andres' },
//         { avatar: '../../assets/img/iconos/albert.png', nombre: 'Juan' },
//         { avatar: '../../assets/img/iconos/albert.png', nombre: 'Charry' },
//         { avatar: '../../assets/img/iconos/albert.png', nombre: 'Maria' },
//         { avatar: '../../assets/img/iconos/albert.png', nombre: 'Johan' },
//     ];

//     const tbody = document.querySelector(' tbody');

//     usuarios.forEach(usuario => {
//         const fila = document.createElement('tr');
//         fila.innerHTML = `
//             <td><img src="${usuario.avatar}" alt="Avatar" width="50px"></td>
//             <td>${usuario.nombre}</td>
//         `;
//         tbody.appendChild(fila);
//         tbody.scrollTop = tbody.scrollHeight;
//     });
    
// }

// crearTablaUsuarios();


// function toggleDropdown() {
//     const dropdownContent = document.getElementById("dropdown-content");
//     dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
// }

// function changeBackground(backgroundClass, difficultyClass) {
//     document.body.className = backgroundClass;
//     const overlay = document.getElementById("overlay");
//     overlay.className = `overlay ${difficultyClass}`;
//     toggleDropdown(); 
// }


// window.onclick = function(event) {
//     if (!event.target.matches('.dropdown button')) {
//         const dropdownContent = document.getElementById("dropdown-content");
//         if (dropdownContent.style.display === "block") {
//             dropdownContent.style.display = "none";
//         }
//     }
// }




// const cantidadInput = document.getElementById("cantidadInput");
// const actualizarCantidadBtn = document.getElementById("actualizarCantidad");
// const cantidadJugadoresDiv = document.querySelector(".cantidad-jugadores");
// const incrementarBtn = document.getElementById("incrementar");
// const decrementarBtn = document.getElementById("decrementar");
    
// const actualizarCantidad = () => {
//     const cantidadJugadores = parseInt(cantidadInput.value);
//     if (cantidadJugadores < 1 || cantidadJugadores > 24) {
//         alert("Por favor, selecciona un número entre 1 y 24.");
//     } else {
//         cantidadJugadoresDiv.textContent = `${cantidadJugadores} Jugadores`;
//     }
// };
    
// actualizarCantidadBtn.onclick = actualizarCantidad;
    

// incrementarBtn.onclick = () => {
//     let cantidadJugadores = parseInt(cantidadInput.value);
//     if (cantidadJugadores < 24) {
//         cantidadInput.value = cantidadJugadores + 1;
//     }
// };
    
// decrementarBtn.onclick = () => {
//     let cantidadJugadores = parseInt(cantidadInput.value);
//     if (cantidadJugadores > 1) {
//         cantidadInput.value = cantidadJugadores - 1;
//     }
// };
    
// cantidadInput.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//         actualizarCantidad();
//     }
// });

// token
const btnToken = document.getElementById('token');
btnToken.addEventListener('click', function(){
    alert('token copiado')
})



const chatBox2 = document.getElementById('chat-box2');
const chatInput2 = document.getElementById('chat-input2');

function enviarMensaje2() {
    const mensaje2 = chatInput2.value.trim();
    if (mensaje2 !== "") {
        addMensaje2(mensaje2, 'usuario2');
        chatInput2.value = '';
    }
}

chatInput2.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        enviarMensaje2();
    }
});

function addMensaje2(mensaje2, usuario2) {
    const mensajeElemento2 = document.createElement('div');
    mensajeElemento2.classList.add('chat-message2'); 

    const avatar = usuario2 === 'usuario' ? '../../assets/img/iconos/perfil.png' : '../../assets/img/iconos/perfil.png';

    mensajeElemento2.innerHTML = `
        <img src="${avatar}" alt="Avatar" class="avatar">
        <span class="username2">${usuario2}</span>
        <div class="comentario2">
            <span class="message-text2">${mensaje2}</span>
        </div>
    `;
    chatBox2.appendChild(mensajeElemento2);
    chatBox2.scrollTop = chatBox2.scrollHeight;
}

// menú-desplegable
function toggleMenu() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}
