<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id_libro'], $input['autor'], $input['tipo_envio'])) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO envios (id_libro, autor, tipo_envio) VALUES (?, ?, ?)");
    $stmt->execute([
        $input['id_libro'],
        $input['autor'],
        $input['tipo_envio']
    ]);

    echo json_encode([
        "success" => true,
        "id" => $pdo->lastInsertId()
    ]);
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}