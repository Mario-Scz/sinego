#!/usr/bin/env php
<?php
/**
 * check.php
 * Verifica que el proyecto está completo y listo para desplegar.
 * Uso: php scripts/check.php
 */

echo "╔════════════════════════════════════════╗\n";
echo "║  SINEGO - VERIFICACIÓN DE PROYECTO    ║\n";
echo "╚════════════════════════════════════════╝\n\n";

$rootDir = __DIR__ . '/../';
$errors = [];
$warnings = [];
$success = [];

// Verificar archivos obligatorios
echo "Verificando archivos obligatorios...\n";
$requiredFiles = [
    'config/db.php',
    'config/schema.sql',
    'includes/functions.php',
    'includes/header.php',
    'includes/footer.php',
    'api/login.php',
    'api/productos.php',
    'api/cart.php',
    'api/favorites.php',
    'api/admin_products.php',
    'vistas/register.php',
    'vistas/catalogo.php',
    'vistas/administrar.php',
    'vistas/cart.php',
    'vistas/favorites.php',
    'js/common.js',
    'js/register.js',
    'js/catalogo.js',
    'js/cart.js',
    'js/favorites.js',
    'js/adm-products.js',
    'scripts/create_admin.php',
    'scripts/install.php',
    '.env.example',
    '.gitignore',
    '.htaccess',
    'README.md',
    'API_ENDPOINTS.md',
    'DEPLOYMENT.md',
    'PORTABLE_PHP.md',
];

foreach ($requiredFiles as $file) {
    $path = $rootDir . $file;
    if (file_exists($path)) {
        $success[] = "✓ $file";
    } else {
        $errors[] = "✗ Falta archivo: $file";
    }
}

// Mostrar resultados
foreach ($success as $msg) {
    echo "  $msg\n";
}

if ($errors) {
    echo "\n❌ ERRORES ENCONTRADOS:\n";
    foreach ($errors as $error) {
        echo "  $error\n";
    }
}

// Verificar directorios
echo "\n\nVerificando directorios...\n";
$requiredDirs = ['config', 'api', 'includes', 'vistas', 'js', 'css', 'img', 'scripts'];

foreach ($requiredDirs as $dir) {
    $path = $rootDir . $dir;
    if (is_dir($path)) {
        echo "  ✓ $dir/\n";
    } else {
        $errors[] = "✗ Falta directorio: $dir/";
        echo "  ✗ $dir/\n";
    }
}

// Verificar extensiones PHP
echo "\n\nVerificando extensiones PHP...\n";
$requiredExtensions = ['pdo', 'pdo_mysql', 'json', 'filter'];

foreach ($requiredExtensions as $ext) {
    if (extension_loaded($ext)) {
        echo "  ✓ $ext\n";
    } else {
        $warnings[] = "⚠ Extensión no disponible: $ext (requerida para producción)";
        echo "  ⚠ $ext\n";
    }
}

// Verificar permisos
echo "\n\nVerificando permisos...\n";
if (is_writable($rootDir . 'logs')) {
    echo "  ✓ logs/ es escribible\n";
} else {
    $warnings[] = "⚠ logs/ no es escribible (se requiere para logging)";
    echo "  ⚠ logs/ no es escribible\n";
}

// Verificar sintaxis PHP
echo "\n\nVerificando sintaxis de archivos PHP...\n";
$phpFiles = array_filter($requiredFiles, fn($f) => substr($f, -4) === '.php');
$syntaxErrors = 0;

foreach ($phpFiles as $file) {
    $path = $rootDir . $file;
    if (file_exists($path)) {
        $output = [];
        $return = 0;
        exec("php -l '$path' 2>&1", $output, $return);
        if ($return !== 0) {
            $errors[] = "✗ Error de sintaxis en: $file";
            $syntaxErrors++;
        } else {
            echo "  ✓ $file\n";
        }
    }
}

// Resumen final
echo "\n╔════════════════════════════════════════╗\n";
if (empty($errors) && empty($warnings)) {
    echo "║ ✓ ¡TODO VERIFICADO CORRECTAMENTE!    ║\n";
    echo "╚════════════════════════════════════════╝\n";
    exit(0);
} else {
    if ($errors) {
        echo "║ ❌ " . count($errors) . " ERRORES ENCONTRADOS       ║\n";
    }
    if ($warnings) {
        echo "║ ⚠ " . count($warnings) . " ADVERTENCIAS             ║\n";
    }
    echo "╚════════════════════════════════════════╝\n";
    
    if ($errors) {
        echo "\nErrores:\n";
        foreach ($errors as $e) {
            echo "  $e\n";
        }
    }
    
    if ($warnings) {
        echo "\nAdvertencias:\n";
        foreach ($warnings as $w) {
            echo "  $w\n";
        }
    }
    
    exit(1);
}
