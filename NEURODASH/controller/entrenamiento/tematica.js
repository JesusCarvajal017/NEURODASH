window.addEventListener('DOMContentLoaded', ()=>{
    fetch('../../model/entrenamiento/tematica.php')
    .then(response => response.json())
    .then(data => {
        const listTematica = document.querySelector('.card'); 
        let htmlTematica = "";
        data.forEach((tematica, i)=>{
            htmlTematica+= `
                    <div class="col-12 d-flex justify-content-center">
                        <a class="botonesTer-button " href="tutorialEntrenamiento.html">
                            <div class="icono-btnTerminos">
                              <div class="icono-btnTerminos-square"><img src="../../assets/img/iconos/icon-terminos/${tematica.nombre_item}.png" alt="Icono Términos" class="ter-icon"></div>
                            </div>
                            <div class="btn-categoriaText">
                              <span>${tematica.nombre_item}</span>
                            </div>
                        </a>  
                    </div>
                `
        })
    
        listTematica.innerHTML = htmlTematica;
    } )
})

