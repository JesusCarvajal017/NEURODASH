const container = document.querySelector('.container');

// "mdo_juego": "numeros",
// "dificultad": "facil",
// "datos_cantidad": 6, 
// "tiempo_vista": 50,
// "tiempo_respuesta" : 60,
// "ptn_termino": 100,
// "bno_tiempo": 50,
// "cantidad_jugadores" : 10,


fetch('assets/json/dataPartida.json')
.then(response => response.json())
.then(data=>{

    const data_partida = data[0];

    // valors por defecto partida
    let ptj_termin = data_partida.ptn_termino;
    let tmax = data_partida.tiempo_respuesta;
    let bno = data_partida.bno_tiempo;

    function puntaje(rtaTime, aciertos){
        let localPoinst = aciertos == 0 ? 0 : (aciertos * ptj_termin) + (((tmax - rtaTime)/tmax)*bno) ;
        return localPoinst; 
    }

    let list_jugadores = "<div class='col-12 row'>";

    data.forEach(info =>{
        info.data_jugadores.forEach(jugadores =>{
            let aciertos = jugadores.aciertos;
            let timeRespuesta = jugadores.tiempo_respuesta;

            list_jugadores+= `
                <div class='col-8'>${jugadores.name_jugador}</div>
                <div class='col-4'>${puntaje(timeRespuesta, aciertos)}</div>

            `;
        })
    })

    list_jugadores += `</div>`;

    container.innerHTML = list_jugadores;
    
})


console.log(container)

// function puntaje(){
    

// }


