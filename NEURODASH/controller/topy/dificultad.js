


window.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos desde el servidor
    fetch('../../model/topy/dificultad.php')
        .then(response => response.json())
        .then(data => {
            const listNivles = document.querySelector('.cardDifiTopy');

            // Recorrer los datos de la base de datos
            data.forEach((dificultadTopy) => {
                // Crear un botón para cada nivel
                const button = document.createElement('button');
                button.className = `btn-${dificultadTopy.name_difi_topy}`;
                button.textContent = dificultadTopy.name_difi_topy;

                // Asignar el evento onclick para guardar la configuración
                button.onclick = function() {
                    // Crear objeto con la configuración del nivel
                    const configuracion = {
                        nivel: dificultadTopy.name_difi_topy,
                        imgCorrectas: dificultadTopy.img_correctas,
                        imgIncorrectas: dificultadTopy.img_incorrectas

                    };

                    // Guardar la configuración en localStorage
                    localStorage.setItem('nivelSeleccionado', JSON.stringify(configuracion));

                    // Redirigir al usuario a la página de juego
                    window.location.href = 'memorTopy.html';
                };

                // Añadir el botón al contenedor
                listNivles.appendChild(button);
            });
        })
        .catch(error => console.error('Error al cargar los niveles:', error));
});
