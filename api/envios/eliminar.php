<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    echo json_encode(["error" => "ID requerido"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM envios WHERE id=?");
    $stmt->execute([$input['id']]);

    echo json_encode(["success" => true]);
} catch(PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}