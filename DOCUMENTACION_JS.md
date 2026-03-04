# 📋 DOCUMENTACIÓN - Sistema JavaScript Sinego

## 🎯 Resumen General
Se ha creado un sistema completo de JavaScript para todas las pantallas de la aplicación Sinego, incluyendo:
- Gestión de menú y navegación
- Validación de formularios
- CRUD (crear, leer, actualizar, eliminar) de datos
- Búsquedas y filtros
- Notificaciones de usuario
- Almacenamiento local

---

## 📁 Estructura de Archivos JavaScript

### 1. **common.js** - Funciones Compartidas
**Ubicación:** `js/common.js`

**Funcionalidades:**
- Manejo del menú hamburguesa (navbar)
- Cierre automático de menú al hacer click en enlaces
- Notificaciones emergentes (toast)
- Validadores (email, teléfono)
- Wrapper para localStorage
- Funciones de utilidad

**Funciones principales:**
```javascript
mostrarNotificacion(mensaje, tipo)  // Mostrar notificación
validarEmail(email)                 // Validar formato de email
validarTelefono(telefono)           // Validar formato de teléfono
Storage.set(clave, valor)           // Guardar en localStorage
Storage.get(clave)                  // Obtener de localStorage
debug(mensaje, datos)               // Debug en consola
```

---

## 🔐 Autenticación

### 2. **register.js** - Iniciar Sesión
**Ubicación:** `js/register.js`
**HTML asociado:** `vistas/register.html`

**Funcionalidades:**
- Validación de usuario y contraseña
- Guardado de sesión en localStorage
- Redirección al menú después del login
- Notificaciones de error

**Eventos:**
- `submit` del formulario de login

---

## 👥 Gestión de Clientes

### 3. **cliente.js** - Lista de Clientes
**Ubicación:** `js/cliente.js`
**HTML asociado:** `vistas/cliente.html`

**Funcionalidades:**
- Búsqueda de clientes (por nombre, teléfono, correo)
- Editar cliente inline
- Eliminar cliente con confirmación
- Validación de datos

**Funciones:**
```javascript
filtrarClientes(e)                  // Buscar clientes
editarCliente(row)                  // Editar cliente
eliminarCliente(row)                // Eliminar cliente
validarDatosCliente(...)            // Validar datos
```

### 4. **cl-add.js** - Agregar Nuevo Cliente
**Ubicación:** `js/cl-add.js`
**HTML asociado:** `vistas/cl add.html`

**Funcionalidades:**
- Validación en tiempo real de campos
- Guardar nuevo cliente
- Almacenar en localStorage
- Redirección a lista de clientes

**Campos:**
- Nombre (mínimo 3 caracteres)
- Teléfono (formato validado)
- Correo (formato validado)

---

## 💰 Facturación

### 5. **facturar.js** - Lista de Facturas
**Ubicación:** `js/facturar.js`
**HTML asociado:** `vistas/facturar.html`

**Funcionalidades:**
- Búsqueda de facturas (por ID, cliente, comentario)
- Editar factura inline
- Eliminar factura
- Validación de datos

### 6. **fac-add.js** - Agregar Nueva Factura
**Ubicación:** `js/fac-add.js`
**HTML asociado:** `vistas/fac add.html`

**Funcionalidades:**
- Formulario para nueva factura
- Validación de campos
- Guardar con timestamp

---

## ⚙️ Administración

### 7. **administrar.js** - Gestión de Usuarios
**Ubicación:** `js/administrar.js`
**HTML asociado:** `vistas/administrar.html`

**Funcionalidades:**
- Búsqueda de usuarios
- Editar usuario inline
- Eliminar usuario
- Validaciones

### 8. **adm-add.js** - Agregar Usuario
**Ubicación:** `js/adm-add.js`
**HTML asociado:** `vistas/adm agregar.html`

**Funcionalidades:**
- Validación de usuario, correo, contraseña
- Asignación de rol
- Guardado seguro

**Campos:**
- Usuario (mínimo 3 caracteres)
- Correo (válido)
- Contraseña (mínimo 6 caracteres)
- Rol (selector)

---

## 📚 Catálogo

### 9. **catalogo.js** - Tienda Online
**Ubicación:** `js/catalogo.js`
**HTML asociado:** `vistas/catalogo.html`

**Funcionalidades:**
- Búsqueda de productos
- Filtrado por géneros
- Agregar al carrito
- Notificaciones de compra
- Gestión de carrito en localStorage

