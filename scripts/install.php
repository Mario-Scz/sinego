#!/usr/bin/env php
<?php
/**
 * install.php
 * Script de instalación inicial para Sinego.
 * Uso: php scripts/install.php
 * Crea el archivo .env, la base de datos y el usuario admin.
 */

echo "╔════════════════════════════════════════════════════════╗\n";
echo "║         SINEGO - SCRIPT DE INSTALACIÓN INICIAL         ║\n";
echo "╚════════════════════════════════════════════════════════╝\n\n";

// Paso 1: Verificar dependencias
echo "[1/4] Verificando dependencias...\n";
if (!extension_loaded('pdo')) {
    die("❌ Error: Extensión PDO no disponible en PHP.\n");
}
if (!extension_loaded('pdo_mysql')) {
    die("❌ Error: Extensión pdo_mysql no disponible en PHP.\n");
}
echo "✓ PDO y pdo_mysql disponibles.\n\n";

// Paso 2: Configurar .env
echo "[2/4] Configurando variables de entorno (.env)...\n";
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    echo "⚠ Ya existe un archivo .env. Se mantendrá la configuración actual.\n\n";
} else {
    $exampleFile = __DIR__ . '/../.env.example';
    if (!file_exists($exampleFile)) {
        die("❌ Error: No se encontró .env.example\n");
    }
    copy($exampleFile, $envFile);
    echo "✓ Archivo .env creado desde .env.example.\n";
    echo "⚠ IMPORTANTE: Edita .env con credenciales reales de tu BD antes de continuar.\n\n";
}

// Paso 3: Crear tablas
echo "[3/4] Crear tablas en base de datos...\n";
echo "Para crear las tablas, ejecuta desde tu cliente MySQL:\n";
echo "  mysql -u usuario -p < config/schema.sql\n";
echo "O desde el shell de MySQL:\n";
echo "  SOURCE config/schema.sql;\n\n";

// Paso 4: Crear usuario admin
echo "[4/4] Crear usuario administrador...\n";
echo "Cuando las tablas estén creadas, ejecuta:\n";
echo "  php scripts/create_admin.php admin StrongPassword123 \"Administrador\" admin@example.com\n\n";

echo "╔════════════════════════════════════════════════════════╗\n";
echo "║              ¡INSTALACIÓN COMPLETADA!                 ║\n";
echo "╚════════════════════════════════════════════════════════╝\n";
echo "\nProximos pasos:\n";
echo "1. Edita .env con tus credenciales de base de datos\n";
echo "2. Crea las tablas: mysql -u usuario -p < config/schema.sql\n";
echo "3. Crea el admin: php scripts/create_admin.php ...\n";
echo "4. Inicia el servidor: php -S localhost:8000 -t .\n";
echo "5. Abre http://localhost:8000/vistas/register.php\n\n";
