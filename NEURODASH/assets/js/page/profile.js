const profile = document.getElementById("avatar-modal");
const btn = document.getElementById("abrir-modal");
const closeBtn = document.getElementsByClassName("cerrar")[0];


btn.onclick = function() {
    profile.style.display = "block";
}


closeBtn.onclick = function() {
    profile.style.display = "none";
}


const avatarOptions = document.querySelectorAll('.avatar-option');

avatarOptions.forEach(option => {
    option.addEventListener('click', () => {

        avatarOptions.forEach(item => item.classList.remove('active-scale'));

        option.classList.add('active-scale');
    });
});