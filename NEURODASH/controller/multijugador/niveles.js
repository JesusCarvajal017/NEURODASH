window.addEventListener('DOMContentLoaded', () => {
    fetch('../../model/entrenamiento/niveles.php')
        .then(response => response.json())
        .then(data => {
            const listNivles = document.querySelector('.card');
            let htmlNivles = "";
            data.forEach((niveles, i) => {
                htmlNivles += `
                <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <button class="brutalist-button${i + 1} dificul" value='${niveles.nvel_id}' >
                            <div class="btn-txt">
                                <span class="text">${niveles.nvel_nombre}</span>
                            </div>
                        </button>
                    </div>
                </div>`;
            });

            listNivles.innerHTML = htmlNivles;

            // Añadir evento a los botones de dificultad
            const btnDificul = document.querySelectorAll('.dificul');
            btnDificul.forEach(button => {
                button.addEventListener('click', () => {
                    const idNivel = button.value;
                    console.log("Dificultad seleccionada, idNivel:", idNivel);

                    // Guardar el idNivel en localStorage
                    localStorage.setItem('idNivel', idNivel);

                    // Ocultar sección 1, mostrar sección 2
                    document.querySelector('.section-1').classList.add('disabled');
                    document.querySelector('.section-2').classList.remove('disabled');
                });
                document.getElementById('backButton').addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector('.section-1').classList.remove('disabled');
                    document.querySelector('.section-2').classList.add('disabled');
                });

                document.getElementById('backButton3').addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelector('.section-2').classList.remove('disabled');
                    document.querySelector('.section-3').classList.add('disabled');
                });
            });
        })
        .catch(error => console.error('Error:', error));
});
