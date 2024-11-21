window.addEventListener('load', function() {
    setTimeout(() => {
      document.querySelector('.estilo').classList.add('animate');
    }, 100); // Puedes ajustar el tiempo de espera si lo deseas
  });


  window.onload = function() {
    document.getElementById('loadingScreen').style.display = 'flex';
    // Ocultar la pantalla de carga después de 1 segundo
    setTimeout(function() {
        document.getElementById('loadingScreen').style.display = 'none';
        }, 1000);
    };

// Volver a mostrar la pantalla de carga al salir de la página
    window.onbeforeunload = function() {
        document.getElementById('loadingScreen').style.display = 'flex';
    };
