function verPassword() {
    var passwordInput = document.getElementById("txtUserpasswordA");
    var showPasswordIcon = document.getElementById("showPassword"); // Ojo normal
    var hidePasswordIcon = document.getElementById("hidePassword"); // Ojo tachado

    if (passwordInput.type === "password") {
        passwordInput.type = "text"; 
        hidePasswordIcon.style.display = "none"; 
        showPasswordIcon.style.display = "inline"; 
    } else {
        passwordInput.type = "password"; 
        hidePasswordIcon.style.display = "inline";
        showPasswordIcon.style.display = "none";
    }
}
