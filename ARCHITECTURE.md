# ARQUITECTURA TÉCNICA — Sinego

Este documento explica cómo funciona Sinego internamente, qué lenguajes se usan y por qué.

## 📐 Arquitectura General

```
┌─────────────────┐          ┌──────────────────┐          ┌──────────────┐
│   NAVEGADOR     │          │   SERVIDOR PHP   │          │   MYSQL BD   │
│   (Cliente)     │◄────────►│   (API REST)     │◄────────►│   (Datos)    │
└─────────────────┘          └──────────────────┘          └──────────────┘
  HTML/CSS/JS                   PHP 7.4+                    InnoDB
  Fetch API                      PDO                         utf8mb4
```

**Modelo:** Cliente-Servidor con API REST  
**Tipo:** Aplicación Web Tradicional (no SPA, sin framework)  
**Base de datos:** Relacional

---

## 🔤 Lenguajes Utilizados

### **HTML5** — Estructura (Vistas)
**¿Dónde?** `vistas/*.php`, `includes/header.php`, `includes/footer.php`

**¿Para qué?**
- Definir estructura de páginas
- Formularios (login, creación de productos)
- Tablas de datos (admin)
- Elementos interactivos

**Ejemplo:**
```html
<!-- Formulario que llama a JS -->
<form class="login-frm" onsubmit="manejarLogin(event)">
  <input type="text" id="usr" name="usuario" />
  <input type="password" id="pwd" name="password" />
  <button type="submit">Iniciar Sesión</button>
</form>

<!-- Contenedor que JS llena dinámicamente -->
<div id="productosGrid"></div>
```

**Variables/IDs preservados:** `usr`, `pwd`, `cc`, `cf`, `cartItems`, etc.

---

### **CSS3** — Estilos Visuales
**¿Dónde?** `css/*.css`

**¿Para qué?**
- Diseño responsivo (móvil, tablet, desktop)
- Temas de colores
- Animaciones suaves
- Layout grid/flexbox

**Tecnologías:**
- Flexbox para layouts
- CSS Grid para tablas
- Media queries para responsivo
- Animaciones keyframes
- Variables CSS (--color, --spacing, etc.)

**No se modificó durante esta sesión** (estaba completo).

---

### **JavaScript (Vanilla)** — Interactividad Cliente
**¿Dónde?** `js/*.js`

**¿Para qué?**
- Manejo de eventos (clicks, submit, input)
- Validaciones cliente-side
- Llamadas a APIs (fetch)
- Manipulación del DOM
- Almacenamiento local (localStorage)
- Notificaciones de usuario

**Flujos principales:**

#### 1️⃣ Login (js/register.js)
```javascript
// 1. Usuario llena formulario en HTML
// 2. Evento submit dispara:
fetch('/api/login.php', {
    method: 'POST',
    body: JSON.stringify({ usr: usuario, pwd: password })
})
// 3. Respuesta JSON con {"success": true}
// 4. Si success → redirige a menu.php
// 5. Si error → muestra notificación
```

#### 2️⃣ Cargar Catálogo (js/catalogo.js)
```javascript
// 1. Página carga
// 2. JS hace fetch a:
fetch('/api/productos.php')
// 3. Servidor devuelve JSON: [{ id, nombre, precio, ... }]
// 4. JS renderiza HTML dinámicamente:
div.innerHTML = `<div class="card">${producto.nombre}</div>`
// 5. Usuario ve productos en pantalla
```

#### 3️⃣ Agregar al Carrito (js/catalogo.js + api/cart.php)
```javascript
// 1. Usuario click en "Agregar al carrito"
fetch('/api/cart.php', {
    method: 'POST',
    body: JSON.stringify({ action: 'add', product_id: 5 })
})
// 2. Servidor añade a BD (tabla carrito)
// 3. JS notifica usuario ✓
// 4. Contador se actualiza vía fetch adicional
```

---

### **PHP 7.4+** — Backend / API
**¿Dónde?** `api/*.php`, `config/*.php`, `includes/*.php`, `scripts/*.php`

