function showSection(seccionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.seccion');
    sections.forEach(section => section.classList.remove('active'));

    // Mostrar la sección seleccionada
    const activeSection = document.getElementById(seccionId);
    activeSection.classList.add('active');
}


function showPage(page) {
    // Ocultar todas las páginas
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'none';

    
    // Mostrar la página seleccionada
    document.getElementById('page' + page).style.display = 'block';
}

// Mostrar la primera página al cargar
showPage(1);