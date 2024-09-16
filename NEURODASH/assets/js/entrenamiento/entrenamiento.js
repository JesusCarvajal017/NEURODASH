const timerElement = document.getElementById('timer');

let timeLeft = 15;

const countdown = setInterval(() => {
    timeLeft--;
    
    timerElement.textContent = timeLeft;
    
    if (timeLeft > 0) {
        timerElement.textContent = timeLeft;
    } else {
        clearInterval(countdown);
        timerElement.textContent = 'YAA!!'; 
        // messageElement.textContent = ;

        setTimeout(() => {
            window.location.href = 'ronda1.1-entrenamiento.html';
        }, 1000);
    }
}, 1000);


// ver y ocultar secciones de tutoriales 
   
function showSection(seccionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.seccion');
    sections.forEach(section => section.classList.remove('active'));

    // Mostrar la sección seleccionada
    const activeSection = document.getElementById(seccionId);
    activeSection.classList.add('active');
}
// ----------

    document.addEventListener('DOMContentLoaded', (event) => {
        const draggables = document.querySelectorAll('[draggable="true"]');
        const dropZones = document.querySelectorAll('#dropZone .recuadros-items');
        const timerElement = document.getElementById('timer2');
        let secondsRemaining = 50;
        let interval;
    
        // Función para iniciar el temporizador
        function startTimer() {
            interval = setInterval(() => {
                secondsRemaining--;
                timerElement.textContent = secondsRemaining;
    
                if (secondsRemaining <= 0) {
                    clearInterval(interval);

                }
            }, 1000);
        }
    
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
    
        startTimer(); // Inicia el temporizador
    });
    

