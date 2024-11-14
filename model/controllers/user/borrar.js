
let dataExtra = new DataExtraction();

const modalDelete  = document.querySelector('.modalDelete');
const tbodyDelet = document.querySelector('.tableDelete tbody');

const btnEliminar = document.querySelector('.btnEliminar');
const btnCerrarElimi = document.querySelector('.btnCerrarE');

async function preInfo(user_id){
    const data = {
         user_id
    };
    
    let dataUser = await dataExtra.dataCaptura('../../proceso/usuario/queryUsers.php', data);
    
    let htmlData = "";
    dataUser.forEach(data => {
        htmlData += `
            <tr>
                <td>${data.user_name}</td>
                <td>${data.user_email}</td>
            </tr> 
        `;
    });
    
    tbodyDelet.innerHTML = htmlData;
    modalDelete.click();

}

async function borrar(user_id){
    preInfo(user_id);

    btnEliminar.addEventListener('click', async ()=>{
        let dataElimar  =  await dataExtra.dataCaptura('../../proceso/usuario/deleteUser.php', {user_id});

        if(dataElimar.status == 'ok'){
            btnCerrarElimi.click();
            listarPersonas();
            alerttoast('El usuario se a elimnado correctamente')
        }else{
            alerttoast('El usuario no se a elimnado correctamente')
        }
    })

}



