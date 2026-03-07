<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? "";

if ($buscar) {
    $stmt = $pdo->prepare("SELECT * FROM libros WHERE titulo LIKE ? OR autor LIKE ? OR tipo LIKE ? ORDER BY id DESC");
    $stmt->execute(["%$buscar%", "%$buscar%", "%$buscar%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM libros ORDER BY id DESC");
}

echo json_encode($stmt->fetchAll());
?>