
function showPage2(page) {
    // Ocultar todas las páginas
    document.getElementById('pagee1').style.display = 'none';
    document.getElementById('pagee2').style.display = 'none';

    
    // Mostrar la página seleccionada
    document.getElementById('pagee' + page).style.display = 'block';
}

// Mostrar la primera página al cargar
showPage2(1);