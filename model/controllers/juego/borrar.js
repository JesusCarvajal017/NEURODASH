
let dataExtra = new DataExtraction();

const modalDelete  = document.querySelector('.modalDelete');
const tbodyDelet = document.querySelector('.tableDelete tbody');

const btnEliminar = document.querySelector('.btnEliminar');
const btnCerrarElimi = document.querySelector('.btnCerrarE');

async function preInfo(id_rango){
    const data = {
        id_rango
    };
    
    let dataUser = await dataExtra.dataCaptura('../../proceso/juego/queryRango.php', data);
    
    let htmlData = "";
    dataUser.forEach(data => {
        htmlData += `
            <tr>
                <td>${data.rgo_nombre}</td>
                <td>${data.rgo_multiplicador}</td>
            </tr> 
        `;
    });
    
    tbodyDelet.innerHTML = htmlData;
    modalDelete.click();

}

async function borrar(id_rango){
    preInfo(id_rango);

    btnEliminar.addEventListener('click', async ()=>{
        let dataElimar  =  await dataExtra.dataCaptura('../../proceso/juego/deleteRango.php', {id_rango});

        if(dataElimar.status == 'ok'){
            btnCerrarElimi.click();
            listarRangos();
            alerttoast('El rango  se a elimnado correctamente')
        }else{
            alerttoast('El rango no se a elimnado correctamente')
        }
    })

}
