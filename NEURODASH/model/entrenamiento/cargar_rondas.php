<?php
header('Content-type:application/json');
require '../db/cxion.php';

$conexionDb = Conexion::getInstance();

// Consulta a la tabla rondas
$consultaRondas = "SELECT * FROM rondas";
$rondasDb = $conexionDb->consultar($consultaRondas);

// Procesa las rondas y valida secuencias
$rondas = [];
foreach ($rondasDb as $fila) {
    $secuenciaProcesada = null;

    // Verifica si la secuencia es JSON o array en formato PostgreSQL
    if (is_string($fila['secuencia'])) {
        if (strpos($fila['secuencia'], '{') === 0) {
            // Manejo de formato `{1,2,3}` de PostgreSQL
            $secuenciaProcesada = array_map(function ($item) {
                return is_numeric($item) ? (int)$item : $item;
            }, str_getcsv(trim($fila['secuencia'], '{}')));
        } else {
            // Manejo de JSON `["a", "b", "c"]`
            $secuenciaProcesada = json_decode($fila['secuencia'], true);
        }
    }

    // Construcción del array de datos
    $rondas[] = [
        "id" => $fila["id"],
        "tiempos" => [
            "tiempoVisual" => [
                "minutos" => (int)$fila["tiempo_visual_minutos"],
                "segundos" => (int)$fila["tiempo_visual_segundos"]
            ],
            "tiempoRonda" => [
                "minutos" => (int)$fila["tiempo_ronda_minutos"],
                "segundos" => (int)$fila["tiempo_ronda_segundos"]
            ]
        ],
        "secuencia" => $secuenciaProcesada
    ];
}

echo json_encode($rondas);

// create table rondas (
//     id bigint primary key generated always as identity,
//     tiempo_visual_minutos int,
//     tiempo_visual_segundos int,
//     tiempo_ronda_minutos int,
//     tiempo_ronda_segundos int,
//     secuencia text[]
//   );
  
//   INSERT INTO rondas (tiempo_visual_minutos, tiempo_visual_segundos, tiempo_ronda_minutos, tiempo_ronda_segundos, secuencia) VALUES
//   (0, 3, 0, 3, ARRAY['h', 'f', 'k']),
//   (0, 4, 0, 5, ARRAY['1', '2', '3', '4']),
//   (0, 5, 0, 6, ARRAY['1', '2', '3', '4', '5']),
//   (0, 6, 0, 7, ARRAY['1', '2', '3', '4', '5', '6']),
//   (0, 8, 0, 9, ARRAY['1', '2', '3', '4', '5', '6', '7']);
  
  
//   select * from rondas