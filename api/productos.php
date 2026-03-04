<?php
/**
 * productos.php
 * Devuelve listado de productos en JSON.
 * Parámetros opcionales (GET):
 *   search - término de búsqueda en nombre/descripcion
 *   genero - nombre de género para filtrar
 */
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/db.php';

try {
    $where = [];
    $params = [];

    if (!empty($_GET['search'])) {
        $where[] = '(nombre LIKE ? OR descripcion LIKE ?)';
        $params[] = '%' . $_GET['search'] . '%';
        $params[] = '%' . $_GET['search'] . '%';
    }

    if (!empty($_GET['genero'])) {
        $where[] = 'genero = ?';
        $params[] = $_GET['genero'];
    }

    $sql = 'SELECT id, nombre, descripcion, precio, imagen, genero FROM productos';
    if ($where) {
        $sql .= ' WHERE ' . implode(' AND ', $where);
    }
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $productos = $stmt->fetchAll();

    echo json_encode(['success' => true, 'productos' => $productos]);
} catch (Exception $e) {
    error_log($e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error al obtener productos']);
}
