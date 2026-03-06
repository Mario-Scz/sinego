<?php
header("Content-Type: application/json");
require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$codigo = $data["codigo"] ?? "";
$autor = $data["autor"] ?? "";
$titulo = $data["titulo"] ?? "";
$tipo = $data["tipo"] ?? "";

if (!$codigo || !$autor || !$titulo || !$tipo) {
    echo json_encode(["success"=>false,"error"=>"Datos incompletos"]);
    exit;
}

try {

    $stmt = $conn->prepare("INSERT INTO catalogo (codigo, autor, titulo, tipo) VALUES (?, ?, ?, ?)");
    $stmt->execute([$codigo,$autor,$titulo,$tipo]);

    echo json_encode([
        "success"=>true,
        "id"=>$conn->lastInsertId()
    ]);

} catch(PDOException $e){

    echo json_encode([
        "success"=>false,
        "error"=>$e->getMessage()
    ]);

}