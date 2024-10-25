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
                    <th><i class="fas fa-edit" onclick="editar()"></i></th>
                    <th><i class="fas fa-trash" onclick="borrar()"></i></th>
                </tr>
            `;
        });

        tableUser.innerHTML = views;
    })

}

function editar(){
    alert('edita')
}
function borrar(){
    alert('borrar')
}

window.addEventListener('DOMContentLoaded', ()=>{
    listarPersonas();
})


