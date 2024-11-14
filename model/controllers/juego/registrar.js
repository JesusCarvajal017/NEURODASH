
const formRegistra = document.querySelector('.registrarRango');
const cerrarModalR = document.querySelector('.closeRegiste');

let btnModalRegis = document.querySelector('.modalRegistar');

formRegistra.addEventListener('submit', (event)=>{
    event.preventDefault();

    // valores a recolectar
    let nombreRango = document.getElementById('txtNombreRango').value;
    let expTope = parseFloat(document.getElementById('txtexpTope').value);
    let multiplicador = parseFloat(document.getElementById('multiplicador').value);

    const dataRegistra = {
        nombreRango, 
        expTope,
        multiplicador,
    };

    fetch('../../proceso/juego/registarRango.php', {
        method: 'POST',
        headers :  {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataRegistra)
    })
    .then(response => response.json())
    .then(info => {
        if(info.status == 'ok'){
            cerrarModalR.click();
            listarRangos();
        }
    })


})


const btnRegistra = document.querySelector('.registarPerson');

btnRegistra.addEventListener('click', ()=>{
    formRegistra.reset();
    btnModalRegis.click();

})




