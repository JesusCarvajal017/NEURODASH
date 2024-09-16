window.addEventListener('load', ()=>{
    const listNivles = document.querySelector('.modo-juego tbody'); 
    fetch('../model/Entrenamiento/list_modo_juego.php')
    .then(response => response.json())
    .then(data => {
        data.forEach((modos, i)=>{
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${modos.mdo_juegoid}</td>
                <td>${modos.mdo_nombre}</td>
                <td><i class="fa-solid fa-pen-to-square"></i></td>
            `;

            listNivles.appendChild(row);
        })
    } );

    
})
