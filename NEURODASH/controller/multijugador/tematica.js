window.addEventListener('DOMContentLoaded', () => {
    fetch('../../model/entrenamiento/tematica.php')
        .then(response => response.json())
        .then(data => {
            const listTematica = document.querySelector('.card-item');
            let htmlTematica = "";
            data.forEach((tematica) => {
                htmlTematica += `
                    <div class="col-12 d-flex justify-content-center">
                        <button class="botonesTer-button" value="${tematica.id_item}">
                            <div class="icono-btnTerminos">
                                <div class="icono-btnTerminos-square">
                                    <img src="../../assets/img/iconos/icon-terminos/${tematica.nombre_item}.png" alt="Icono Términos" class="ter-icon">
                                </div>
                            </div>
                            <div class="btn-categoriaText">
                                <span>${tematica.nombre_item}</span>
                            </div>
                        </button>  
                    </div>
                `;
            });

            listTematica.innerHTML = htmlTematica;

            const btnTematica = document.querySelectorAll('.botonesTer-button');
            btnTematica.forEach(button => {
                button.addEventListener('click', () => {
                    const idItem = button.value;

                    // Obtener los otros parámetros almacenados
                    const idNivel = localStorage.getItem('idNivel');
                    const mdo_juegoId = localStorage.getItem('idModo');

                    // Verificar que todos los valores estén disponibles
                    if (!idNivel || !mdo_juegoId) {
                        console.error("Faltan parámetros: idNivel o mdo_juegoId no definidos.");
                        return;
                    }

                    // Almacenar el idItem en localStorage antes de redirigir
                    localStorage.setItem('idItem', idItem);

                    // Redirigir a la página de rondas
                    window.location.href = "rondas.html";
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
