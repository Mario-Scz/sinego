<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

error_reporting(E_ALL);
ini_set('display_errors', 0);

// Conexión a la base de datos
$configPath = __DIR__ . '/../config/db.php';
if (!file_exists($configPath)) $configPath = __DIR__ . '/../../config/db.php';

try {
    require_once $configPath;
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión']);
    exit;
}

// Determinar la acción
$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true);
if ($input && isset($input['action'])) {
    $action = $input['action'];
}

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT c.id, c.id_libro, c.cantidad, l.titulo, l.autor, l.precio 
                             FROM carrito c 
                             LEFT JOIN libros l ON c.id_libro = l.id 
                             ORDER BY c.id DESC");
        echo json_encode(['success' => true, 'items' => $stmt->fetchAll()]);
        break;

    case 'update':
        if (isset($input['product_id'], $input['cantidad'])) {
            $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ? WHERE id = ?");
            $ok = $stmt->execute([$input['cantidad'], $input['product_id']]);
            echo json_encode(['success' => $ok]);
        }
        break;

    case 'remove':
        if (isset($input['product_id'])) {
            $stmt = $pdo->prepare("DELETE FROM carrito WHERE id = ?");
            $ok = $stmt->execute([$input['product_id']]);
            echo json_encode(['success' => $ok]);
        }
        break;

    case 'count':
        $stmt = $pdo->query("SELECT SUM(cantidad) as total FROM carrito");
        $data = $stmt->fetch();
        echo json_encode(['total' => $data['total'] ?? 0]);
        break;

    case 'clear':
        $pdo->query("DELETE FROM carrito");
        echo json_encode(['success' => true]);
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Acción no válida']);
}