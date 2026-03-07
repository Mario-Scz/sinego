<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// LISTAR CARRITO
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
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// AGREGAR AL CARRITO
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
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// ACTUALIZAR CANTIDAD
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
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// ELIMINAR DEL CARRITO
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
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// VACIAR CARRITO
if ($action === 'clear') {
    try {
        $pdo->query("DELETE FROM carrito");
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

// CONTAR ITEMS
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