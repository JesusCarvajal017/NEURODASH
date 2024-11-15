

const radioButtons = document.querySelectorAll('input[name="options"]');
const thematicSection = document.getElementById("ocul");

    // Escucha los cambios en los radios
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            // Oculta o muestra la sección según si se seleccionó 'terms'
            thematicSection.style.display = radio.id === 'numbers' ? 'none' : 'flex';
        });
    });


    window.onload = function() {
        document.getElementById('loadingScreen').style.display = 'flex';
        // Ocultar la pantalla de carga después de 1 segundo
        setTimeout(function() {
            document.getElementById('loadingScreen').style.display = 'none';
            }, 1000);
        };
    
    // Volver a mostrar la pantalla de carga al salir de la página
        window.onbeforeunload = function() {
            document.getElementById('loadingScreen').style.display = 'flex';
        };
    