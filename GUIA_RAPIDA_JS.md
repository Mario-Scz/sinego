# 📖 GUÍA RÁPIDA - Funciones por Archivo JS

## 🔗 Mapeo HTML ↔ JavaScript

| HTML | JavaScript | Función |
|------|-----------|---------|
| `register.html` | `common.js` + `register.js` | Iniciar sesión |
| `bienvenido.html` | `common.js` | Página de bienvenida |
| `menu.html` | `common.js` + `menu.js` | Menú principal |
| `cliente.html` | `common.js` + `cliente.js` | Lista de clientes |
| `cl add.html` | `common.js` + `cl-add.js` | Agregar cliente |
| `facturar.html` | `common.js` + `facturar.js` | Lista de facturas |
| `fac add.html` | `common.js` + `fac-add.js` | Agregar factura |
| `administrar.html` | `common.js` + `administrar.js` | Administración |
| `adm agregar.html` | `common.js` + `adm-add.js` | Agregar usuario |
| `catalog.html` | `common.js` + `catalog.js` | Gestión catálogo |
| `cat add.html` | `common.js` + `cat-add.js` | Agregar libro |
| `catalogo.html` | `common.js` + `catalogo.js` | Tienda online |
| `imprenta.html` | `common.js` + `imprenta.js` | Imprenta |
| `imp add.html` | `common.js` + `imp-add.js` | Agregar producción |
| `logistica.html` | `common.js` + `logistica.js` | Logística |
| `log add.html` | `common.js` + `log-add.js` | Agregar envío |

---

## 📋 Funciones por Archivo

### 🎯 common.js
```javascript
// Menú y navegación
- Cierre automático de menú hamburguesa

// Notificaciones
mostrarNotificacion(mensaje, tipo = 'success')

// Validadores
validarEmail(email)                  → boolean
validarTelefono(telefono)            → boolean

// Storage
Storage.set(clave, valor)            → guardar
Storage.get(clave)                   → obtener
Storage.remove(clave)                → eliminar
Storage.clear()                      → limpiar todo

// Utilidades
obtenerParametroURL(parametro)       → string
debug(mensaje, datos)                → void
```

### 🔐 register.js
```javascript
// Evento: submit del formulario
→ Valida usuario y contraseña
→ Guarda en localStorage
→ Muestra notificación
→ Redirige a menu.html
```

### 👥 cliente.js
```javascript
inicializarGestionClientes()
filtrarClientes(e)                   → filtra tabla
editarCliente(row)                   → activa edición
eliminarCliente(row)                 → elimina fila
validarDatosCliente(...)             → boolean
configurarBotonesAccion()            → event listeners
```

### ➕ cl-add.js
```javascript
inicializarFormularioCliente()
validarCampoClienteAñadir(e)         → boolean
guardarNuevoCliente()                → guarda y redirige
```

### 💰 facturar.js
```javascript
inicializarGestionFacturacion()
filtrarFacturas(e)                   → filtra tabla
editarFactura(row)                   → activa edición
eliminarFactura(row)                 → elimina fila
validarDatosFactura()                → boolean
configurarBotonesAccionFacturas()    → event listeners
```

### ➕ fac-add.js
```javascript
inicializarFormularioFactura()
validarCampoFactura(e)               → boolean
guardarNuevaFactura()                → guarda y redirige
```

### ⚙️ administrar.js
```javascript
inicializarGestionAdministracion()
filtrarUsuarios(e)                   → filtra tabla
editarUsuario(row)                   → activa edición
eliminarUsuario(row)                 → elimina fila
configurarBotonesAccionAdmin()       → event listeners
```

### ➕ adm-add.js
```javascript
inicializarFormularioUsuario()
validarCampoUsuario(e)               → boolean
guardarNuevoUsuario()                → guarda y redirige
```

### 📚 catalog.js
```javascript
inicializarGestionCatalogo()
filtrarLibros(e)                     → filtra tabla
editarLibro(row)                     → activa edición
eliminarLibro(row)                   → elimina fila
configurarBotonesAccionCatalogo()    → event listeners
```

### ➕ cat-add.js
```javascript
inicializarFormularioCatalogo()
validarCampoCatalogo(e)              → boolean
guardarNuevoLibro()                  → guarda y redirige
```

### 🛍️ catalogo.js (Tienda)
```javascript
inicializarCatalogo()
buscarProductos(e)                   → filtra productos
aplicarFiltros()                     → aplica géneros
configurarBotonesCarrito()           → event listeners
agregarAlCarrito(nombre, precio)     → guarda en localStorage
verCarrito()                         → muestra carrito
vaciarCarrito()                      → limpia carrito
```

### 🏭 imprenta.js
```javascript
inicializarImprenta()
buscarServicios(e)                   → filtra tabla
editarServicio(row)                  → activa edición
eliminarServicio(row)                → elimina fila
configurarBotonesImprenta()          → event listeners
```

### ➕ imp-add.js
```javascript
inicializarFormularioImprenta()
validarCampoImprenta(e)              → boolean
guardarNuevaProduccion()             → guarda y redirige
```

### 📦 logistica.js
```javascript
inicializarLogistica()
buscarEnvios(e)                      → filtra tabla
editarEnvio(row)                     → activa edición
eliminarEnvio(row)                   → elimina fila
configurarBotonesLogistica()         → event listeners
```

### ➕ log-add.js
```javascript
inicializarFormularioLogistica()
validarCampoLogistica(e)             → boolean
guardarNuevoEnvio()                  → guarda y redirige
```

### 🎨 menu.js
```javascript
inicializarMenuPrincipal()
configurarTarjetasAcciones()         → efectos hover
```

