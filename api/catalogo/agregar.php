<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once "../../config/db.php";

// Verificar si hay datos en POST o JSON
if (isset($_FILES['imagen'])) {
    // Modo con imagen (FormData)
    $codigo = $_POST['codigo'] ?? '';
    $autor = $_POST['autor'] ?? '';
    $titulo = $_POST['titulo'] ?? '';
    $tipo = $_POST['tipo'] ?? '';
    $precio = $_POST['precio'] ?? 0.00;
} else {
    // Modo sin imagen (JSON)
    $input = json_decode(file_get_contents('php://input'), true);
    $codigo = $input['codigo'] ?? '';
    $autor = $input['autor'] ?? '';
    $titulo = $input['titulo'] ?? '';
    $tipo = $input['tipo'] ?? '';
    $precio = $input['precio'] ?? 0.00;
}

// Validar datos
if (!$codigo || !$autor || !$titulo || !$tipo) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $imagen = 'img/ejemplos.png'; // Imagen por defecto

    // Si hay imagen subida
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "../../img/libros/";
        
        // Crear directorio si no existe
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = uniqid() . '_' . basename($_FILES['imagen']['name']);
        $uploadPath = $uploadDir . $fileName;

        // Validar tipo de archivo
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $fileType = $_FILES['imagen']['type'];

        if (in_array($fileType, $allowedTypes)) {
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadPath)) {
                $imagen = "img/libros/" . $fileName;
            } else {
                echo json_encode(['error' => 'Error al subir la imagen']);
                exit;
            }
        } else {
            echo json_encode(['error' => 'Tipo de archivo no permitido']);
            exit;
        }
    }

    $stmt = $pdo->prepare("
        INSERT INTO libros (codigo, autor, titulo, tipo, precio, imagen)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $codigo,
        $autor,
        $titulo,
        $tipo,
        $precio,
        $imagen
    ]);

    echo json_encode([
        'success' => true,
        'id' => $pdo->lastInsertId(),
        'mensaje' => 'Libro agregado correctamente'
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>