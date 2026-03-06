<?php
/**
 * api/envios.php
 * CRUD para la tabla envios
 */

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';
session_start();

if (empty($_SESSION['id']) || ($_SESSION['role'] ?? $_SESSION['rol'] ?? '') !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

try {
    switch ($method) {
        case 'GET':
            $stmt = $pdo->query('SELECT * FROM envios ORDER BY id DESC');
            $envios = $stmt->fetchAll();
            echo json_encode(['success' => true, 'envios' => $envios]);
            break;

        case 'POST':
            $id_libro = sanitize_input($input['id_libro'] ?? '');
            $autor = sanitize_input($input['autor'] ?? '');
            $tipo_envio = sanitize_input($input['tipo_envio'] ?? '');

            if (empty($id_libro) || empty($autor)) {
                echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
                break;
            }

            $stmt = $pdo->prepare('INSERT INTO envios (id_libro, autor, tipo_envio) VALUES (?, ?, ?)');
            $stmt->execute([$id_libro, $autor, $tipo_envio]);
            echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
            break;

        case 'PUT':
            $id = intval($input['id'] ?? 0);
            $id_libro = sanitize_input($input['id_libro'] ?? '');
            $autor = sanitize_input($input['autor'] ?? '');
            $tipo_envio = sanitize_input($input['tipo_envio'] ?? '');

            if (!$id) {
                echo json_encode(['success' => false, 'message' => 'ID inválido']);
                break;
            }

            $stmt = $pdo->prepare('UPDATE envios SET id_libro = ?, autor = ?, tipo_envio = ? WHERE id = ?');
            $stmt->execute([$id_libro, $autor, $tipo_envio, $id]);
            echo json_encode(['success' => true]);
            break;

        case 'DELETE':
            $id = intval($input['id'] ?? 0);
            if (!$id) {
                echo json_encode(['success' => false, 'message' => 'ID inválido']);
                break;
            }
            $stmt = $pdo->prepare('DELETE FROM envios WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
