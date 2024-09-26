
function showSection(seccionId) {
    const currentActive = document.querySelector('.seccion.active');

    if (currentActive) {
        currentActive.classList.add('exit-animation');

        setTimeout(() => {
            currentActive.classList.remove('active', 'exit-animation');

            const nextSection = document.getElementById(seccionId);
            nextSection.classList.add('active', 'enter-animation');
        }, 2500); 
    } else {
        const nextSection = document.getElementById(seccionId);
        nextSection.classList.add('active', 'enter-animation');
    }
}
