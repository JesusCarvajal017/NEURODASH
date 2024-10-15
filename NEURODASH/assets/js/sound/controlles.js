
export default class AudioControllers{
    _audio;
    _controller; 

    constructor(url){
        this._audio = url;
        this._controller = new Audio(this._audio);
        this._controller.loop = true;
    }

    mute(){
        this._controller.pause();
    }

    sound(){
        this._controller.play();
    }

    subirVolumen(volumen){
        this._controller.volume = volumen;
    }

}

// window.addEventListener('DOMContentLoaded', ()=>{
//     let configSound = {};
//     fetch('../../assets/json/config-local.json')
//     .then(response => response.json())
//     .then(data =>{
//         configSound = data[0].config;
//     })
    
    
//     console.log(configSound);
    
//     const range = document.getElementById('inputRang');
//             sliderValue = document.querySelector('.slide-value');

//     range.addEventListener("input", ()=>{
//         console.log('hola')
//         let rangeVal = range.value;
//         sliderValue.innerHTML = rangeVal;
    
//     })
    
// })

