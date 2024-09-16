let loadercotenido = document.querySelector('.carga-loader');
let mostraLoader = document.querySelector('.loader-display');
let ocultarPagina = document.querySelector('.loader-none'); 

let contenedor100vh = document.querySelector('.container-100vh');

function loader(elemnt){
    let width = 10;
    
    let intervalo = setInterval(() => {
        width+= 10;
        elemnt.style.width = `${width}%`;
        if (width == 110){
            clearInterval(intervalo);
            mostraLoader.style = 'display: none';
            ocultarPagina.style = 'display: block';

            contenedor100vh.style = 'height: 100vh;'
        }
    }, 1000);
}

window.addEventListener('load', ()=>{
    ocultarPagina.style = 'display: none';
    loader(loadercotenido);

})

