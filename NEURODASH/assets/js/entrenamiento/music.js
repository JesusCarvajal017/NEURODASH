import AudioControllers from '../sound/controlles.js';
let musicaJuego = new AudioControllers('../../assets/music/juegos_dash.mp3');

musicaJuego.sound();
musicaJuego.loopMusisc();

let sound_music = new AudioControllers('../../assets/music/sonido.mp3')
