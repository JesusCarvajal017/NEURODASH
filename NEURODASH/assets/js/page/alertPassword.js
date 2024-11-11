document.getElementById('confirmSave').addEventListener('click', function(event) {
    event.preventDefault(); 

    const successAlert = document.getElementById('alerta');
    successAlert.style.display = 'flex'; // Hacer visible la alerta
    successAlert.classList.add('des');

    // Redirigir después de 5 segundos
    setTimeout(function() {
        window.location.href = "../forms/login.html";
    }, 3000); // 5000 milisegundos = 5 segundos
});


