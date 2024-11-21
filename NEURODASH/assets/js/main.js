import Loader from './animation/classLoder.js';
import AudioControllers from './sound/controlles.js';

// carga de achivos por medio del cache
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        window.location.reload();
        // alert('la pagina debe volve a cargar')
    }
  });
  

// ------------------------------------ start variables globales ------------------------------------
    const dirreccion_sonido = 'assets/music/sonido.mp3';

    // loader default
    const loader_default = document.querySelector('.loader-default');
    const loader = new Loader(loader_default);

    // niveles de direccionamiento 
    const nevels = [
        ' ', 
        '../',
        '../../',
        '../../../'
    ];

    const rutas = {
        "index.html": {
            "dirreccion": nevels[0], 
            "scripts": ["assets/js/page/index.js"]
        },
        "": {
            "dirreccion": nevels[0], 
            "scripts": ["assets/js/page/index.js"]
        },
        "prueba.html": {
            "dirreccion": nevels[0], 
            "scripts": ["assets/js/neurodash/puntuacion.js"]
        },
        "configStart.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/page/config.js",
                "../../assets/js/page/profile.js",
                "../../controller/config/listAvatars.js"

            ]
        },
        "invitado_home.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/animation/loader.js", 
                "../../assets/js/page/invitado.js"
            ]
        },
        "login.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/page/fd-login.js", 
                "../../controller/login&register/acceso.js"
            ]
        },
        "home.html": {
            "dirreccion": nevels[1], 
            "scripts": [
                "../assets/js/page/home.js",
                "../controller/user/homeInfo.js",
            ]
        },
        "validationToken.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../controller/login&register/register.js"
            ]
        },
        "tokenMain.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../controller/validations/tokenRegistro.js"
            ]
        },
        "salasDispo.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../controller/juego/salas.js",
            ]
        },
        "salaEspera.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/salaEspera.js",
            ]
        },
        "forgotPassword.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../controller/recupContra/recuperarContra.js",
            ]
        },
        "tokenForgotPassword.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../controller/validations/tokenRecuContra.js",
            ]
        },
        "validationPassword.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../controller/recupContra/updateContra.js",
            ]
        },
        "creaando.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/page/creandoSala.js",
            ]
        },
        "cartas.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/page/cartas.js",
,
            ]
        },
        "memorTopy.html": {
            "dirreccion": nevels[2], 
            "scripts": [
                "../../assets/js/page/topi.js",
,
            ]
        },
       

    };

// ------------------------------------ end variables globales ------------------------------------

// lectura de url fichero
function lecturaUrl(){
    const pathname = window.location.pathname;
    const url = pathname.split("/").pop();

    return url;
}

// crea los script en el DOM
function file(url){
    const script = document.createElement('script');
    script.type = "module";
    script.src = url;

    document.body.appendChild(script);
}


window.addEventListener('load', ()=>{
    // se oculta el loader cuando los recursos han cargado
    loader.hidde();
    
    let elemnt_sound = document.querySelectorAll('.sound-sys');

    let url_fichero = lecturaUrl();
    let file_nivel = rutas[url_fichero].dirreccion;

    // console.log(file_nivel + dirreccion_sonido)
    // sonido de intefaces
    const sonud_sys = new AudioControllers(file_nivel + dirreccion_sonido);

    // Establece los cadidatos para sonidos
    sonud_sys.setElement(elemnt_sound);

    // Activacion de sonidos en el juego
    sonud_sys.soundDom();
});


// -------------------------------------- carga de ficheros --------------------------------------
window.addEventListener('DOMContentLoaded', ()=>{
    // loader.show();
    let url = lecturaUrl();

    let path = url != "" ? rutas[url].scripts : rutas["index.html"].scripts;
    if(Array.isArray(path)){
        // console.log('detecto que es un array')
        path.forEach(urls => {
            file(urls)
        });
    }else{
        file(rutas[url]);
    }
    
})