**¿Para qué?**
- Procesar solicitudes del cliente (fetch)
- Validar y sanitizar entrada
- Consultas a base de datos
- Control de sesiones y autenticación
- Lógica de negocio

**Componentes clave:**

#### 📁 `api/` — Endpoints REST

| Archivo | Método | Entrada | Salida | Requiere |
|---------|--------|---------|--------|----------|
| `login.php` | POST | `{usr, pwd}` | `{success, usuario}` | — |
| `productos.php` | GET | `?search=...&genero=...` | `{productos[]}` | — |
| `cart.php` | POST/GET | `{action, product_id, cantidad}` | `{success}` o `{items[]}` | Sesión |
| `favorites.php` | POST/GET | `{action, product_id}` | `{success}` o `{items[]}` | Sesión |
| `admin_products.php` | POST/GET | `{action, ...fields}` | `{success, id}` | Sesión + Admin |

**Flujo típico de endpoint:**

```php
<?php
// 1. Headers y requires
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../includes/functions.php';

// 2. Verificación de sesión/auth
session_start();
if (empty($_SESSION['id'])) {
    echo json_encode(['success' => false]);
    exit;
}

// 3. Leer entrada (JSON o GET)
$input = json_decode(file_get_contents('php://input'), true) ?: $_GET;

// 4. Validar y sanitizar
$nombre = trim(sanitize_input($input['nombre'] ?? ''));
if (strlen($nombre) < 2) {
    throw new Exception('nombre muy corto');
}

// 5. Consulta a BD con prepared statements
$stmt = $pdo->prepare('INSERT INTO productos (nombre) VALUES (?)');
$stmt->execute([$nombre]);

// 6. Log y respuesta JSON
app_log('producto creado: ' . $nombre);
echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
?>
```

#### 📁 `config/` — Configuración

**`db.php`** — Conexión a BD
```php
// Carga .env → variables de entorno → PDO
$pdo = new PDO(
    "mysql:host=$host;dbname=$db",
    $user, $pass,
    [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, ...]
);
// Ahora $pdo está disponible globalmente en todos los scripts
```

**`schema.sql`** — Estructura de tablas
```sql
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(50) UNIQUE,
    contraseña VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE productos (
    id INT PRIMARY KEY,
    nombre VARCHAR(150),
    precio DECIMAL(10,2),
    ...
);

CREATE TABLE carrito (
    id INT PRIMARY KEY,
    usuario_id INT FOREIGN KEY,
    producto_id INT FOREIGN KEY,
    cantidad INT
);
```

#### 📁 `includes/` — Componentes reutilizables

**`header.php`** — Template HTML reutilizable
```php
<?php $pageTitle = $pageTitle ?? 'Página'; ?>
<!DOCTYPE html>
<html>
<head>
    <title><?php echo $pageTitle; ?></title>
</head>
<body>
    <nav><!-- navegación compartida --></nav>
    <!-- resto del contenido va aquí -->
```

**Uso en vistas:**
```php
<?php $pageTitle = 'Catálogo'; ?>
<?php include __DIR__ . '/../includes/header.php'; ?>
<!-- contenido específico -->
<?php include __DIR__ . '/../includes/footer.php'; ?>
```

**`functions.php`** — Funciones globales
```php
function isAdmin() {
    return !empty($_SESSION['role']) && $_SESSION['role'] === 'admin';
}

function sanitize_input($v) {
    return trim(htmlspecialchars($v, ENT_QUOTES, 'UTF-8'));
}

function app_log($msg) {
    file_put_contents(__DIR__ . '/../logs/app.log', 
        date('Y-m-d H:i:s') . ' - ' . $msg . PHP_EOL,
        FILE_APPEND);
}
```

---

### **SQL** — Base de Datos
**¿Dónde?** `config/schema.sql`, `config/seed.sql`

**Tablas principales:**

