window.addEventListener('load', ()=>{
    const listNivles = document.querySelector('.dificultades-list tbody'); 
    fetch('../model/Entrenamiento/list_dificultades.php')
    .then(response => response.json())
    .then(data => {
        data.forEach((dfclta, i)=>{
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${dfclta.dfi_id}</td>
                <td>${dfclta.mdo_nombre}</td>
                <td>${dfclta.nvel_nombre}</td>
                <td>${dfclta.dfi_tiempovista}</td>
                <td>${dfclta.dfi_tiemporespuesta}</td>
                <td>${dfclta.dfi_cantidadelemento}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
            `;

            listNivles.appendChild(row);
        })
    } );

    
})