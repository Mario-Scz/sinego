<?php
/**
 * cart.php
 * Gestiona el carrito del usuario autenticado.
 * Recibe JSON {action, product_id, cantidad?}
 * Actions: add, remove, update, list, clear
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
action:
$action = $input['action'] ?? '';

try {
    switch ($action) {
        case 'add':
            $prod = intval($input['product_id'] ?? 0);
            if (!$prod) {
                throw new Exception('product_id faltante');
            }
            $cant = intval($input['cantidad'] ?? 1);
            // si existe aumenta cantidad, si no inserta
            $stmt = $pdo->prepare('SELECT cantidad FROM carrito WHERE usuario_id = ? AND producto_id = ?');
            $stmt->execute([$usuario_id, $prod]);
            $row = $stmt->fetch();
            if ($row) {
                $stmt = $pdo->prepare('UPDATE carrito SET cantidad = cantidad + ? WHERE usuario_id = ? AND producto_id = ?');
                $stmt->execute([$cant, $usuario_id, $prod]);
            } else {
                $stmt = $pdo->prepare('INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)');
                $stmt->execute([$usuario_id, $prod, $cant]);
            }
            echo json_encode(['success' => true]);
            break;

        case 'remove':
            $prod = intval($input['product_id'] ?? 0);
            if (!$prod) throw new Exception('product_id faltante');
            $stmt = $pdo->prepare('DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?');
            $stmt->execute([$usuario_id, $prod]);
            echo json_encode(['success' => true]);
            break;

        case 'update':
            $prod = intval($input['product_id'] ?? 0);
            $cant = intval($input['cantidad'] ?? 1);
            if (!$prod) throw new Exception('product_id faltante');
            if ($cant < 1) {
                $stmt = $pdo->prepare('DELETE FROM carrito WHERE usuario_id = ? AND producto_id = ?');
                $stmt->execute([$usuario_id, $prod]);
            } else {
                $stmt = $pdo->prepare('UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND producto_id = ?');
                $stmt->execute([$cant, $usuario_id, $prod]);
            }
            echo json_encode(['success' => true]);
            break;

        case 'list':
            $stmt = $pdo->prepare('SELECT p.id, p.nombre, p.precio, c.cantidad
                                   FROM carrito c
                                   JOIN productos p ON p.id = c.producto_id
                                   WHERE c.usuario_id = ?');
            $stmt->execute([$usuario_id]);
            $items = $stmt->fetchAll();
            echo json_encode(['success' => true, 'items' => $items]);
            break;

        case 'clear':
            $stmt = $pdo->prepare('DELETE FROM carrito WHERE usuario_id = ?');
            $stmt->execute([$usuario_id]);
            echo json_encode(['success' => true]);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción inválida']);
            break;
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
