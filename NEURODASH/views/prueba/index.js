fetch('index.php')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('avatars-container');
    data.forEach(avatar => {
        // console.log(avatar.img_avatar)
        // Crear un div para cada avatar con la imagen de fondo
        const avatarDiv = document.createElement('img');
        avatarDiv.className = 'avatar';
        avatarDiv.style.backgroundImage = `url(${avatar.img_avatar})`;
        container.appendChild(avatarDiv);
    });
})
.catch(error => console.error('Error al cargar los avatares:', error));