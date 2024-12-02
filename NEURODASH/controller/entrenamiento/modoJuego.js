window.addEventListener('load', () => {
    const listModos = document.querySelector('.categoria');
    fetch('../../model/entrenamiento/modoJuego.php')
        .then(response => response.json())
        .then(data => {
            let htmlListModos = "";
            data.forEach(modos => {
                htmlListModos += `
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <button class="categorias-button" value='${modos.mdo_juegoId}'>
                                <div class="icono-btnTerminos">
                                    <div class="icono-btnTerminos-square"><img src="../../assets/img/iconos/${modos.mdo_nombre}.png" alt="Icono Términos" class="ter-icon"></div>
                                </div>
                                <div class="btn-categoriaText">
                                    <span>${modos.mdo_nombre}</span>
                                </div>
                            </button>
                        </div>
                    </div>`;
            });

            listModos.innerHTML = htmlListModos;
            enviarDatos();
            // Selección del modo de juego

        })
        .catch(error => console.error('Error:', error));

    function enviarDatos() {
        const btnModos = document.querySelectorAll('.categorias-button');
        btnModos.forEach(button => {
            button.addEventListener('click', () => {
                const mdo_juegoId = button.value;

                // Guardar el idModo en localStorage
                localStorage.setItem('idModo', mdo_juegoId);

                // Si el modo es "Números" (asumiendo que es 2)
                if (Number(mdo_juegoId) === 2) {
                    // Obtener idItem del atributo o usar 11 por defecto
                    let idItem;
                    localStorage.setItem('idItem', 11);

                    fetch('../../model/entrenamiento/cargar_rondas.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            idItem: idItem,
                            idNivel: localStorage.getItem('idNivel'),
                            mdo_juegoId: mdo_juegoId
                        })
                    })
                        .then(response => response.json())
                        .then(rondas => {
                            // Almacenar rondas en localStorage
                            localStorage.setItem('rondas', JSON.stringify(rondas));
                            window.location.href = "rondas.html";

                        })
                        .catch(error => {
                            console.error('Error al cargar rondas:', error);
                        });
                } else {
                    // Comportamiento normal para otros modos
                    document.querySelector('.section-2').classList.add('disabled');
                    document.querySelector('.section-3').classList.remove('disabled');
                }
            });
        });
    }
});