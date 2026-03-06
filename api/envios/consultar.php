<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

try {
    $stmt = $pdo->query("SELECT * FROM envios");
    $datos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($datos);
} catch(PDOException $e){
    echo json_encode(["error"=>$e->getMessage()]);
}