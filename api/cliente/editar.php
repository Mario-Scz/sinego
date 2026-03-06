<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['id'], $input['nombre'], $input['telefono'], $input['correo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE clientes SET nombre = ?, telefono = ?, correo = ? WHERE id = ?");
    $stmt->execute([$input['nombre'], $input['telefono'], $input['correo'], $input['id']]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}