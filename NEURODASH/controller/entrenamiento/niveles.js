// window.addEventListener('DOMContentLoaded', () => {
//     fetch('../../model/entrenamiento/niveles.php')
//         .then(response => response.json())
//         .then(data => {
//             const listNivles = document.querySelector('.card');
//             let htmlNivles = "";
//             data.forEach((niveles, i) => {
//                 htmlNivles += `
//                 <div class="row">
//                     <div class="col-12 d-flex justify-content-center">
//                         <button class="brutalist-button${i + 1} dificul" value='${niveles.nvel_id}' >
//                             <div class="btn-txt">
//                                 <span class="text">${niveles.nvel_nombre}</span>
//                             </div>
//                         </button>
//                     </div>
//                 </div>`;
//             });

//             listNivles.innerHTML = htmlNivles;

//             const btnDificul = document.querySelectorAll('.dificul');
//             btnDificul.forEach(button => {
//                 button.addEventListener('click', () => {
//                     const idNivel = button.value;
//                     console.log("Dificultad seleccionada, idNivel:", idNivel);

//                     // Guardar el idNivel en localStorage
//                     localStorage.setItem('idNivel', idNivel);

//                     // Ocultar sección 1, mostrar sección 2
//                     document.querySelector('.section-1').classList.add('disabled');
//                     document.querySelector('.section-2').classList.remove('disabled');
//                 });
//                 document.getElementById('backButton').addEventListener('click', (e) => {
//                     e.preventDefault();
//                     document.querySelector('.section-1').classList.remove('disabled');
//                     document.querySelector('.section-2').classList.add('disabled');
//                 });

//                 document.getElementById('backButton3').addEventListener('click', (e) => {
//                     e.preventDefault();
//                     document.querySelector('.section-2').classList.remove('disabled');
//                     document.querySelector('.section-3').classList.add('disabled');
//                 });
//             });
//         })
//         .catch(error => console.error('Error:', error));
// });


window.addEventListener('load', () => {
    // Función para manejar la navegación entre secciones
    function setupNavigation() {
        const sections = {
            section1: document.querySelector('.section-1'),
            section2: document.querySelector('.section-2'),
            section3: document.querySelector('.section-3')
        };

        const navigationButtons = {
            backButton: document.getElementById('backButton'),
            backButton2: document.getElementById('backButton2')
        };

        // Verificar la existencia de los botones antes de añadir eventos
        if (navigationButtons.backButton) {
            navigationButtons.backButton.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.clear();


                sections.section1.classList.remove('disabled');
                sections.section2.classList.add('disabled');
            });
        } else {
            console.warn('no fue posible encontrar el botón de retroceso para la sección 1');
        }

        if (navigationButtons.backButton2) {
            navigationButtons.backButton2.addEventListener('click', (e) => {
                e.preventDefault();

                sections.section2.classList.remove('disabled');
                sections.section3.classList.add('disabled');
            });
        } else {
            console.warn('no fue posible encontrar el botón de retroceso para la sección 2');
        }
    }

    fetch('../../model/entrenamiento/niveles.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
                    // Guardar el idNivel en localStorage
                    localStorage.setItem('idNivel', idNivel);

                    // Ocultar sección 1, mostrar sección 2
                    document.querySelector('.section-1').classList.add('disabled');
                    document.querySelector('.section-2').classList.remove('disabled');
                });
            });

            // Configurar navegación después de cargar los niveles
            setupNavigation();
        })
        .catch(error => {
            console.error('Error al cargar los niveles:', error);
            // Opcional: mostrar un mensaje de error al usuario
            const listNivles = document.querySelector('.card');
            if (listNivles) {
                listNivles.innerHTML = `
                    < div class="row" >
                        <div class="col-12 text-center text-danger">
                            No se pudieron cargar los niveles. Por favor, intente de nuevo más tarde.
                        </div>
                        </div >
                    `;
            }
        });

});