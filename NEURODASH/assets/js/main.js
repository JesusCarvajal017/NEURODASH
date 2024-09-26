// funcionalidades sonido invitado
const rutas = {
    "index.html": "assets/js/page/index.js", 
    "invitado_home.html": "../../assets/js/page/invitado.js", 
}

function file(url){
    const script = document.createElement('script');
    script.src = url;
    script.type = "module";

    document.body.appendChild(script);
}

window.addEventListener('load', ()=>{
    const pathname = window.location.pathname;
    const url = pathname.split("/").pop();
    file(rutas[url]);
})

