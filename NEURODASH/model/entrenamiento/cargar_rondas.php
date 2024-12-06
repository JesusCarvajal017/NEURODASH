<?php
header('Content-Type: application/json');
require '../db/cxion.php';

// Conexión a la base de datos
$conexionDb = Conexion::getInstance();

// Obtener datos del cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

// Validar que se recibieron todos los parámetros
if (!isset($data['idItem']) || !isset($data['idNivel']) || !isset($data['mdo_juegoId'])) {
    echo json_encode(["error" => "Faltan parámetros: idItem, idNivel o mdo_juegoId"]);
    exit;
}

$id_item = (int)$data['idItem'];
$id_nivel = (int)$data['idNivel'];
$id_modo = (int)$data['mdo_juegoId'];

// Función para convertir segundos a minutos y segundos
function getMinutesAndSeconds($seconds)
{
    return [
        'minutos' => floor($seconds / 60),
        'segundos' => $seconds % 60
    ];
}

// Obtener configuración según dificultad y nivel
$sql_dificultades = "SELECT dfi_id, mdo_juegoid, nvel_id, dfi_tiempovista, dfi_tiemporespuesta, dfi_cantidadelemento, dfi_rodas
	FROM public.dificultadentrenamiento
	 where  mdo_juegoid = :id_modo and nvel_id = :id_nivel";

$valores = [
    ":id_nivel" => $id_nivel,
    ":id_modo" => $id_modo
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
$cantidadRondas = (int)$configDificultad['dfi_rodas'];

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
        'secuencia' => $secuencia
    ];
    $rondas[] = $ronda;
}

// Enviar las rondas generadas como respuesta JSON
echo json_encode($rondas);
