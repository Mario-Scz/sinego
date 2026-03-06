<?php

header("Content-Type: application/json");

require_once("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$codigo = $data["codigo"] ?? "";
$autor = $data["autor"] ?? "";
$titulo = $data["titulo"] ?? "";
$tipo = $data["tipo"] ?? "";

if(!$codigo || !$autor || !$titulo || !$tipo){
    echo json_encode([
        "success"=>false,
        "error"=>"Datos incompletos"
    ]);
    exit;
}

$stmt = $conn->prepare("
INSERT INTO libros (codigo, autor, titulo, tipo)
VALUES (?, ?, ?, ?)
");

$ok = $stmt->execute([
    $codigo,
    $autor,
    $titulo,
    $tipo
]);

if($ok){
    echo json_encode([
        "success"=>true
    ]);
}else{
    echo json_encode([
        "success"=>false,
        "error"=>"No se pudo insertar"
    ]);
}