**Funciones:**
```javascript
buscarProductos(e)                  // Buscar productos
aplicarFiltros()                    // Aplicar filtros
agregarAlCarrito(nombre, precio)    // Agregar carrito
verCarrito()                        // Ver carrito
vaciarCarrito()                     // Vaciar carrito
```

### 10. **catalog.js** - Gestión de Catálogo
**Ubicación:** `js/catalog.js`
**HTML asociado:** `vistas/catalog.html`

**Funcionalidades:**
- Búsqueda de libros
- Editar libro inline
- Eliminar libro
- CRUD de catálogo

### 11. **cat-add.js** - Agregar Libro
**Ubicación:** `js/cat-add.js`
**HTML asociado:** `vistas/cat add.html`

**Funcionalidades:**
- Formulario para nuevo libro
- Validación de precio (debe ser > 0)
- Guardado con timestamp

---

## 🏭 Imprenta

### 12. **imprenta.js** - Gestión de Imprenta
**Ubicación:** `js/imprenta.js`
**HTML asociado:** `vistas/imprenta.html`

**Funcionalidades:**
- Búsqueda de servicios
- Editar servicio inline
- Eliminar servicio
- CRUD de producción

### 13. **imp-add.js** - Agregar Producción
**Ubicación:** `js/imp-add.js`
**HTML asociado:** `vistas/imp add.html`

**Funcionalidades:**
- Formulario para nueva producción
- Campos: ID Libro, Autor, Tipo de Impresión
- Redirección a imprenta2.html

---

## 📦 Logística

### 14. **logistica.js** - Gestión de Envíos
**Ubicación:** `js/logistica.js`
**HTML asociado:** `vistas/logistica.html`

**Funcionalidades:**
- Búsqueda de envíos
- Editar envío inline
- Eliminar envío
- CRUD de logística

### 15. **log-add.js** - Agregar Envío
**Ubicación:** `js/log-add.js`
**HTML asociado:** `vistas/log add.html`

**Funcionalidades:**
- Formulario para nuevo envío
- Campos: ID Libro, Autor, Tipo de Envío
- Guardado con timestamp

---

## 🎨 Menú Principal

### 16. **menu.js** - Panel de Control
**Ubicación:** `js/menu.js`
**HTML asociado:** `vistas/menu.html`

**Funcionalidades:**
- Efectos hover en tarjetas de acciones
- Animaciones suaves
- Interactividad en cards

---

## 🔄 Flujo de Datos

### LocalStorage (Simulación de Base de Datos)

```
localStorage
├── usuarioLogueado    // Sesión actual
├── clientes          // Array de clientes
├── facturas          // Array de facturas
├── usuarios          // Array de usuarios
├── libros            // Array de libros
├── producciones      // Array de producciones
├── envios            // Array de envíos
└── carrito           // Array de productos en carrito
```

---

## 📌 Validaciones Implementadas

### Email
- Formato: `usuario@dominio.com`
- Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

### Teléfono
- Mínimo 7 caracteres
- Permite: números, espacios, +, -, ()
- Regex: `/^[0-9\s+\-()]{7,}$/`

### Contraseña
- Mínimo 6 caracteres

### Usuario
- Mínimo 3 caracteres

### Precio
- Debe ser > 0
- Formato numérico

---

## 🎯 Integraciones en HTML

### Estructura básica en cada página:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Página</title>
    <link rel="stylesheet" href="../css/estilo.css">
</head>
<body>
    <!-- Contenido HTML -->
    
    <!-- Scripts al final -->
    <script src="../js/common.js"></script>
    <script src="../js/pagina.js"></script>
</body>
</html>
```

---

## 💡 Funcionalidades Especiales

### Notificaciones Toast
```javascript
mostrarNotificacion('Mensaje', 'success')  // Verde
mostrarNotificacion('Mensaje', 'error')    // Rojo
mostrarNotificacion('Mensaje', 'info')     // Azul
```

### Edición Inline
- Click en botón ✏️ activa edición
- Validación en tiempo real
- Botón cambia a ✓ para guardar
- Click en ✓ guarda cambios

### Búsqueda Dinámica
- Filtra en tiempo real mientras escribes
- Busca en múltiples campos
- Sin límite de resultados

### Debug Mode
- `debug(mensaje, datos)` registra en consola
- Se puede deshabilitar en `common.js` (DEBUG = false)

---

## 🚀 Cómo Usar

### 1. Iniciar Sesión
1. Ir a `register.html`
2. Ingresar usuario y contraseña
3. Se guardará en localStorage
4. Se redirige a `menu.html`

### 2. Agregar un Cliente
1. Ir a `cliente.html`
2. Click en "+ Nuevo Cliente"
3. Completar formulario en `cl add.html`
4. Submit para guardar
5. Se redirige a lista actualizada

### 3. Editar Cliente
1. En `cliente.html` click en botón ✏️
2. Los campos se habilitan para editar
3. Realizar cambios
4. Click en ✓ para guardar

### 4. Buscar
1. Usar la barra de búsqueda
2. Escribir término
3. Se filtran los resultados en tiempo real

---

## 📊 Diagrama de Flujo

```
Inicio (register.html)
    ↓
