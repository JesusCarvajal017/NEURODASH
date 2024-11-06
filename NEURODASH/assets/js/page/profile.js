const profile = document.getElementById("avatar-modal");
const btn = document.getElementById("abrir-modal");
const closeBtn = document.getElementsByClassName("cerrar")[0];


btn.onclick = function() {
    profile.style.display = "block";
}


closeBtn.onclick = function() {
    profile.style.display = "none";
}


