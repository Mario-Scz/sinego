<?php
/**
 * favorites.php
 * Maneja favoritos del usuario autenticado.
 * Recibe JSON {action, product_id}
 * actions: add, remove, list
 */
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/db.php';
session_start();

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}

$usuario_id = $_SESSION['id'];
$input = json_decode(file_get_contents('php://input'), true) ?: $_GET;
$action = $input['action'] ?? '';

try {
    switch ($action) {
        case 'add':
            $prod = intval($input['product_id'] ?? 0);
            if (!$prod) throw new Exception('product_id faltante');
            $stmt = $pdo->prepare('INSERT IGNORE INTO favoritos (usuario_id, producto_id) VALUES (?, ?)');
            $stmt->execute([$usuario_id, $prod]);
            echo json_encode(['success' => true]);
            break;
        case 'remove':
            $prod = intval($input['product_id'] ?? 0);
            if (!$prod) throw new Exception('product_id faltante');
            $stmt = $pdo->prepare('DELETE FROM favoritos WHERE usuario_id = ? AND producto_id = ?');
            $stmt->execute([$usuario_id, $prod]);
            echo json_encode(['success' => true]);
            break;
        case 'list':
            $stmt = $pdo->prepare('SELECT p.id, p.nombre, p.precio FROM favoritos f JOIN productos p ON p.id = f.producto_id WHERE f.usuario_id = ?');
            $stmt->execute([$usuario_id]);
            $items = $stmt->fetchAll();
            echo json_encode(['success' => true, 'items' => $items]);
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Acción inválida']);
            break;
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
