import AudioControllers from '../sound/controlles.js';

const musicDash = new AudioControllers('../../assets/music/music_dash.mp3');

const optionMusic = document.querySelector('.config-invitado');
const options = optionMusic.querySelectorAll('img');

const entrenamiento = document.querySelector('.entranamiento');
const unirseSala = document.querySelector('.unirseSala');


entrenamiento.addEventListener('click', ()=>{
    window.location = 'http://localhost/NEURODASH/NEURODASH/views/entrenamiento/entrenamiento.html';
})

unirseSala.addEventListener('click', ()=>{
    window.location = 'http://localhost/NEURODASH/NEURODASH/views/juego/salaEspera.html'
})


const imgRuta = {
    "sonido": ["mute-sonido.png", "sonido.png"],
    "musica": ["mute-music.png", "music.png"]
}

options.forEach(elment =>{
    elment.addEventListener('click', ()=>{
        let opt = (elment.className).split(' ')[0]; 

        let rutaImg = elment.src;
        let tipo = rutaImg.split("/").pop();

        let path = "../../assets/img/iconos-desarrollo/"

        let src = "";

        if(tipo ==  imgRuta[opt][1]){
            src = path + imgRuta[opt][0];
            if(opt == 'musica') musicDash.mute();
        }else{
            src = path + imgRuta[opt][1];
            if(opt == 'musica') musicDash.sound();
        }

        elment.src = src;
    })
})
