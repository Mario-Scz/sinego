<?php
/**
 * admin_products.php
 * Endpoint para administración de productos (CRUD).
 * Requiere sesión iniciada y, en producción, rol admin.
 * Recibe JSON: { action, ... }
 * Actions: list (GET), create, update, delete
 */
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';
session_start();
if (empty($_SESSION['id']) || !isAdmin()) {
    app_log('Acceso admin_products denegado para usuario id: ' . ($_SESSION['id'] ?? 'n/a'));
    echo json_encode(['success' => false, 'message' => 'Acceso denegado']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_GET;
action:
$action = $input['action'] ?? 'list';

try {
    switch ($action) {
        case 'create':
            $nombre = isset($input['nombre']) ? trim(sanitize_input($input['nombre'])) : '';
            $descripcion = isset($input['descripcion']) ? trim(sanitize_input($input['descripcion'])) : '';
            $precio = floatval($input['precio'] ?? 0);
            $imagen = isset($input['imagen']) ? trim(sanitize_input($input['imagen'])) : null;
            $genero = isset($input['genero']) ? trim(sanitize_input($input['genero'])) : null;

            if ($nombre === '' || strlen($nombre) < 2 || strlen($nombre) > 150) {
                throw new Exception('nombre debe tener entre 2 y 150 caracteres');
            }
            if ($precio < 0) {
                throw new Exception('precio debe ser >= 0');
            }

            $stmt = $pdo->prepare('INSERT INTO productos (nombre, descripcion, precio, imagen, genero) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([$nombre, $descripcion, $precio, $imagen, $genero]);
            $id = $pdo->lastInsertId();
            app_log('producto creado: id=' . $id . ', nombre=' . $nombre);
            echo json_encode(['success' => true, 'id' => $id]);
            break;

        case 'update':
            $id = intval($input['id'] ?? 0);
            if (!$id || $id <= 0) throw new Exception('id inválido');
            $nombre = isset($input['nombre']) ? trim(sanitize_input($input['nombre'])) : '';
            $descripcion = isset($input['descripcion']) ? trim(sanitize_input($input['descripcion'])) : '';
            $precio = floatval($input['precio'] ?? 0);
            $imagen = isset($input['imagen']) ? trim(sanitize_input($input['imagen'])) : null;
            $genero = isset($input['genero']) ? trim(sanitize_input($input['genero'])) : null;

            if ($nombre === '' || strlen($nombre) < 2 || strlen($nombre) > 150) {
                throw new Exception('nombre debe tener entre 2 y 150 caracteres');
            }
            if ($precio < 0) {
                throw new Exception('precio debe ser >= 0');
            }

            $stmt = $pdo->prepare('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, genero = ? WHERE id = ?');
            $stmt->execute([$nombre, $descripcion, $precio, $imagen, $genero, $id]);
            app_log('producto actualizado: id=' . $id);
            echo json_encode(['success' => true]);
            break;

        case 'delete':
            $id = intval($input['id'] ?? 0);
            if (!$id || $id <= 0) throw new Exception('id inválido');
            $stmt = $pdo->prepare('DELETE FROM productos WHERE id = ?');
            $stmt->execute([$id]);
            app_log('producto eliminado: id=' . $id);
            echo json_encode(['success' => true]);
            break;

        case 'list':
        default:
            $stmt = $pdo->query('SELECT id, nombre, descripcion, precio, imagen, genero, creado FROM productos ORDER BY id DESC');
            $items = $stmt->fetchAll();
            echo json_encode(['success' => true, 'items' => $items]);
            break;
    }
} catch (Exception $e) {
    error_log('admin_products error: ' . $e->getMessage());
    app_log('admin_products error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
