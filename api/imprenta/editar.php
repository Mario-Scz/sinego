<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'], $input['idLibro'], $input['autor'], $input['tipo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE imprenta SET idLibro = ?, autor = ?, tipoImpresion = ? WHERE id = ?");
    $stmt->execute([$input['idLibro'], $input['autor'], $input['tipo'], $input['id']]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}