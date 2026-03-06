<?php

header('Content-Type: application/json');

require_once "../../config/db.php";

try {

    $data = json_decode(file_get_contents("php://input"), true);

    $nombre = $data['nombre'] ?? '';
    $telefono = $data['telefono'] ?? '';
    $correo = $data['correo'] ?? '';

    if (!$nombre || !$telefono || !$correo) {
        echo json_encode([
            "success" => false,
            "mensaje" => "Faltan datos"
        ]);
        exit;
    }

    $sql = "INSERT INTO clientes (nombre, telefono, correo) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $telefono, $correo]);

    echo json_encode([
        "success" => true,
        "mensaje" => "Cliente agregado correctamente"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "mensaje" => $e->getMessage()
    ]);

}