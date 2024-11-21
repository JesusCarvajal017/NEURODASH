import DataExtraction from '../../assets/js/global/peticiones.js';

let list_avatar_views  = document.querySelector('.list-avatars');

let data_sys  = new DataExtraction();

let data_user_session  = await data_sys.receptorData('../../processes/user/allinfo.php');

window.cambiarAvatar = async function(id){
    // alert(id)
    const data_avatar_update = {
        id_user: data_user_session[0].user_id,
        id_avatar: id
    };
    
    let proceso_updat = await data_sys.dataCaptura('../../processes/user/updateAvatar.php', data_avatar_update);
    
    if(!proceso_updat.status){
        alert('No se logro actualizar');
    }else{
        infoUserConfig();
        // alert('Se actualizo')
        
    }
    
}

async function infoUserConfig(){
    let data_user_session  = await data_sys.receptorData('../../processes/user/allinfo.php');
    let dom_user_config  = document.querySelector('.avatat-user');
    let dom_user_name_config = document.querySelector('.user-name-config');

    dom_user_config.src = '../../' + data_user_session[0].img_avatar;
    dom_user_name_config.value = data_user_session[0].user_name;

}

infoUserConfig();

async function listAvatar(){
    let claseActive = 'active-scale';
    
    let db_avatars = await  data_sys.receptorData('../../processes/juego/info/avatars.php');
    
    let img_avatar = "";
    db_avatars.forEach(avatars => {
        let selectd = data_user_session[0].img_avatar == avatars.img_avatar ? claseActive : '';
        img_avatar += ` <img src="../../${avatars.img_avatar}" alt="Avatar 2" class="avatar-option ${selectd}" value="${avatars.id_avatar}" onclick="cambiarAvatar(${avatars.id_avatar});">`;
    });

    list_avatar_views.innerHTML = img_avatar;

    const avatarOptions = document.querySelectorAll('.avatar-option');

    avatarOptions.forEach(option => {
        option.addEventListener('click', () => {
            avatarOptions.forEach(item => item.classList.remove('active-scale'));

            option.classList.add('active-scale');
            infoUserConfig();
        });
    });
        
}

listAvatar();


let guardar_name = document.querySelector('.confi-cambios');


guardar_name.addEventListener('click', async ()=>{
    let data_user_session  = await data_sys.receptorData('../../processes/user/allinfo.php');
    let data_name  = document.querySelector('.user-name-config');

    if(data_name.value.length > 4){
        const update_name  = {
            name_user: data_name.value,
            id_user: data_user_session[0].user_id,
        }

        let proceso_updat = await data_sys.dataCaptura('../../processes/user/updateNombre.php', update_name);

        location.reload();
        // if(proceso_updat.status){
        //     data_name.value = data_user_session[0].user_name;

        //     alert('Holaa')
        // }

    }

})