Menú Principal (menu.html)
    ├→ Clientes (cliente.html)
    │   ├→ Agregar (cl add.html)
    │   ├→ Editar (inline)
    │   └→ Eliminar
    │
    ├→ Facturación (facturar.html)
    │   ├→ Agregar (fac add.html)
    │   ├→ Editar (inline)
    │   └→ Eliminar
    │
    ├→ Catálogo (catalog.html / catalogo.html)
    │   ├→ Agregar Libro (cat add.html)
    │   ├→ Editar (inline)
    │   └→ Eliminar
    │
    ├→ Imprenta (imprenta.html)
    │   ├→ Agregar (imp add.html)
    │   ├→ Editar (inline)
    │   └→ Eliminar
    │
    ├→ Logística (logistica.html)
    │   ├→ Agregar (log add.html)
    │   ├→ Editar (inline)
    │   └→ Eliminar
    │
    └→ Administración (administrar.html)
        ├→ Agregar Usuario (adm agregar.html)
        ├→ Editar (inline)
        └→ Eliminar
```

---

## ⚠️ Notas Importantes

1. **LocalStorage**: Todos los datos se guardan en el navegador. Al cerrar/limpiar caché se pierden.
2. **No hay Backend**: Se necesita conectar a una API real para persistencia.
3. **Validación**: Todas las validaciones se hacen en frontend. Se recomienda validar también en backend.
4. **Seguridad**: Las contraseñas se almacenan en texto plano (solo para demo). En producción usar hash/encriptación.

---

## 🔧 Próximos Pasos

1. **Conectar a Backend**: Reemplazar `localStorage` con llamadas API
2. **Autenticación Real**: Implementar JWT o sesiones
3. **Base de Datos**: Implementar persistencia real
4. **Manejo de Errores**: Mejorar manejo de excepciones
5. **Testing**: Agregar pruebas unitarias
6. **Responsive**: Optimizar para móviles

---

## 📞 Resumen de Cambios

### Archivos Creados (16 total)
- ✅ `js/common.js` - Funciones compartidas
- ✅ `js/register.js` - Login
- ✅ `js/cliente.js` - Lista clientes
- ✅ `js/cl-add.js` - Agregar cliente
- ✅ `js/facturar.js` - Lista facturas
- ✅ `js/fac-add.js` - Agregar factura
- ✅ `js/administrar.js` - Gestión usuarios
- ✅ `js/adm-add.js` - Agregar usuario
- ✅ `js/catalogo.js` - Tienda online
- ✅ `js/catalog.js` - Gestión catálogo
- ✅ `js/cat-add.js` - Agregar libro
- ✅ `js/imprenta.js` - Gestión imprenta
- ✅ `js/imp-add.js` - Agregar producción
- ✅ `js/logistica.js` - Gestión envíos
- ✅ `js/log-add.js` - Agregar envío
- ✅ `js/menu.js` - Panel control

### Archivos Modificados (15 HTML)
Todos los HTML ahora incluyen referencias a:
- `common.js` (en todas las páginas)
- El archivo JS específico de cada página

---

## 🎓 Ejemplos de Uso

### Obtener datos guardados
```javascript
let clientes = Storage.get('clientes');
console.log(clientes);
```

### Guardar nuevos datos
```javascript
Storage.set('clientes', [
    { id: 1, nombre: 'Juan', telefono: '123456', correo: 'juan@example.com' }
]);
```

### Mostrar notificación
```javascript
mostrarNotificacion('¡Éxito!', 'success');
```

### Debug
```javascript
debug('Información importante:', { usuario: 'admin', acción: 'login' });
```

---

**Proyecto completado: 25/02/2026**
