let urlView = window.location.hash;
let urlOrigin = window.location.pathname.split("/").pop();

if(urlOrigin === "" || urlOrigin === "index.html"){
    cambiarUrlConHash('seccion-informativa');
}else{
    cambiarUrlConHash('seccion');

}

let btn1 = document.querySelector('.home')
let btn2 = document.querySelector('.home2')
let btn3 = document.querySelector('.home3')
let btn4 = document.querySelector('.home4')


btn1.addEventListener('click', ()=>{
    cambiarUrlConHash('home')
}) 
btn2.addEventListener('click', ()=>{
    cambiarUrlConHash('home1')
}) 
btn3.addEventListener('click', ()=>{
    cambiarUrlConHash('home2')
}) 
btn4.addEventListener('click', ()=>{
    cambiarUrlConHash('home3')
}) 


function cambiarUrlConHash(nuevaRuta) {
    window.location.hash = nuevaRuta;
}

// // Ejemplo de uso
 
// function obtenerUrl(){
//     const pathname = window.location.hash;
//     const url = pathname.split("/").pop();

//     return url;
// }
