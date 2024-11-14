const modalUpdate  = document.querySelector('.modalUpdate');
const btnCloseUp = document.querySelector('.closeUpdate');
const btnGuardadUp  = document.querySelector('.guardarUp');


let aliasUsuarioU = document.getElementById('txtAliasU');
let emailUsuarioU = document.getElementById('txtEmailU');
let expUsuarioU = document.getElementById('numberExperienciaU');
let rgoUsuarioU = document.getElementById('rangoUsuarioU');
let tipoUsuarioU = document.getElementById('tipoUsuarioU') ; 

tipoUsuario(tipoUsuarioU);
rango(rgoUsuarioU);

async function editar(user_id){
    preInfoUpdate(user_id);


    btnGuardadUp.addEventListener('click', async ()=>{
        const data = {
            user_id,
            aliasUsuarioU : aliasUsuarioU.value,
            emailUsuarioU:emailUsuarioU.value,
            expUsuarioU:parseFloat(expUsuarioU.value),
            rgoUsuarioU:parseFloat(rgoUsuarioU.value),
            tipoUsuarioU:parseFloat(tipoUsuarioU.value),
        }
    
        let evioUpdate = await dataExtra.dataCaptura('../../proceso/usuario/updateUser.php', data);
    
        if(evioUpdate.status == 'ok'){
            listarPersonas();
            btnCloseUp.click();
            alerttoast('Actulizacion existosa');
        }else{
            alerttoast('Actulizacion no existosa');
        }
    })


}

async function preInfoUpdate(user_id){
    const data = {
         user_id
    };
    
    let dataUser = await dataExtra.dataCaptura('../../proceso/usuario/queryUsers.php', data);

    dataUser.forEach(data => {
       aliasUsuarioU.value = data.user_name;
       emailUsuarioU.value = data.user_email;
       expUsuarioU.value = data.user_exp;
       rgoUsuarioU.value = data.rgo_id;
       tipoUsuarioU.value = data.tp_user_id;
    });
    
    // tbodyDelet.innerHTML = htmlData;
    modalUpdate.click();

}
