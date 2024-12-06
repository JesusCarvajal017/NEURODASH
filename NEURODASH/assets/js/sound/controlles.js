
export default class AudioControllers{
    _audio;
    _controller; 
    _elements;
    _elementDrop;

    constructor(url){
        // proporcionados por el usuario
        this._audio = url;
        this._controller = new Audio(url);

        // this._controller.loop = true;
    }
    
    
    setElement(elements){
        this._elements = elements;
    }

    setElementDrop(elements){
        this._elementDrop = elements;
    }

    soundDom(){
        this._elements.forEach(element => {
            element.addEventListener('mouseover', ()=>{
                this.sound();
            });
        });
        // this._elements.forEach(element => {
        //     element.addEventListener('mouseleave', ()=>{
        //         this.mute();
        //     });
        // });
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

    loopMusisc(){
        this._controller.loop = true;
    }

    dropMusic(){
        this._elementDrop.forEach(element => {
            element.addEventListener('dragend', ()=>{
                this.sound();

            });
        });
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

