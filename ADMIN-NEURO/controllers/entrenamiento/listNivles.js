window.addEventListener('load', ()=>{
    const listNivles = document.querySelector('.nivles-info tbody'); 
    fetch('../model/Entrenamiento/listNivles.php')
    .then(response => response.json())
    .then(data => {
        data.forEach((niveles, i)=>{
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${niveles.nvel_id}</td>
                <td>${niveles.nvel_nombre}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
            `;

            listNivles.appendChild(row);
        })
    } );

    
})
