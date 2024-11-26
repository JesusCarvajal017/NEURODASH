
// function maximo(...numeros){
//     let numero = -Infinity;
//     console.log(numeros);
// }


// maximo(2,5,5,3,2,5,3)


window.addEventListener('DOMContentLoaded', () => {
    fetch('../../model/entrenamiento/niveles.php')
        .then(response => response.json())
        .then(data => {
            const listNivles = document.querySelector('.card'); 
            let htmlNivles = "";
            data.forEach((niveles, i) => {
                htmlNivles += //html
                `
                <div class="row">
                    <div class="col-12 d-flex justify-content-center">
                        <button class="brutalist-button${i + 1} dificul" value='${niveles.nvel_nombre}' >
                            <div class="btn-txt">
                                <span class="text">${niveles.nvel_nombre}</span>
                            </div>
                        </button>
                    </div>
                </div>
                `;
            });
        
            listNivles.innerHTML = htmlNivles;

            // Mover la adición de event listeners aquí, seleccion de dificultad
            const btnDificul = document.querySelectorAll('.dificul');
            btnDificul.forEach(button => {
                button.addEventListener('click', () => {
                    let dificultad = button.value;
                    console.log(dificultad);
                    document.querySelector('.section-1').classList.add('disabled'); 
                    // Mostrar la segunda sección 
                    document.querySelector('.section-2').classList.remove('disabled');
                });
            });

            // seleccion de la Tematica de juego 

        })
        .catch(error => console.error('Error:', error));
});
