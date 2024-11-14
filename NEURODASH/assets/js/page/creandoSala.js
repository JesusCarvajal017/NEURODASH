

const radioButtons = document.querySelectorAll('input[name="options"]');
const thematicSection = document.getElementById("ocul");

    // Escucha los cambios en los radios
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            // Oculta o muestra la sección según si se seleccionó 'terms'
            thematicSection.style.display = radio.id === 'numbers' ? 'none' : 'flex';
        });
    });