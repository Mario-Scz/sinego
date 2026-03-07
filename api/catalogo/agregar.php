<?php
header('Content-Type: application/json');

require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['codigo'], $input['autor'], $input['titulo'], $input['tipo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO libros (codigo, autor, titulo, tipo, precio)
        VALUES (?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $input['codigo'],
        $input['autor'],
        $input['titulo'],
        $input['tipo'],
        $input['precio'] ?? 0.00
    ]);

    echo json_encode([
        'success' => true,
        'id' => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>