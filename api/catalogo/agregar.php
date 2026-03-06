<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['autor'], $input['tipo'], $input['id_libro'])) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

try {

$stmt = $pdo->prepare("INSERT INTO catalogo (autor, tipo, id_libro) VALUES (?, ?, ?)");

$stmt->execute([
    $input['autor'],
    $input['tipo'],
    $input['id_libro']
]);

echo json_encode([
    "success" => true,
    "id" => $pdo->lastInsertId()
]);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}