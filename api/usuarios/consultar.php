<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? '';

try {

    if ($buscar) {

        $stmt = $pdo->prepare("SELECT * FROM usuarios 
        WHERE usuario LIKE ? 
        OR contraseña LIKE ?");

        $stmt->execute([
            "%$buscar%",
            "%$buscar%"
        ]);

    } else {

        $stmt = $pdo->query("SELECT * FROM usuarios ORDER BY id DESC");

    }

    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($usuarios);

} catch (PDOException $e) {

    echo json_encode([
        "error" => $e->getMessage()
    ]);

}