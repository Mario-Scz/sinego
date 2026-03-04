# API Endpoints — Documentación

Esta documentación describe todos los endpoints disponibles en Sinego.

## Autenticación

Todos los endpoints requieren una sesión PHP válida excepto `/api/login.php`.

### POST /api/login.php

Autentica un usuario y crea una sesión.

**Entrada (JSON):**
```json
{
  "usr": "usuario",
  "pwd": "contraseña"
}
```

**Salida (JSON):**
```json
{
  "success": true,
  "usuario": "nombre_en_sesion"
}
```
ó
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

**Validaciones:**
- Usuario: 3-50 caracteres, alfanuméricos
- Contraseña: mínimo 4 caracteres
- Contraseña verificada con `password_hash`

---

## Productos (Cliente)

### GET /api/productos.php

Lista todos los productos. Soporta filtros opcionales.

**Parámetros (GET):**
- `search` (opcional): buscar en nombre/descripción
- `genero` (opcional): filtrar por género

**Salida (JSON):**
```json
{
  "success": true,
  "productos": [
    {
      "id": 1,
      "nombre": "Libro A",
      "descripcion": "...",
      "precio": 25.99,
      "imagen": "../img/...",
      "genero": "Ficción"
    }
  ]
}
```

---

## Carrito

Requiere sesión autenticada (`$_SESSION['id']`).

### GET /api/cart.php?action=list

Lista items del carrito del usuario.

**Salida:**
```json
{
  "success": true,
  "items": [
    {
      "id": 1,
      "nombre": "Libro A",
      "precio": 25.99,
      "cantidad": 1
    }
  ]
}
```

### POST /api/cart.php

Realiza operaciones en el carrito.

**Entrada (JSON):**
```json
{
  "action": "add",
  "product_id": 1,
  "cantidad": 1
}
```

**Actions disponibles:**
- `add` — agregar producto (product_id, cantidad)
- `remove` — eliminar producto (product_id)
- `update` — actualizar cantidad (product_id, cantidad)
- `clear` — vaciar carrito

**Salida:**
```json
{
  "success": true
}
```

---

## Favoritos

Requiere sesión autenticada.

### GET /api/favorites.php?action=list

Lista favoritos del usuario.

**Salida:**
```json
{
  "success": true,
  "items": [
    {
      "id": 1,
      "nombre": "Libro A",
      "precio": 25.99
    }
  ]
}
```

### POST /api/favorites.php

Gestiona favoritos.

**Entrada (JSON):**
```json
{
  "action": "add",
  "product_id": 1
}
```

**Actions:**
- `add` — agregar a favoritos
- `remove` — eliminar de favoritos

---

## Administración de Productos

Requiere sesión autenticada con `role = 'admin'`.

### GET /api/admin_products.php?action=list

Lista todos los productos con detalles (para admin).

### POST /api/admin_products.php

CRUD de productos.

**Crear producto:**
```json
{
  "action": "create",
  "nombre": "Nuevo Producto",
  "descripcion": "...",
  "precio": 29.99,
  "genero": "Ficción"
}
```

**Actualizar producto:**
```json
{
  "action": "update",
  "id": 1,
  "nombre": "Nombre actualizado",
  "precio": 34.99
}
```

**Eliminar producto:**
```json
{
  "action": "delete",
  "id": 1
}
```

---

## Manejo de Errores

Todos los errores devuelven HTTP 200 (para compatibilidad con navegadores) con payload:
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

Los errores se registran en `logs/app.log`.

---

## Seguridad

- **Validación de entrada:** todos los campos se sanitizan con `sanitize_input()`
- **Autenticación:** sesiones PHP regeneradas en login
- **Autorización:** endpoints admin verifican `isAdmin()`
- **Prepared statements:** todas las queries usan parametrización
- **Logging:** intentos fallidos se registran

---

## Ejemplos cURL

### Login
```bash
curl -X POST http://localhost:8000/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"usr":"admin","pwd":"password123"}'
```

### Crear producto
```bash
curl -X POST http://localhost:8000/api/admin_products.php \
  -H "Content-Type: application/json" \
  -d '{
    "action":"create",
    "nombre":"Libro nuevo",
    "precio":49.99,
    "genero":"Drama"
  }' \
  --cookie "PHPSESSID=..."
```

### Listar productos
```bash
curl "http://localhost:8000/api/productos.php?search=libro"
```

---

## Notas para Desarrollo

- En producción, cambiar `APP_DEBUG=false` en `.env`
- Configurar HTTPS y `SESSION_SECURE=true` en producción
- Revisar `logs/app.log` para debugging
- Usar variables de entorno (`.env`) para credenciales
