<?php
header('Content-Type: application/json');
require '../db/cxion.php';

// Conexión a la base de datos
$conexionDb = Conexion::getInstance();

// Obtener datos del cuerpo de la solicitud
// $data = json_decode(file_get_contents("php://input"), true);

// Validar que se recibieron todos los parámetros
// if (!isset($data['idItem']) || !isset($data['idNivel']) || !isset($data['mdo_juegoId'])) {
//     echo json_encode(["error" => "Faltan parámetros: idItem, idNivel o mdo_juegoId"]);
//     exit;
// }

$id_item = 1;
$id_nivel = 1;
$id_modo = 1;
// $id_item = (int)$data['idItem'];
// $id_nivel = (int)$data['idNivel'];
// $id_modo = (int)$data['mdo_juegoId'];

// Función para convertir segundos a minutos y segundos
function getMinutesAndSeconds($seconds)
{
    return [
        'minutos' => floor($seconds / 60),
        'segundos' => $seconds % 60
    ];
}

// Obtener configuración según dificultad y nivel
$sql_dificultades = " SELECT dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento, dfi_rondas FROM dificultadentrenamiento WHERE nvel_id = :id_nivel AND id_item = :id_item ";
$valores = [
    ":id_item" => $id_item,
    ":id_nivel" => $id_nivel
];
$dificultadData = $conexionDb->consultaIndividual($sql_dificultades, $valores);

if (empty($dificultadData)) {
    echo json_encode(["error" => "No se encontró configuración de dificultad"]);
    exit;
}

// Extraer configuración de la dificultad
$configDificultad = $dificultadData[0];
$tiempoVista = getMinutesAndSeconds((int)$configDificultad['dfi_tiempovista']);
$tiempoRespuesta = getMinutesAndSeconds((int)$configDificultad['dfi_tiemporespuesta']);
$limiteSubitems = (int)$configDificultad['dfi_cantidadelemento'];
$cantidadRondas = (int)$configDificultad['dfi_rondas'];

// Generar las rondas
$rondas = [];
for ($i = 1; $i <= $cantidadRondas; $i++) {
    if ($id_modo === 2) { // Modo "Números"
        $secuencia = array_map(fn() => rand(1, 100), range(1, $limiteSubitems));
    } else { // Modo "Términos"
        $query = "SELECT s.nombre FROM subitem s WHERE s.id_item = :id_item ORDER BY RANDOM() LIMIT :limite";
        $valoresTerminos = [
            ":id_item" => $id_item,
            ":limite" => $limiteSubitems
        ];
        $subitems = $conexionDb->consultaIndividual($query, $valoresTerminos);
        $secuencia = array_column($subitems, 'nombre');
    }

    $ronda = [
        'id' => $i,
        'tiempos' => [
            'tiempoVisual' => $tiempoVista,
            'tiempoRonda' => $tiempoRespuesta
        ],
        'cantidadElementos' => $limiteSubitems,
        'secuencia' => $secuencia
    ];
    $rondas[] = $ronda;
}

// Enviar las rondas generadas como respuesta JSON
echo json_encode($rondas);
