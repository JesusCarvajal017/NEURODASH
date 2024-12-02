<?php
header('Content-type:application/json');
require '../db/cxion.php';

$conexionDb = Conexion::getInstance();

// Obtener el valor de id_item desde los parámetros GET $id_item = 6;
$id_item = isset($_GET['id_item']) ? intval($_GET['id_item']) : 0;

// Consulta SQL con parámetro preparado
$cnsltaSubItem = "SELECT nombre FROM SubItem WHERE id_item = :id_item";

$values = [
    ":id_item" => $id_item
];
$dataSubItem = $conexionDb->consultaIndividual($cnsltaSubItem, $values);

// Codificación de resultados en JSON
echo json_encode($dataSubItem);
