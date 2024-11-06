const modalUpdate  = document.querySelector('.modalUpdate');
const btnCloseUp = document.querySelector('.closeUpdate');
const btnGuardadUp  = document.querySelector('.guardarUp');


let nombreRangoU = document.getElementById('txtNombreRangoU');
let expTopeU = document.getElementById('txtexpTopeU');
let multiplicadorU = document.getElementById('multiplicadorU'); 

async function editar(id_rango){
    preInfoUpdate(id_rango);


    btnGuardadUp.addEventListener('click', async ()=>{
        const data = {
            id_rango,
            nombreRango: nombreRangoU.value, 
            expTope: parseFloat(expTopeU.value),
            multiplicador: parseFloat(multiplicadorU.value),
        }
    
        let evioUpdate = await dataExtra.dataCaptura('../../proceso/juego/updateRango.php', data);
    
        if(evioUpdate.status == 'ok'){
            listarRangos();
            btnCloseUp.click();
            alerttoast('Actulizacion existosa');
        }else{
            alerttoast('Actulizacion no existosa');
        }
    })


}

async function preInfoUpdate(id_rango){
    const data = {
        id_rango
    };
    
    let dataUser = await dataExtra.dataCaptura('../../proceso/juego/queryRango.php', data);

    dataUser.forEach(data => {
        nombreRangoU.value = data.rgo_nombre;
        expTopeU.value = data.rgo_exptope;
        multiplicadorU.value = data.rgo_multiplicador;
    });
    
    // tbodyDelet.innerHTML = htmlData;
    modalUpdate.click();

}
