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

$configPath = __DIR__ . '/../config/db.php';
if (!file_exists($configPath)) {
    $configPath = __DIR__ . '/../../config/db.php';
}

if (!file_exists($configPath)) {
    echo json_encode(['success' => false, 'error' => 'Configuración no encontrada']);
    exit;
}

try {
    require_once $configPath;
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $e->getMessage()]);
    exit;
}

if (!isset($pdo)) {
    echo json_encode(['success' => false, 'error' => 'PDO no está definido']);
    exit;
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';

if ($action === 'list') {
    try {
        $stmt = $pdo->query("
            SELECT c.*, l.titulo, l.autor, l.precio 
            FROM carrito c 
            LEFT JOIN libros l ON c.id_libro = l.id 
            ORDER BY c.id DESC
        ");
        $items = $stmt->fetchAll();
        echo json_encode(['success' => true, 'items' => $items]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en consulta: ' . $e->getMessage()]);
    }
    exit;
}

if ($action === 'add') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['id'])) {
        echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
        exit;
    }
    $id = $input['id'];
    $tipo = $input['tipo'] ?? 'libro';
    try {
        $stmt = $pdo->prepare("SELECT * FROM carrito WHERE id_libro = ? AND tipo = ?");
        $stmt->execute([$id, $tipo]);
        $existe = $stmt->fetch();
        if ($existe) {
            $nuevaCantidad = $existe['cantidad'] + 1;
            $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ? WHERE id = ?");
            $stmt->execute([$nuevaCantidad, $existe['id']]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO carrito (id_libro, tipo, cantidad) VALUES (?, ?, 1)");
            $stmt->execute([$id, $tipo]);
        }
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al agregar: ' . $e->getMessage()]);
    }
    exit;
}

if ($action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['product_id']) || !isset($input['cantidad'])) {
        echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
        exit;
    }
    $id = $input['product_id'];
    $cantidad = $input['cantidad'];
    try {
        $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ? WHERE id = ?");
        $stmt->execute([$cantidad, $id]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al actualizar: ' . $e->getMessage()]);
    }
    exit;
}

if ($action === 'remove') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input || !isset($input['product_id'])) {
        echo json_encode(['success' => false, 'error' => 'Datos inválidos']);
        exit;
    }
    $id = $input['product_id'];
    try {
        $stmt = $pdo->prepare("DELETE FROM carrito WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al eliminar: ' . $e->getMessage()]);
    }
    exit;
}

if ($action === 'clear') {
    try {
        $pdo->query("DELETE FROM carrito");
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error al vaciar: ' . $e->getMessage()]);
    }
    exit;
}

if ($action === 'count') {
    try {
        $stmt = $pdo->query("SELECT SUM(cantidad) as total FROM carrito");
        $data = $stmt->fetch();
        echo json_encode(['total' => $data['total'] ?? 0]);
    } catch (PDOException $e) {
        echo json_encode(['total' => 0]);
    }
    exit;
}

echo json_encode(['success' => false, 'error' => 'Acción inválida']);
?>