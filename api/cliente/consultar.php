<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? "";

if ($buscar) {
    $stmt = $pdo->prepare("SELECT * FROM clientes WHERE nombre LIKE ? OR correo LIKE ? ORDER BY id DESC");
    $stmt->execute(["%$buscar%", "%$buscar%"]);
} else {
    $stmt = $pdo->query("SELECT * FROM clientes ORDER BY id DESC");
}

echo json_encode($stmt->fetchAll());