
    config = [
        {"dificultad": "facil", "canitidadElementos": 5, "cantidadMalos": 4, "tiempoVista": 5, "tiempoJuego": 15, "rondas":5},
        {"dificultad": "medio", "canitidadElementos": 10, "cantidadMalos": 9, "tiempoVista": 15, "tiempoJuego": 25, "rondas":5},
        {"dificultad": "dificil", "canitidadElementos": 15, "cantidadMalos": 14, "tiempoVista": 25, "tiempoJuego": 35, "rondas":5}
    ]


    const moleImages = [
        "img/image1.png", 
        "img/image2.png", 
        "img/image3.png", 
        "img/image4.png", 
        "img/image5.png",
        "img/image6.png",
        "img/image7.png",
        "img/image8.png",
        "img/image9.png",
        "img/image10.png",
        "img/image11.png",
        "img/image12.png",
        "img/image13.png",
        "img/image14.png",
        "img/image15.png"
    ];
    
    const flowerImages = [
        "img/plant1.png", 
        "img/plant2.png",
        "img/plant3.png", 
        "img/plant4.png", 
        "img/plant5.png", 
        "img/plant6.png", 
        "img/plant7.png", 
        "img/plant8.png", 
        "img/plant9.png", 
        "img/plant10.png", 
        "img/plant11.png", 
        "img/plant12.png", 
        "img/plant13.png", 
        "img/plant14.png"

    ];


    let currMoleTile;
    let currPlantTile;
    let score = 0;
    let gameOver = false;
    const difficulty = localStorage.getItem('difficulty'); 
    const loaderDiv = document.getElementById("relojTop");
    const presentationDiv = document.getElementById("presentation");
    // const btnHome = document.getElementById("ocul");


    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    const loaderDiv2 = document.getElementById("relojTop2");
    const board = document.getElementById("board");
    const puntuacion = document.getElementById("score");

    const minutesElement2 = document.getElementById('minutes2');
    const secondsElement2 = document.getElementById('seconds2');

    config.forEach(element => {

        if(element.dificultad === difficulty){
            const totalMoles = element.canitidadElementos;
            
            ImagenVista();
            cuentaRegresiva(0, element.tiempoVista, finalizarCuentaRegresiva);

            
            function cuentaRegresiva(minutos, segundos, callback) {
            
                let timeLeftMinutes = minutos; 
                let timeLeftSeconds = segundos; 
            
                const countdown = setInterval(() => {
                    if (timeLeftSeconds > 0) {
                        timeLeftSeconds--;
                    } else if (timeLeftMinutes > 0) {
                        timeLeftMinutes--;
                        timeLeftSeconds = 59; 
                    } else {
                        clearInterval(countdown);
                        minutesElement.textContent = '00';
                        secondsElement.textContent = '00';
                        callback(); // Ejecuta la función de callback
                        return; // Termina la función aquí
                    }
                
                    minutesElement.textContent = String(timeLeftMinutes).padStart(2, '0');
                    secondsElement.textContent = String(timeLeftSeconds).padStart(2, '0');
                }, 1000);
            }

            function finalizarCuentaRegresiva() {
                presentationDiv.classList.add("hidden");
                loaderDiv.classList.add("hidden");
                // Llama a la función que desees ejecutar después
                setGame();
            }

            
            function ImagenVista() {
                for (let i = 0; i < totalMoles; i++) {
                    let img = document.createElement("img");
                    img.src = moleImages[i];
                    // img.classList.add('imgMuestra');
                    // img.style.width = "200px";
                    // img.style.margin = "10px";
                    presentationDiv.appendChild(img);
                }
            }

            
            function setGame() {
            
                board.classList.remove("hidden");
                loaderDiv2.classList.remove('hidden');
                puntuacion.classList.remove('hidden')

                crearTunel();
                temporizador2(0, element.tiempoJuego, finalizarTemporizador);
            }
    
            function crearTunel() {
                for (let i = 0; i < 9; i++) {
                    let tile = document.createElement("div");
                    tile.id = i.toString();
                    tile.addEventListener("click", selectTile);
                    board.appendChild(tile);
                }
            }
    
            function temporizador2(minutos, segundos, callback) {
                let timeLeftMinutes = minutos; 
                let timeLeftSeconds = segundos; 
            
                setInterval(setMole, 1000); // Cada segundo un nuevo topo
                setInterval(setPlant, 2000); // Cada 2 segundos una nueva planta
            
            
                const countdown = setInterval(() => {
                    if (timeLeftSeconds > 0) {
                        timeLeftSeconds--;
                    } else if (timeLeftMinutes > 0) {
                        timeLeftMinutes--;
                        timeLeftSeconds = 59; 
                    } else {
                        clearInterval(countdown); // Detiene el contador
                        minutesElement2.textContent = '00';
                        secondsElement2.textContent = '00';
                        callback(); // Llama a la función de callback
                        return; // Termina la función aquí
                    }
                
                    minutesElement2.textContent = String(timeLeftMinutes).padStart(2, '0');
                    secondsElement2.textContent = String(timeLeftSeconds).padStart(2, '0');
                }, 1000);
            }

            function finalizarTemporizador() {
                loaderDiv2.classList.add("hidden");
                board.classList.add("hidden");
                // btnHome.classList.remove("hidden");

                setInterval(() => {
                    window.location.href = "../home.html"; // Redirige a la interfaz del juego
                }, 4000);
            }
            
            
            function getRandomTile() {
                return Math.floor(Math.random() * 9).toString();
            }

            function setItem(itemType) {
                if (gameOver) return;
                
                // Limpiar el tile actual antes de mostrar un nuevo item
                let currTile = itemType === "mole" ? currMoleTile : currPlantTile;
                if (currTile) {
                    currTile.innerHTML = ""; // Limpiar el tile del item
                }

                let num;
                do {
                    num = getRandomTile();
                } while ((itemType === "mole" && currPlantTile?.id === num) || 
                         (itemType === "plant" && currMoleTile?.id === num)); // Evitar superposición

                currTile = document.getElementById(num);
                let img = document.createElement("img");
                img.src = itemType === "mole" 
                    ? moleImages[Math.floor(Math.random() * moleImages.length)] 
                    : flowerImages[Math.floor(Math.random() * flowerImages.length)];
                currTile.appendChild(img);

                // Actualiza la variable correspondiente
                if (itemType === "mole") {
                    currMoleTile = currTile;
                } else {
                    currPlantTile = currTile;
                }
            }
    
            function setMole() {
            setItem("mole");
            }

            function setPlant() {
            setItem("plant");
            }
    
            
            let scoreHistory = []; // Array para almacenar el historial de puntajes

            function selectTile() {
            if (gameOver) return;
            
            if (this === currMoleTile) {
                score += 10; // Sumar 10 puntos si es una imagen correcta
                scoreHistory.push(score); // Almacenar el nuevo puntaje en el historial
                document.getElementById("score").innerText = score.toString(); // Actualizar puntuación
                this.innerHTML = ""; // Limpiar el tile
                currMoleTile = null; // Limpiar el tile del topo
            } else if (this === currPlantTile) {
                score -= 10; // Restar 10 puntos si es una imagen incorrecta
            
                if (score < 0) {
                    score = 0; // Evitar que el score sea menor a 0
                }
            
                scoreHistory.push(score); // Almacenar el nuevo puntaje en el historial
                document.getElementById("score").innerText = score.toString(); // Actualizar puntuación
                this.innerHTML = ""; // Limpiar el tile
                currPlantTile = null; // Limpiar el tile de la planta
            }

            console.log(scoreHistory); // Imprimir el historial de puntajes en la consola
            }

        }
    });

   


    