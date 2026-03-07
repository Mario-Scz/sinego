<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'])) {
    echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
    exit;
}

$id = $input['id'];
$autor = $input['autor'];
$titulo = $input['titulo'];
$codigo = $input['codigo'];
$tipo = $input['tipo'];
$precio = $input['precio'] ?? 0.00;

try {
    $stmt = $pdo->prepare("UPDATE libros SET autor = ?, titulo = ?, codigo = ?, tipo = ?, precio = ? WHERE id = ?");
    $stmt->execute([$autor, $titulo, $codigo, $tipo, $precio, $id]);
    
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>