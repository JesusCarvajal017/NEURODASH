import DataExtraction from '../../assets/js/global/peticiones.js';

let sys_user = new DataExtraction();

// Elementos del dom
let dom_nombre = document.querySelectorAll('.name_user');
let dom_avatar = document.querySelectorAll('.avatar-user');

// data del usuario en session
let data_user_session  = await sys_user.receptorData('../processes/user/allinfo.php');

function infoMain(){

    dom_avatar.forEach(elem =>{
        elem.src = '../' + data_user_session[0].img_avatar; 
    })

    dom_nombre.forEach(elem =>{
        elem.innerHTML = data_user_session[0].user_name; 
    })

    
}


infoMain();