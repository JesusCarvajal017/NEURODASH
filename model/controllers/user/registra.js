
const formRegistra = document.querySelector('.registrarUsuario');
const cerrarModalR = document.querySelector('.closeRegiste');


formRegistra.addEventListener('submit', (event)=>{
    event.preventDefault();

    // valores a recolectar
    let aliasUsuario = document.getElementById('txtAlias').value;
    let emailUsuario = document.getElementById('txtEmail').value;
    let expUsuario = parseFloat(document.getElementById('numberExperiencia').value);
    let rgoUsuario = parseFloat(document.getElementById('rangoUsuario').value);
    let tipoUsuario = parseFloat(document.getElementById('tipoUsuario').value) ;

    const dataRegistra = {
        aliasUsuario, 
        emailUsuario,
        expUsuario,
        rgoUsuario,
        tipoUsuario
    };

    fetch('../../proceso/usuario/registrarUser.php', {
        method: 'POST',
        headers :  {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataRegistra)
    })
    .then(response => response.json())
    .then(info => {
        console.log(info)
        if(info.status == 'ok'){
            cerrarModalR.click();
            listarPersonas();
        }
    })


})







