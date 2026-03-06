<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = isset($_GET['buscar']) ? "%{$_GET['buscar']}%" : "%";

try {
    $stmt = $pdo->prepare("SELECT * FROM imprenta WHERE idLibro LIKE ? OR autor LIKE ? OR tipoImpresion LIKE ? ORDER BY id ASC");
    $stmt->execute([$buscar, $buscar, $buscar]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}