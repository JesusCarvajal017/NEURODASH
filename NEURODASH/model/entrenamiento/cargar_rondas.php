<?php
header('Content-Type: application/json');

// Aquí podrías obtener las rondas desde una base de datos, archivo, etc.
// Para el ejemplo, se crearán rondas estáticas.
$rondas = [
    [
        'id' => 1,
        'tiempos' => [
            'tiempoVisual' => ['minutos' => 0, 'segundos' => 3],
            'tiempoRonda' => ['minutos' => 0, 'segundos' => 3]
        ],
        'secuencia' => ['h', 'f', 'k']
    ],
    [
        'id' => 2,
        'tiempos' => [
            'tiempoVisual' => ['minutos' => 0, 'segundos' => 4],
            'tiempoRonda' => ['minutos' => 0, 'segundos' => 5]
        ],
        'secuencia' => [1, 2, 3, 4]
    ],
    [
        'id' => 3,
        'tiempos' => [
            'tiempoVisual' => ['minutos' => 0, 'segundos' => 5],
            'tiempoRonda' => ['minutos' => 0, 'segundos' => 6]
        ],
        'secuencia' => [1, 2, 3, 4, 5]
    ],
    [
        'id' => 4,
        'tiempos' => [
            'tiempoVisual' => ['minutos' => 0, 'segundos' => 6],
            'tiempoRonda' => ['minutos' => 0, 'segundos' => 7]
        ],
        'secuencia' => [1, 2, 3, 4, 5, 6]
    ],
    [
        'id' => 5,
        'tiempos' => [
            'tiempoVisual' => ['minutos' => 0, 'segundos' => 8],
            'tiempoRonda' => ['minutos' => 0, 'segundos' => 9]
        ],
        'secuencia' => [1, 2, 3, 4, 5, 6, 7]
    ],
];

echo json_encode($rondas);