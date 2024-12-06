import DataExtraction from "../../assets/js/global/peticiones.js";

let data_sys = new DataExtraction();

const urlParams = new URLSearchParams(window.location.search);
const currentRoom = urlParams.get('room');

let data_user = await data_sys.receptorData('../../processes/user/allinfo.php');

// Obtener el nombre del usuario y su avatar desde el archivo PHP
const username = data_user[0].user_name;
const avatarPath = data_user[0].img_avatar; // La ruta relativa del avatar en el JSON
const avatarUrl = `../../${avatarPath}`; // Concatenar la ruta base con la ruta relativa del avatar

// Mostrar información de la sala y el usuario
document.getElementById('room-info').innerHTML = `🏠 Sala: <strong>${currentRoom}</strong> | 👤 Usuario: <strong>${username}</strong>`;

// Crear WebSocket
const socket = new WebSocket('ws://localhost:8080');

socket.onopen = function () {
    socket.send(JSON.stringify({
        type: 'join',
        room: currentRoom,
        username: username
    }));
};

socket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    if (data.type === 'message') {
        const isReceived = data.username !== username;
        createMessageElement(data, isReceived);
    }
};

document.getElementById('send-message').addEventListener('click', function () {
    const message = document.getElementById('message-input').value;
    if (message) {
        const messageData = {
            type: 'message',
            room: currentRoom,
            username: username,
            message: message,
            avatarUrl: avatarUrl
        };

        createMessageElement(messageData, false); // Mostrar el mensaje enviado
        socket.send(JSON.stringify(messageData)); // Enviar el mensaje al servidor
        document.getElementById('message-input').value = '';
    }
});

document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('send-message').click();
    }
});

function createMessageElement(data, isReceived) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isReceived ? 'received' : 'sent');

    // Agregar avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = data.avatarUrl || avatarUrl;
    avatarImg.classList.add('avatar');

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Nombre de usuario
    const usernameSpan = document.createElement('div');
    usernameSpan.classList.add('username');
    usernameSpan.textContent = isReceived ? data.username : 'Tú';

    // Mensaje
    const messageTextSpan = document.createElement('div');
    messageTextSpan.classList.add('message-text');
    messageTextSpan.textContent = data.message;

        // Agregar nombre y mensaje al contenedor de texto
    textContainer.appendChild(usernameSpan);
    textContainer.appendChild(messageTextSpan);
    

    // Ordenar los elementos
    if (isReceived) {
        messageDiv.appendChild(avatarImg);
        messageDiv.appendChild(textContainer);
    } else {
        messageDiv.appendChild(textContainer);
        messageDiv.appendChild(avatarImg);
    }



    // Agregar mensaje al contenedor
    const mensajesDiv = document.getElementById('mensajes-div');
    mensajesDiv.appendChild(messageDiv);
    mensajesDiv.scrollTop = mensajesDiv.scrollHeight;
}
