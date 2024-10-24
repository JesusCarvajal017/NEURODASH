import Loader from './animation/classLoder.js';

const loader_default = document.querySelector('.loader-default');

const loader = new Loader(loader_default);

// funcionalidades sonido invitado
const rutas = {
    "index.html": [
        "assets/js/page/index.js",
        "assets/js/sound/sonido.js"
    ], 
    "prueba.html": "assets/js/neurodash/puntuacion.js",
    "configStart.html" : "../../assets/js/page/config.js",
    "invitado_home.html": [
        // "",
        "../../assets/js/animation/loader.js",
        "../../assets/js/page/invitado.js", 
    ], 
    "login.html":[
        "../../assets/js/page/fd-login.js",
        "../../controller/login&register/acceso.js",
    ],
    "home.html": [
        "../assets/js/page/home.js"
    ]
}

// crea los script en el DOM
function file(url){
    const script = document.createElement('script');
    script.src = url;
    script.type = "module";

    document.body.appendChild(script);
}

window.addEventListener('load', ()=>{
    loader.hidde();
})

window.addEventListener('DOMContentLoaded', ()=>{
    // loader.show();
    const pathname = window.location.pathname;
    const url = pathname.split("/").pop();

    let path = url != "" ? rutas[url] : rutas["index.html"];
    if(Array.isArray(path)){
        // console.log('detecto que es un array')
        path.forEach(urls => {
            file(urls)
        });
    }else{
        file(rutas[url]);
    }
    
})