```sql
┌──────────────────────────────────────┐
│ usuarios                              │
├──────────────────────────────────────┤
│ id (PK)                              │
│ usuario VARCHAR(50) UNIQUE           │
│ contraseña VARCHAR(255) [hash]       │
│ role VARCHAR(20) [admin | user]      │
│ nombre VARCHAR(100)                  │
│ email VARCHAR(100)                   │
│ creado TIMESTAMP                     │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ productos                            │
├──────────────────────────────────────┤
│ id (PK)                              │
│ nombre VARCHAR(150)                  │
│ descripcion TEXT                     │
│ precio DECIMAL(10,2)                 │
│ imagen VARCHAR(255)                  │
│ genero VARCHAR(50)                   │
│ creado TIMESTAMP                     │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ carrito                              │
├──────────────────────────────────────┤
│ id (PK)                              │
│ usuario_id (FK → usuarios.id)        │
│ producto_id (FK → productos.id)      │
│ cantidad INT                         │
│ agregado TIMESTAMP                   │
│ UNIQUE(usuario_id, producto_id)      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ favoritos                            │
├──────────────────────────────────────┤
│ id (PK)                              │
│ usuario_id (FK)                      │
│ producto_id (FK)                     │
│ agregado TIMESTAMP                   │
│ UNIQUE(usuario_id, producto_id)      │
└──────────────────────────────────────┘
```

**Tipos de datos:**
- `VARCHAR(n)` — texto corto (nombres, usuarios)
- `TEXT` — texto largo (descripciones)
- `DECIMAL(10,2)` — dinero (precio)
- `INT` — números enteros (IDs, cantidades)
- `TIMESTAMP` — fecha/hora automática

---

## 🔄 Flujos Principales (Cómo funciona todo junto)

### **Flujo 1: Autenticación (Login)**

```
CLIENTE                          SERVIDOR               BASE DE DATOS
  │                                 │                        │
  │ 1. usuario ingresa              │                        │
  │    usuario/contraseña           │                        │
  │                                 │                        │
  │ 2. fetch POST                   │                        │
  │    /api/login.php               │                        │
  ├─────────────────────────────────►                        │
  │    {usr: "admin", pwd: "123"}   │                        │
  │                                 │                        │
  │                       3. validar │                        │
  │                       y sanitizar │                        │
  │                                 │                        │
  │                            4. query│                      │
  │                    SELECT * FROM usuarios│               │
  │                    WHERE usuario = ?     │◄──────────────│
  │                                 │        │                │
  │                                 │◄───────┤ {"id":1,...}   │
  │                                 │                        │
  │                            5. password_verify()          │
  │                            contraseña con hash           │
  │                                 │                        │
  │                            6. session_regenerate_id()    │
  │                            $_SESSION['id'] = 1           │
  │                            $_SESSION['role'] = 'admin'   │
  │                                 │                        │
  │ 7. respuesta JSON               │                        │
  │◄─────────────────────────────────┤                        │
  │    {success: true}               │                        │
  │                                 │                        │
  │ 8. window.location redirige      │                        │
  │    a /vistas/menu.php            │                        │
  
Tiempo de ejecución: ~50-200ms (incluyendo consulta a BD)
Sesión dura: hasta que se cierre el navegador o expire (default 24h)
```

---

### **Flujo 2: Cargar Catálogo**

```
CLIENTE                    SERVIDOR           BASE DE DATOS
  │                            │                   │
  │ 1. Usuario abre            │                   │
  │    /vistas/catalogo.php    │                   │
  │                            │                   │
  │ 2. JS detecta DOMContentLoaded   │              │
  │                            │                   │
  │ 3. fetch GET               │                   │
  │    /api/productos.php      │                   │
  │    ?search=libro           │                   │
  ├───────────────────────────►                    │
  │                            │                   │
  │                    4. query │                   │
  │              SELECT * FROM productos│           │
  │              WHERE nombre LIKE '%libro%'│      │
  │                            │                   │
  │                            │──────────────────►
  │                            │                   │
  │                            │◄──────────────────
  │                            │ [{id:1,nombre:...},
  │                            │  {id:2,nombre:...}]
  │                            │                   │
  │ 5. respuesta JSON          │                   │
  │◄───────────────────────────┤                   │
  │    {success: true,         │                   │
  │     productos: [...]}      │                   │
  │                            │                   │
  │ 6. JS itera sobre array    │                   │
  │    y crea HTML dinámico:   │                   │
  │                            │                   │
  │    productosGrid.innerHTML = │                   │
  │    `<div class="card">...`  │                   │
  │                            │                   │
  │ 7. usuario ve catálogo     │                   │
  │    con productos           │                   │
  
Tiempo: ~100-300ms (consulta a BD + renderizado)
Cache navegador: NO (API siempre fresca)
```

