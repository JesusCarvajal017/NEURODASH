let loadercotenido = document.querySelector('.carga-loader');
let mostraLoader = document.querySelector('.loader-display');
let ocultarPagina = document.querySelector('.loader-none'); 

let contenedor100vh = document.querySelector('.container-100vh');

function loader(elemnt){
    let width = 0;
    
    let intervalo = setInterval(() => {
        width+= 10;
        elemnt.style.width = `${width}%`;
        if (width == 130){
            clearInterval(intervalo);
            mostraLoader.style = 'display: none';
            ocultarPagina.style = 'display: block';

            contenedor100vh.style = 'height: 100vh;'
        }
    }, 200);
}

// activador de loader
ocultarPagina.style = 'display: none';
loader(loadercotenido);    

