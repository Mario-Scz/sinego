<?php
header('Content-Type: application/json');
require_once "../../config/db.php"; // Ajusta según tu estructura de carpetas

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['nombre'], $input['telefono'], $input['correo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO clientes (nombre, telefono, correo) VALUES (?, ?, ?)");
    $stmt->execute([$input['nombre'], $input['telefono'], $input['correo']]);
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}