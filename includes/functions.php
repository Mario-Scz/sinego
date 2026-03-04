<?php
// funciones comunes del servidor

function app_log($msg) {
    $logDir = __DIR__ . '/../logs';
    if (!is_dir($logDir)) mkdir($logDir, 0755, true);
    $file = $logDir . '/app.log';
    $line = date('Y-m-d H:i:s') . ' - ' . $msg . PHP_EOL;
    file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
}

function isAdmin() {
    if (session_status() !== PHP_SESSION_ACTIVE) session_start();
    if (!empty($_SESSION['role']) && $_SESSION['role'] === 'admin') return true;
    return false;
}

function sanitize_input($v) {
    return trim(htmlspecialchars($v, ENT_QUOTES, 'UTF-8'));
}
