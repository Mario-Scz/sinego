<?php
// Uso: php scripts/create_admin.php usuario password nombre email
require_once __DIR__ . '/../config/db.php';

$argv = $_SERVER['argv'];
if (count($argv) < 3) {
    echo "Uso: php create_admin.php usuario password [nombre] [email]\n";
    exit(1);
}
$usuario = $argv[1];
$password = $argv[2];
$nombre = $argv[3] ?? 'Administrador';
$email = $argv[4] ?? 'admin@example.com';

$hash = password_hash($password, PASSWORD_DEFAULT);
try {
    $stmt = $pdo->prepare('INSERT INTO usuarios (usuario, contraseña, role, nombre, email) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$usuario, $hash, 'admin', $nombre, $email]);
    echo "Admin creado con usuario: $usuario\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
