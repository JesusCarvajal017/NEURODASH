<?php
// Datos "quemados" simulados
$jugadores = [
    ['nombre' => 'Jesus', 'puntuacion' => 1200.50],
    ['nombre' => 'Natalia', 'puntuacion' => 1100.75],
    ['nombre' => 'Trespalacios', 'puntuacion' => 1050.25],
    ['nombre' => 'Guerrero', 'puntuacion' => 1000.25]
];

// Devolver los datos simulados como JSON
echo json_encode($jugadores);
