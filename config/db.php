<?php
// Configuración de base de datos
// Si existe un archivo .env en la raíz del proyecto, cargará variables desde allí
// De lo contrario, usa los valores por defecto.

// Intentar cargar archivo .env si existe
if (file_exists(__DIR__ . '/../.env')) {
    $envPath = __DIR__ . '/../.env';
    foreach (file($envPath) as $line) {
        if (strpos(trim($line), '#') === 0) continue; // ignorar comentarios
        if (empty(trim($line))) continue; // ignorar líneas vacías
        [$key, $val] = explode('=', $line, 2) + [null, null];
        if ($key) {
            putenv(trim($key) . '=' . trim($val));
        }
    }
}

$host = getenv('DB_HOST') ?: 'sql3.freesqldatabase.com';
$db   = getenv('DB_NAME') ?: 'sql3818944';
$user = getenv('DB_USER') ?: 'sql3818944';
$pass = getenv('DB_PASS') ?: 't9YcpBF2Sn';
$port = getenv('DB_PORT') ?: 3306;
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die('Error de conexión a la base de datos.');
}