---

## 🎬 Flujos de Ejecución

### Agregar Cliente
```
user clicks "+ Nuevo Cliente"
    ↓
navigate to cl add.html
    ↓
DOMContentLoaded → inicializarFormularioCliente()
    ↓
user fills form + submit
    ↓
validar campos
    ↓
Storage.set('clientes', [...])
    ↓
mostrarNotificacion('✓ Cliente agregado')
    ↓
setTimeout → redirect a cliente.html
    ↓
DOMContentLoaded → inicializarGestionClientes()
```

### Editar Cliente
```
user clicks ✏️ button
    ↓
editarCliente(row)
    ↓
habilitar campos para edición
    ↓
cambiar botón a ✓
    ↓
user edita + clicks ✓
    ↓
validar datos
    ↓
guardar cambios
    ↓
mostrarNotificacion('✓ Cliente actualizado')
    ↓
deshabilitar campos
    ↓
restaurar botón a ✏️
```

### Buscar
```
user types in search input
    ↓
event: 'input' triggered
    ↓
filtrar función ejecutada
    ↓
obtener término de búsqueda
    ↓
loop sobre filas de tabla
    ↓
comparar con múltiples campos
    ↓
show/hide filas dinámicamente
    ↓
mostrar contador de resultados
```

---

## 🔧 Patrones de Codificación

### Inicialización
```javascript
document.addEventListener('DOMContentLoaded', function() {
    inicializarFuncion();
});

function inicializarFuncion() {
    // Obtener elementos
    // Agregar event listeners
    // Inicializar estado
}
```

### Validación
```javascript
function validarCampo(e) {
    const valor = e.target.value.trim();
    
    if (condición_error) {
        e.target.style.borderColor = '#f44336';
        return false;
    } else {
        e.target.style.borderColor = '#4CAF50';
        return true;
    }
}
```

### Guardado
```javascript
// Obtener datos
const datos = { ... };

// Validar
if (!validar(datos)) return;

// Guardar
let items = Storage.get('items') || [];
items.push({
    id: Date.now(),
    ...datos,
    fechaCreacion: new Date().toISOString()
});
Storage.set('items', items);

// Notificar
mostrarNotificacion('✓ Guardado correctamente', 'success');

// Redirigir
setTimeout(() => {
    window.location.href = 'lista.html';
}, 1500);
```

### Event Delegation
```javascript
const table = document.querySelector('.data-table');
const deleteButtons = table.querySelectorAll('.btn-action.delete');

deleteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const row = this.closest('tr');
        eliminarItem(row);
    });
});
```

---

## 📊 Estructura de Datos

### Cliente
```javascript
{
    id: timestamp,
    nombre: string,
    telefono: string,
    correo: string,
    fechaCreacion: ISO date string
}
```

### Factura
```javascript
{
    id: timestamp,
    idFactura: string,
    cliente: string,
    comentario: string,
    fechaCreacion: ISO date string
}
```

### Usuario
```javascript
{
    id: timestamp,
    usuario: string,
    correo: string,
    rol: string,
    fechaCreacion: ISO date string
}
```

### Producto (Carrito)
```javascript
{
    id: timestamp,
    nombre: string,
    precio: string,
    cantidad: number
}
```

### Usuario Logueado
```javascript
{
    usuario: string,
    fechaLogin: ISO date string
}
```

---

## 🎨 Estilos Dinámicos

### Campos en Edición
```css
.data-table input:disabled {
    background-color: transparent;
    border: none;
    padding: 0;
}
```

### Animaciones
```css
@keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateX(0); }
    to { opacity: 0; transform: translateX(-20px); }
}
```

---

## 🚨 Manejo de Errores

### Validación Triple
1. **Frontend JS** - Antes de enviar
2. **Backend API** - Al recibir (IMPORTANTE)
3. **Base de Datos** - Constraints

### Mensajes de Error
```javascript
'Por favor ingresa un [campo]' - campo vacío
'El [campo] no es válido' - formato incorrecto
'El [campo] debe tener al menos X caracteres' - longitud
'¿Estás seguro de que deseas [acción]?' - confirmación
'✓ [recurso] [acción] correctamente' - éxito
```

---

## 🔍 Debug Tips

### Activar Debug
```javascript
// En common.js, cambiar:
const DEBUG = true;  // Ver todos los logs

// Usar en código:
debug('Información', { datos });
```

### Storage Inspector
```javascript
// En consola del navegador:
localStorage.getItem('clientes')
JSON.parse(localStorage.getItem('clientes'))
localStorage.clear()
```

### Event Listeners
```javascript
// Ver qué listeners están activos:
getEventListeners(document)
```

---

## ✅ Checklist de Validación

- [ ] Email válido (regex)
- [ ] Teléfono válido (7+ caracteres)
- [ ] Contraseña (6+ caracteres)
- [ ] Usuario (3+ caracteres)
- [ ] Precio > 0
- [ ] Campos no vacíos
- [ ] Confirmación de eliminación
- [ ] Notificación mostrada
- [ ] Datos guardados en localStorage
- [ ] Redirección correcta

---

## 🎯 Próximas Mejoras Sugeridas

1. **Paginación**: Agregar paginación en tablas grandes
2. **Exportar**: Descargar datos como CSV/PDF
3. **Buscar avanzado**: Múltiples filtros combinados
4. **Historial**: Registro de cambios
5. **Backup**: Descargar y restaurar datos
6. **Sincronización**: Con servidor en tiempo real
7. **Offline Mode**: Funcionar sin internet

---

**Queja o sugerencia: Ver DOCUMENTACION_JS.md para detalles completos**
