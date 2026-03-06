<?php

header("Content-Type: application/json");

require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data["nombre"] ?? "";
$telefono = $data["telefono"] ?? "";
$correo = $data["correo"] ?? "";

if(!$nombre || !$telefono || !$correo){
    echo json_encode(["success"=>false,"msg"=>"Datos incompletos"]);
    exit;
}

try{

$sql = "INSERT INTO clientes (nombre,telefono,correo)
        VALUES (:nombre,:telefono,:correo)";

$stmt = $pdo->prepare($sql);

$stmt->execute([
":nombre"=>$nombre,
":telefono"=>$telefono,
":correo"=>$correo
]);

echo json_encode(["success"=>true]);

}catch(PDOException $e){

echo json_encode(["success"=>false,"msg"=>"Error BD"]);

}