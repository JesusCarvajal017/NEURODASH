const optionConfig = document.querySelectorAll('.option-config');
const devolver = document.querySelector('.devolver-config');
const configoStart = document.querySelector('.config-option-start')

const optionStart = document.querySelectorAll('.option-one-config-s');

const interfazMenun = {
    1: 'cuenta-config',
    2: 'perfil-config',
    3: 'sonido-config',
    4: 'home-config',
}

function ocultarItems(items){
    items.forEach(data=>{
        data.style = 'display: none !important';
    })
}

optionStart.forEach((option)=>{
    option.addEventListener('click', (event)=>{
        let optionConfigure =  event.currentTarget.dataset.option; 
        let section = interfazMenun[optionConfigure];
        if(section != 'home-config'){
            devolver.style = 'display: block';
    
            ocultarItems(optionConfig);
            document.querySelector(`.${interfazMenun[optionConfigure]}`).style = 'display: block !important'; 
        }else{
            window.location.href = '../home.html'
        }
    })
});

devolver.addEventListener('click', ()=>{
    devolver.style = 'display: none';
    ocultarItems(optionConfig);

    configoStart.style = 'display: block !important'
});

const deleteCuenta = document.getElementById('deleteCuenta');

deleteCuenta.addEventListener('click', ()=>{
    window.location.href = '../../index.html';
})

// const cuentaConfig = document.querySelector('.cuenta-config');

