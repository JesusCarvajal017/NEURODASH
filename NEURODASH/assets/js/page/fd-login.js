
const sign_in_btn = document.getElementById('sign-in-btn');
const sign_up_btn = document.getElementById('sign-up-btn');

const container  = document.querySelector('.container-forms');

const sign_in_btn2 = document.getElementById('sign-in-btn2');
const sign_up_btn2 = document.getElementById('sign-up-btn2');

sign_up_btn.addEventListener('click', ()=>{
    container.classList.add('sign-up-mode');
})

sign_in_btn.addEventListener('click', ()=>{
    container.classList.remove('sign-up-mode');
})

sign_up_btn2.addEventListener('click', ()=>{
    container.classList.add('sign-up-mode2');
})

sign_in_btn2.addEventListener('click', ()=>{
    container.classList.remove('sign-up-mode2');
})


