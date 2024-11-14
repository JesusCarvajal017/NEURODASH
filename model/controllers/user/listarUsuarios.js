class DataExtraction{
    _url;
    _response;

    async dataCaptura(url, data){
        try {
            let data_info = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            this._response = await data_info.json();
            
        } catch (error) {
            this._response = error;            
        }

        return this._response;
    }

}

// const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
const bodytoadt = document.querySelector('.toast-body');

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

function alerttoast(mensage){
    bodytoadt.textContent = mensage;
    toastBootstrap.show()
}


const tableUser = document.querySelector('.user-dash tbody');

function listarPersonas(){

    fetch('../../proceso/usuario/queryUser.php')
    .then(response => response.json())
    .then(usuarios => {

        let views = "";

        usuarios.forEach((user, i) => {
            views += `
                 <tr>
                    <td>${i + 1}</td>
                    <td>${user.user_name}</td>
                    <td>${user.user_email}</td>
                    <td>${user.user_exp}</td>  
                    <td>${user.rgo_nombre}</td>  
                    <td>${user.tp_user_name}</td>  
                    <th><i class="fas fa-edit" onclick="editar(${user.user_id})"></i></th>
                    <th><i class="fas fa-trash" onclick="borrar(${user.user_id})"></i></th>
                </tr>
            `;
        });

        tableUser.innerHTML = views;
    })

}


window.addEventListener('DOMContentLoaded', ()=>{
    listarPersonas();
})

setInterval(()=>{
    listarPersonas();
}, 500)