---

### **Flujo 3: CRUD de Productos (Admin)**

```
PASO 1: LISTAR (GET)
┌──────────────────┐
│ fetch GET        │
│ /api/admin_products.php
│ ?action=list     │
└──────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ verify: isAdmin() OK?                │
│ query: SELECT * FROM productos      │
│ response: {items: [...]}             │
└──────────────────────────────────────┘
         │
         ▼
   Tabla HTML renderizada

PASO 2: EDITAR (POST)
┌──────────────────────────────────┐
│ fetch POST /api/admin_products.php
│ body: {action: "update",         │
│        id: 5,                    │
│        nombre: "Nuevo nombre"}   │
└──────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ verify: isAdmin() OK?                │
│ validate: nombre length 2-150 ✓      │
│ query: UPDATE productos SET ...      │
│ log: "producto actualizado: 5"       │
│ response: {success: true}            │
└──────────────────────────────────────┘
         │
         ▼
   app_log() escribe en logs/app.log
   │
   ▼
   2026-03-03 14:32:15 - producto actualizado: 5

PASO 3: ELIMINAR (DELETE)
┌──────────────────────────────────┐
│ fetch POST /api/admin_products.php
│ body: {action: "delete",        │
│        id: 5}                   │
└──────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ verify: isAdmin() OK?                │
│ query: DELETE FROM productos ...     │
│ response: {success: true}            │
└──────────────────────────────────────┘
         │
         ▼
   Tabla refrescada via JS
```

---

## 🔐 Seguridad — Cómo Funciona

### Autenticación (¿Quién eres?)
```javascript
// Cliente manda credenciales
fetch('/api/login.php', {
    method: 'POST',
    body: JSON.stringify({ usr: "admin", pwd: "123" })
})
```

```php
// Servidor valida
$stmt = $pdo->prepare('SELECT contraseña FROM usuarios WHERE usuario = ?');
$stmt->execute([$usuario]);
$user = $stmt->fetch();

if ($user && password_verify($pwd, $user['contraseña'])) {
    session_start();
    session_regenerate_id(true);  // Cambia ID de sesión por seguridad
    $_SESSION['id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
}
// Ahora cliente tiene cookie PHPSESSID
```

```javascript
// Después, todas las requests incluyen la cookie automáticamente
fetch('/api/admin_products.php', {
    method: 'POST',
    body: JSON.stringify({...})
    // Cookie: PHPSESSID=abc123xyz enviada automáticamente
})
```

### Autorización (¿Qué puedes hacer?)
```php
// En admin_products.php
if (empty($_SESSION['id']) || !isAdmin()) {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado']);
    exit;
}
// Si no eres admin, respuesta inmediata = acceso denegado
```

### Sanitización (Prevenir XSS/Inyección)
```php
// Entrada de usuario directa = peligrosa
$nombre = $_POST['nombre'];  // ❌ ""><script>alert('hacked')</script>

// Con sanitización
$nombre = sanitize_input($_POST['nombre']);  // ✅ Escapa HTML
// Resultado: "&quot;&gt;&lt;script&gt;...&lt;/script&gt;"

htmlspecialchars($value, ENT_QUOTES, 'UTF-8')
// Convierte caracteres especiales a entidades HTML
```

### SQL Injection Protection (Prepared Statements)
```php
// ❌ VULNERABLE:
$query = "SELECT * FROM usuarios WHERE usuario = '" . $usuario . "'";
// Si usuario = "' OR '1'='1" → siempre retorna todos

// ✅ SEGURO:
$stmt = $pdo->prepare('SELECT * FROM usuarios WHERE usuario = ?');
$stmt->execute([$usuario]);
// El signo ? es placeholder, nunca se ejecuta como código SQL
```

