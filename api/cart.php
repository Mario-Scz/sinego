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

require_once $configPath;

$action = $_GET['action'] ?? '';

// LISTAR PRODUCTOS
if ($action === 'list') {
    try {
        $stmt = $pdo->query("SELECT c.*, l.titulo, l.autor, l.precio FROM carrito c LEFT JOIN libros l ON c.id_libro = l.id ORDER BY c.id DESC");
        $items = $stmt->fetchAll();
        echo json_encode(['success' => true, 'items' => $items]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// AGREGAR PRODUCTO (Esta es la parte que se te había roto)
if ($action === 'add') {
    $input = json_decode(file_get_contents('php://input'), true);
    $id_libro = $input['id'] ?? null;
    if ($id_libro) {
        $stmt = $pdo->prepare("SELECT * FROM carrito WHERE id_libro = ?");
        $stmt->execute([$id_libro]);
        $existe = $stmt->fetch();
        if ($existe) {
            $stmt = $pdo->prepare("UPDATE carrito SET cantidad = cantidad + 1 WHERE id = ?");
            $stmt->execute([$existe['id']]);
        } else {
            $stmt = $pdo->prepare("INSERT INTO carrito (id_libro, cantidad) VALUES (?, 1)");
            $stmt->execute([$id_libro]);
        }
        echo json_encode(['success' => true]);
    }
    exit;
}

// ACTUALIZAR CANTIDAD (Bajar/Subir unidades)
if ($action === 'update') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['product_id'], $input['cantidad'])) {
        $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ? WHERE id = ?");
        $stmt->execute([$input['cantidad'], $input['product_id']]);
        echo json_encode(['success' => true]);
    }
    exit;
}

// ELIMINAR DE LA TABLA
if ($action === 'remove') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (isset($input['product_id'])) {
        $stmt = $pdo->prepare("DELETE FROM carrito WHERE id = ?");
        $stmt->execute([$input['product_id']]);
        echo json_encode(['success' => true]);
    }
    exit;
}

// CONTADOR Y VACIAR
if ($action === 'count') {
    $stmt = $pdo->query("SELECT SUM(cantidad) as total FROM carrito");
    $data = $stmt->fetch();
    echo json_encode(['total' => $data['total'] ?? 0]);
    exit;
}

if ($action === 'clear') {
    $pdo->query("DELETE FROM carrito");
    echo json_encode(['success' => true]);
    exit;
}
?>