
let countdownElement = document.getElementById("countdown");
let time = 5; 

const countdownInterval = setInterval(() => {
  countdownElement.textContent = time; 
  time--;

  if (time < 0) {
    clearInterval(countdownInterval); 
    countdownElement.textContent = "¡Listo!"; 
    countdownElement.style.color = "#32cd32"; 
  }
}, 1000); 
