
const btnModal = document.querySelector('.modalRegistar');
const btnRegistra = document.querySelector('.registarPerson');
const formRegistrda = document.querySelector('.registrarUsuario')


const tipoUsuarioSel = document.querySelector('#tipoUsuario');
const rangosSel = document.querySelector('#rangoUsuario');



function tipoUsuario(dom){
    fetch('../../proceso/infoSys/tipoUsuario.php')
    .then(response => response.json())
    .then(data => {
        let html = "";
        data.forEach(element => {
            html += `
               <option value="${element.tp_user_id}">${element.tp_user_name}</option>
           `;
            
        });

        dom.innerHTML = html;
    })
}

function rango(dom){
    fetch('../../proceso/infoSys/rangos.php')
    .then(response => response.json())
    .then(data => {
        let html = "";
        data.forEach(element => {
            html += `
               <option value="${element.rgo_id}">${element.rgo_nombre}</option>
           `;
            
        });

        dom.innerHTML = html;
        
    })
}


btnRegistra.addEventListener('click', ()=>{
    formRegistrda.reset();
    tipoUsuario(tipoUsuarioSel);
    rango(rangosSel);
    btnModal.click();

})

