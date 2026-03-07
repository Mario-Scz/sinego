<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once "../../config/db.php";

$codigo = $_POST['codigo'] ?? '';
$autor = $_POST['autor'] ?? '';
$titulo = $_POST['titulo'] ?? '';
$tipo = $_POST['tipo'] ?? '';
$precio = $_POST['precio'] ?? 0.00;

if (!$codigo || !$autor || !$titulo || !$tipo) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    $imagen = 'img/ejemplos.png';
    $imagenSubida = false;

    // Verificar si hay imagen
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "../../img/libros/";
        
        // Crear directorio si no existe
        if (!file_exists($uploadDir)) {
            if (!mkdir($uploadDir, 0777, true)) {
                echo json_encode(['success' => false, 'error' => 'No se pudo crear la carpeta img/libros']);
                exit;
            }
        }

        // Verificar permisos
        if (!is_writable($uploadDir)) {
            echo json_encode(['success' => false, 'error' => 'La carpeta img/libros no tiene permisos de escritura']);
            exit;
        }

        $fileName = uniqid() . '_' . time() . '_' . basename($_FILES['imagen']['name']);
        $uploadPath = $uploadDir . $fileName;

        // Validar tipo de archivo
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $fileType = $_FILES['imagen']['type'];

        if (!in_array($fileType, $allowedTypes)) {
            echo json_encode(['success' => false, 'error' => 'Tipo de archivo no permitido. Usando imagen por defecto']);
            // Continuar sin imagen
        } else {
            // Intentar mover el archivo
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadPath)) {
                if (file_exists($uploadPath)) {
                    $imagen = "img/libros/" . $fileName;
                    $imagenSubida = true;
                } else {
                    echo json_encode(['success' => false, 'error' => 'No se pudo guardar la imagen en el servidor']);
                    exit;
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Error al mover el archivo temporal']);
                exit;
            }
        }
    }

    // Insertar libro
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
        'mensaje' => 'Libro agregado correctamente',
        'imagen_subida' => $imagenSubida,
        'ruta_imagen' => $imagen
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>