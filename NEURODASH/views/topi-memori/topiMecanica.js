
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
const totalMoles = 5; // Número total de topos que se mostrarán
const moleImages = [
    "img/image1.png", 
    "img/image2.png", 
    "img/image3.png", 
    "img/image4.png", 
    "img/image5.png"
];
const flowerImages = [
    "img/plant1.png", 
    "img/plant2.png"
];

window.onload = function() {
    setPresentation();
}

function setPresentation() {
    const presentationDiv = document.getElementById("presentation");
    const loaderDiv = document.getElementById("loaderTop1");
    const loaderDiv2 = document.getElementById("loaderTop2");
    presentationDiv.classList.remove("hidden");
    const board = document.getElementById("board");
    board.style.display = "none";
    loaderDiv2.style.display = "none";
    const puntuacion = document.getElementById("score");
    puntuacion.style.display = "none";





    for (let i = 0; i < totalMoles; i++) {
        let img = document.createElement("img");
        img.src = moleImages[i];
        img.style.width = "200px";
        img.style.margin = "10px";
        presentationDiv.appendChild(img);
    }

    setTimeout(() => {
        presentationDiv.classList.add("hidden");
        loaderDiv.classList.add("hidden");
        board.style.display = "";
        puntuacion.style.display = "";
        loaderDiv2.style.display = "";
        setGame();
    }, 5000);
}

function setGame() {
    const board = document.getElementById("board");
    board.classList.remove("hidden");
    const loaderDiv2 = document.getElementById("loaderTop2");
    const puntuacion = document.getElementById("score");



    
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        board.appendChild(tile);
    }

    // Iniciar el ciclo de mostrar topos y plantas
    setInterval(setMole, 1000); // Cada segundo un nuevo topo
    setInterval(setPlant, 2000); // Cada 2 segundos una nueva planta

    setTimeout(() => {
        loaderDiv2.classList.add("hidden");
        board.style.display = "none";
        puntuacion.classList.add("flotadorText");
       
    }, 15000);
}




function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;

    // Limpiar el tile actual antes de mostrar un nuevo topo
    if (currMoleTile) {
        currMoleTile.innerHTML = ""; // Limpiar el tile del topo
    }

    let num;
    do {
        num = getRandomTile();
    } while (currPlantTile && currPlantTile.id === num); // Evitar superposición con la planta

    currMoleTile = document.getElementById(num);
    let mole = document.createElement("img");
    mole.src = moleImages[Math.floor(Math.random() * moleImages.length)];
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;

    // Limpiar el tile actual antes de mostrar una nueva planta
    if (currPlantTile) {
        currPlantTile.innerHTML = ""; // Limpiar el tile de la planta
    }

    let num;
    do {
        num = getRandomTile();
    } while (currMoleTile && currMoleTile.id === num); // Evitar superposición con el topo

    currPlantTile = document.getElementById(num);
    let plant = document.createElement("img");
    plant.src = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    currPlantTile.appendChild(plant);
}



// function selectTile() {
//     if (gameOver) return;

//     if (this === currMoleTile) {
//         score += 10; // Sumar 10 puntos si es una imagen correcta
//         document.getElementById("score").innerText = score.toString(); // Actualizar puntuación
//         this.innerHTML = ""; // Limpiar el tile
//         currMoleTile = null; // Limpiar el tile del topo
//     } else if (this === currPlantTile) {
//         score -= 10; // Restar 10 puntos si es una imagen incorrecta

//         if (score < 0) {
//             score = 0; // Evitar que el score sea menor a 0
//         }

//         document.getElementById("score").innerText = score.toString(); // Actualizar puntuación
//         this.innerHTML = ""; // Limpiar el tile
//         currPlantTile = null; // Limpiar el tile de la planta
//     }
// }



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

