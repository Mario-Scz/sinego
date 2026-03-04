<?php
/**
 * login.php
 * Recibe JSON con {usr,password} y valida contra tabla `usuarios`.
 * Devuelve respuesta JSON: {success:boolean,message:string,usuario?:string}
 */
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';

// leer el cuerpo JSON
$input = json_decode(file_get_contents('php://input'), true);
$usuario = isset($input['usr']) ? trim(sanitize_input($input['usr'])) : '';
$password = isset($input['pwd']) ? trim($input['pwd']) : '';

if (!$usuario || !$password) {
    app_log('login fail: usuario/password vacio');
    echo json_encode(['success' => false, 'message' => 'Usuario y contraseña son obligatorios']);
    exit;
}

if (strlen($usuario) < 3 || strlen($usuario) > 50) {
    app_log("login fail: usuario longitud invalida: $usuario");
    echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
    exit;
}

if (strlen($password) < 4) {
    app_log('login fail: password muy corta');
    echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT id, usuario, contraseña, role FROM usuarios WHERE usuario = ?');
    $stmt->execute([$usuario]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['contraseña'])) {
        // iniciar sesión con parámetros seguros
        session_start();
        session_regenerate_id(true);
        $_SESSION['usuario'] = $user['usuario'];
        $_SESSION['id'] = $user['id'];
        $_SESSION['role'] = $user['role'] ?? 'user';
        
        app_log('login success: usuario ' . $user['usuario']);
        echo json_encode(['success' => true, 'usuario' => $user['usuario']]);
    } else {
        app_log("login fail: credenciales invalidas para usuario: $usuario");
        echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    app_log('login error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error al procesar solicitud']);
}
