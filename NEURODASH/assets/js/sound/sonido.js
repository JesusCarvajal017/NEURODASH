import AudioControllers from 'controlAudio.js';

const musicDash = AudioControllers('assets/music/music_dash.mp3');


let mute = document.querySelector('.mute');
let sound = document.querySelector('.sound');
const rangeView = document.querySelector('.range')
const range = document.querySelector('.volumen');

range.addEventListener('input', ()=>{
    rangeView.innerHTML = range.value;

    musica.musicDash(range.value / 100);

})


sound.addEventListener('click', ()=>{
    musica.musicDash();
})

mute.addEventListener('click', ()=>{
    musica.musicDash();
})

// elementos.forEach(elementos=>{
//     elementos.addEventListener('mousemove', () => {
//         if(!i){
//             sonidoNuzit.play();
//             i = true;
//         } 
//     })

//     elementos.addEventListener('mouseleave',() => i = false)
// })