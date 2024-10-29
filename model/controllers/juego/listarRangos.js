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


const tableRangos = document.querySelector('.user-rangos tbody');

function listarRangos(){

    fetch('../../proceso/juego/queryRangos.php')
    .then(response => response.json())
    .then(rangos => {

        let views = "";

        rangos.forEach((rang, i) => {
            views += `
                 <tr>
                    <td>${i + 1}</td>
                    <td>${rang.rgo_nombre}</td>
                    <td>${rang.rgo_exptope}</td>
                    <td>${rang.rgo_multiplicador}</td>  
                    <th><i class="fas fa-edit" onclick="editar(${rang.rgo_id})"></i></th>
                    <th><i class="fas fa-trash" onclick="borrar(${rang.rgo_id})"></i></th>
                </tr>
            `;
        });

        tableRangos.innerHTML = views;
    })

}


window.addEventListener('DOMContentLoaded', ()=>{
    listarRangos();
})


