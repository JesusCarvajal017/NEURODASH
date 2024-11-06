
// const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
const bodytoadt = document.querySelector('.toast-body');

const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

function alerttoast(mensage){
    bodytoadt.textContent = mensage;
    toastBootstrap.show()
}

export {
    toastLiveExample, 
    bodytoadt, 
    toastBootstrap, 
    alerttoast
}