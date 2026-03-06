<?php
session_start();
require '../../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit;
}

$id = $_POST['id'] ?? '';

$stmt = $pdo->prepare("DELETE FROM clientes WHERE id=?");
$stmt->execute([$id]);

echo json_encode(["success"=>true]);