### Password Hashing
```php
// Crear: usar password_hash()
$hash = password_hash('MiPassword123', PASSWORD_DEFAULT);
// Resultado: $2y$10$N6fG7kJ9... (hash irreversible)

// Verificar: usar password_verify()
if (password_verify('MiPassword123', $hash)) {
    // Contraseña correcta
}
// No comparas texto plano, es imposible recuperar original
```

---

## 🏗️ Estructura de Directorios

```
sinego/
├── api/                    ← Endpoints REST (PHP)
│   ├── login.php          Autenticación
│   ├── productos.php      Listar productos
│   ├── cart.php           Operaciones carrito
│   ├── favorites.php      Operaciones favoritos
│   └── admin_products.php Panel admin (requiere role admin)
│
├── config/                 ← Configuración
│   ├── db.php             Conexión PDO
│   ├── schema.sql         Estructura BD
│   └── seed.sql           Datos de ejemplo
│
├── includes/               ← Componentes reutilizables
│   ├── header.php         Template HTML (navegación)
│   ├── footer.php         Template HTML (cierre)
│   └── functions.php      Funciones globales
│
├── vistas/                 ← Páginas (HTML + PHP embebido)
│   ├── register.php       Login
│   ├── catalogo.php       Listado de productos
│   ├── administrar.php    Panel admin
│   ├── cart.php           Carrito
│   └── favorites.php      Favoritos
│
├── js/                     ← JavaScript Cliente (Vanilla)
│   ├── common.js          Funciones compartidas
│   ├── register.js        Lógica login
│   ├── catalogo.js        Lógica catálogo
│   ├── cart.js            Lógica carrito
│   ├── favorites.js       Lógica favoritos
│   └── adm-products.js    Lógica admin
│
├── css/                    ← Estilos (no modificado)
│   └── *.css
│
├── scripts/                ← CLI Scripts (PHP)
│   ├── install.php        Instalación guiada
│   ├── create_admin.php   Crear usuario admin
│   ├── check.php          Validar integridad
│   └── run_portable_php.ps1 Ejecutar PHP portable
│
├── logs/                   ← Registros (runtime)
│   └── app.log            Log de aplicación
│
├── img/                    ← Imágenes
├── css/                    ← Estilos
│
├── .env.example            Plantilla variables entorno
├── .env                    Variables entorno (no versionar)
├── .gitignore              Qué no versionar
├── .htaccess               Seguridad Apache
│
├── README.md               Guía general
├── API_ENDPOINTS.md        Referencia endpoints
├── DEPLOYMENT.md           Guía despliegue producción
├── PORTABLE_PHP.md         Usar PHP sin instalar
├── INSTALL.txt             Instalación rápida
└── ARCHITECTURE.md         Este archivo
```

---

## 📊 Flujo de Datos Completo (Ejemplo: Agregar Producto al Carrito)

```
1. USUARIO CLICK EN BOTÓN
   │
   ├─ HTML: <button class="btn-agr bagr">
   │
   └─ js/catalogo.js - configurarBotonesCarrito()
      │
      └─ evento click disparado
         │
         └─ fetch POST a /api/cart.php
            │
            └─ JSON: {action: "add", product_id: 5}

2. SERVIDOR RECIBE (PHP: api/cart.php)
   │
   ├─ session_start() | verificar $_SESSION['id']
   │
   ├─ json_decode($input) → $action = "add"
   │
   ├─ $product_id = 5
   │
   └─ try {
        SELECT cantidad FROM carrito 
        WHERE usuario_id = $usuario_id 
        AND producto_id = 5
      }
      │
      ├─ SI EXISTE: UPDATE cantidad + 1
      │
      └─ SI NO EXISTE: INSERT nuevo item

3. BASE DE DATOS (MySQL)
   │
   ├─ INSERT INTO carrito (usuario_id, producto_id, cantidad)
   │  VALUES (1, 5, 1)
   │
   └─ Se asigna ID, timestamp automático

4. RESPUESTA AL CLIENTE
   │
   ├─ PHP devuelve: {success: true}
   │
   └─ JS recibe respuesta JSON

5. ACTUALIZACIÓN INTERFAZ
   │
   ├─ js/cart.js - actualizarContadores()
   │
   ├─ fetch GET /api/cart.php?action=list
   │
   ├─ Carrito ahora con 1 elemento
   │
   ├─ mostrarNotificacion("✓ Producto agregado")
   │
   └─ HTML se actualiza dinámicamente
```

