window.addEventListener('load', () => {
    const listModos = document.querySelector('.categoria')
    fetch('../../model/entrenamiento/modoJuego.php')
        .then(response => response.json())
        .then(data => {
            let htmlListModos = "";
            data.forEach(modos => {
                console.log(modos.mdo_nombre)
                htmlListModos += //html
                    `
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <button class="categorias-button">
                                <div class="icono-btnTerminos">
                                    <div class="icono-btnTerminos-square"><img src="../../assets/img/iconos/${modos.mdo_nombre}.png" alt="Icono Términos" class="ter-icon"></div>
                                </div>
                                <div class="btn-categoriaText" value='${modos.mdo_nombre}'>
                                    <span>${modos.mdo_nombre}</span>
                                </div>
                            </button>
                        </div>
                    </div>`;
            });

            listModos.innerHTML = htmlListModos;

            // seleccion del modo de juego 
            const btnDificul = document.querySelectorAll('.categorias-button');
            btnDificul.forEach(button => {
                button.addEventListener('click', () => {
                    let dificultad = button.value;
                    console.log(dificultad);
                    document.querySelector('.section-2').classList.add('disabled');
                    document.querySelector('.section-3').classList.remove('disabled');
                });
            });
        })



})
