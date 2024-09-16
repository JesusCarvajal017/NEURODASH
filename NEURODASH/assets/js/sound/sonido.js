let sonidoNuzit = new Audio('assets/music/sonido.mp3');
let elementos = document.querySelectorAll('a');


elementos.forEach(elementos=>{
    elementos.addEventListener('mousemove', () => {
        if(!i){
            sonidoNuzit.play();
            i = true;
        } 
    })

    elementos.addEventListener('mouseleave',() => i = false)
})