---

## 🔄 Qué Lenguaje Hace Qué

| Tarea | Lenguaje | Archivo | Por qué |
|-------|----------|---------|--------|
| **Renderizar página** | HTML | vistas/*.php | Define estructura visual |
| **Estilos visuales** | CSS | css/*.css | Define aparencia |
| **Interactividad usuario** | JavaScript | js/*.js | Responde a clicks, validar, notificar |
| **Obtener datos API** | JavaScript | js/*.js | `fetch()` es API del navegador |
| **Procesar solicitud** | PHP | api/*.php | Recibe JSON, procesa lógica |
| **Acceso a BD** | PHP + SQL | api/*.php | `$pdo->prepare()` ejecuta SQL |
| **Verificar seguridad** | PHP | api/*.php + includes/functions.php | Solo PHP puede verificar sesiones |
| **Almacenar datos** | SQL | config/schema.sql | Base de datos relacional |
| **Logs/auditoría** | PHP + SQL | includes/functions.php | app_log() registra todo |

---

## 🎯 Para Explicar a Otros Desarrolladores

### Elevator Pitch (30 segundos)
> "Sinego es una aplicación web cliente-servidor. El navegador (JS) hace requests JSON a endpoints PHP. PHP valida, accede a MySQL y devuelve JSON. El navegador renderiza HTML dinámicamente. Las sesiones aseguran autenticación, los roles (admin/user) autorizan acciones, y prepared statements previenen inyección SQL."

### Medium Pitch (2 minutos)
> "Usamos arquitectura tradicional de 3 capas:
> 1. **Frontend** (HTML/CSS/JS): Interfaz visual que responde a clicks del usuario
> 2. **Backend** (PHP): API REST que valida, procesa lógica y accede a BD
> 3. **BD** (MySQL): Almacenamiento persistente relacional
>
> El flujo es fetch-response: navegador hace petición JSON → servidor PHP procesa → responde JSON → JS actualiza DOM.
>
> Seguridad:
> - Contraseñas hasheadas con `password_hash()`
> - Sesiones PHP regeneradas en login
> - Roles (admin/user) verificados en endpoints sensibles
> - Sanitización con `htmlspecialchars()` contra XSS
> - Prepared statements contra SQL injection"

### Deep Dive (presentación técnica)
Usa los diagramas de flujos de arriba + muestra código en:
- `api/login.php` → autenticación
- `api/admin_products.php` → CRUD protegido por rol
- `js/catalogo.js` → comunicación cliente-servidor
- `config/db.php` → conexión segura

---

## 📝 Notas Importantes

### ¿Por qué no usamos un framework (Laravel, Symfony)?
- **Ventajas de vanilla**: Código simple, menos dependencias, fácil de entender
- **Desventajas**: Menos features (ORM, migrations, auth automático)
- **Para producción**: Considera agregar framework o refactorizar a MVC cleaner

### ¿Por qué PDO en lugar de mysqli?
- PDO es agnóstico (trabaja con MySQL, PostgreSQL, SQLite, etc.)
- Sintaxis más consistente
- Mejor para prepared statements

### ¿Por qué localStorage ya no se usa?
- Datos no persistían entre dispositivos
- Límite de 5MB por origen
- Ideal para caché temporal, no para datos críticos
- **Mejor**: Base de datos en servidor

### ¿Por qué no usamos JWT (JSON Web Tokens)?
- Sessions PHP son válidas para aplicación monolítica
- JWT se usa en APIs multi-cliente (mobile, web, etc.)
- Para arquitectura actual, sesiones son suficientes

---

**Última actualización:** Marzo 3, 2026  
**Versión:** 2.0 (con API REST completa)
