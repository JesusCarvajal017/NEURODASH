import { elemnts } from '../global/elements.js';

// importar elementos de global
const {
    modalCondiciones,
    loginInvit,
    start,
    } = elemnts;

// funcionalidades 
document.querySelector('.button-play').addEventListener('click', ()=>{
    document.querySelector('.login-start').classList.remove('disabled');
    start.classList.add('disabled')
    setTimeout(()=>{
        document.querySelector('.login-start').classList.add('disabled');
        loginInvit.classList.remove('disabled');
        modalCondiciones.click();
    },500)

})