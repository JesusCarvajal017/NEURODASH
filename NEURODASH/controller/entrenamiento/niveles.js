
// function maximo(...numeros){
//     let numero = -Infinity;
//     console.log(numeros);
// }


// maximo(2,5,5,3,2,5,3)


window.addEventListener('DOMContentLoaded', ()=>{
    fetch('../../model/entrenamiento/niveles.php')
    .then(response => response.json())
    .then(data => {
        const listNivles = document.querySelector('.card'); 
        let htmlNivles = "";
        data.forEach((niveles, i)=>{
            htmlNivles+= `
                <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                    <a class="brutalist-button${i + 1}" href="tematicaEntrenamiento.html">
                        <div class="btn-txt">
                            <span class="text">${niveles.nvel_nombre}</span>
                        </div>
                    </a>
                    </div>
                </div>
            `
        })
    
        listNivles.innerHTML = htmlNivles;
    } )
})

