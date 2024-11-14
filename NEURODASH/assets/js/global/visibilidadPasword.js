function verPassword(inputId, showPasswordId, hidePasswordId) {
    var passwordInput = document.getElementById(inputId);
    var showPasswordIcon = document.getElementById(showPasswordId); // Ojito normal
    var hidePasswordIcon = document.getElementById(hidePasswordId); // Ojito tachado

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
