window.addEventListener('load', ()=>{
    const listNivles = document.querySelector('.dificultades-list tbody'); 
    fetch('../model/modal.html')
    .then(response => response.text())
    .then(html => {
        console.log(html);
    })

    
})