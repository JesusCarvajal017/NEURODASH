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

            // Selección del modo de juego
            const btnModos = document.querySelectorAll('.categorias-button');
            btnModos.forEach(button => {
                button.addEventListener('click', () => {
                    const mdo_juegoId = button.value;
                    console.log("Modo de juego seleccionado, idModo:", mdo_juegoId);

                    // Guardar el idModo en localStorage
                    localStorage.setItem('idModo', mdo_juegoId);

                    document.querySelector('.section-2').classList.add('disabled');
                    document.querySelector('.section-3').classList.remove('disabled');
                });
            });
        })
        .catch(error => console.error('Error:', error));
});
