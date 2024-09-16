window.addEventListener('DOMContentLoaded', ()=>{
    let configSound = {};
    fetch('../../assets/json/config-local.json')
    .then(response => response.json())
    .then(data =>{
        configSound = data[0].config;
    })
    
    
    console.log(configSound);
    
    const range = document.getElementById('inputRang');
            sliderValue = document.querySelector('.slide-value');

    range.addEventListener("input", ()=>{
        console.log('hola')
        let rangeVal = range.value;
        sliderValue.innerHTML = rangeVal;
    
    })
    
})

