<?php

header("Content-Type: application/json");

require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? "";
$nombre = $data["nombre"] ?? "";
$telefono = $data["telefono"] ?? "";
$correo = $data["correo"] ?? "";

if(!$id){
echo json_encode(["success"=>false]);
exit;
}

try{

$sql = "UPDATE clientes
        SET nombre=:nombre,
            telefono=:telefono,
            correo=:correo
        WHERE id=:id";

$stmt = $pdo->prepare($sql);

$stmt->execute([
":id"=>$id,
":nombre"=>$nombre,
":telefono"=>$telefono,
":correo"=>$correo
]);

echo json_encode(["success"=>true]);

}catch(PDOException $e){

echo json_encode(["success"=>false]);

}