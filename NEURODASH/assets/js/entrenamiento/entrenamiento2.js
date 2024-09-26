
// tiempo de drop 

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

let timeLeftMinutes = 0; 
let timeLeftSeconds = 15; 

const countdown = setInterval(() => {
    if (timeLeftSeconds > 0) {
        timeLeftSeconds--;
    } else if (timeLeftMinutes > 0) {
        timeLeftMinutes--;
        timeLeftSeconds = 59; 
    } else {
        clearInterval(countdown);
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
     
        setTimeout(() => {
            window.location.href = 'clasificacion-entrenamiento.html';
        }, 1000);
        return; // Termina la función aquí
    }

    minutesElement.textContent = String(timeLeftMinutes).padStart(2, '0');
    secondsElement.textContent = String(timeLeftSeconds).padStart(2, '0');
}, 1000);


document.addEventListener('DOMContentLoaded', (event) => {
    const draggables = document.querySelectorAll('[draggable="true"]');
    const dropZones = document.querySelectorAll('#dropZone .recuadros-items');
 
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            e.target.classList.add('dragging');
        });

        draggable.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggedItemId = e.dataTransfer.getData('text/plain');
            const draggedItem = document.getElementById(draggedItemId);

            // Solo permitir el drop si el drop zone está vacío
            if (!dropZone.textContent.trim()) {
                if (draggedItem) {
                    dropZone.textContent = draggedItem.textContent;
                    draggedItem.remove();
                }
            }
        });
    });

});