window.addEventListener('load', ()=>{
    const listModos = document.querySelector('.categoria')
    fetch('../model/entrenamiento/modoJuego.php')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        let htmlListModos = "";
        data.forEach(modos => {
            console.log(modos.mdo_juegoid)
            htmlListModos += `
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <a class="categorias-button" href="terminosEntrenamiento.html">
                                <div class="icono-btnTerminos">
                                <div class="icono-btnTerminos-square"><img src="../assets/img/iconos/${modos.mdo_nombre}.png" alt="Icono Términos" class="ter-icon"></div>
                                </div>
                                <div class="btn-categoriaText">
                                <span>${modos.mdo_nombre}</span>
                                </div>
                            </a>
                        </div>
                    </div>`;
        });

        listModos.innerHTML = htmlListModos;
    })



})