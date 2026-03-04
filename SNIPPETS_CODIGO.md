# 💻 SNIPPETS - Código Listo para Copiar

## 📋 Índice Rápido
1. [Inicialización](#inicialización)
2. [Validación](#validación)
3. [Búsqueda](#búsqueda)
4. [CRUD](#crud)
5. [Storage](#storage)
6. [UI](#ui)
7. [Fetch/API](#fetchapi)

---

## Inicialización

### Template Básico
```javascript
document.addEventListener('DOMContentLoaded', function() {
    inicializarPagina();
    debug('Página inicializada');
});

function inicializarPagina() {
    // Buscar elementos
    const elemento = document.querySelector('.selector');
    
    // Agregar listeners
    if (elemento) {
        elemento.addEventListener('event', funcionHandler);
    }
}
```

### Script Tags (agregar al final del HTML)
```html
<script src="../js/common.js"></script>
<script src="../js/nombre-pagina.js"></script>
```

---

## Validación

### Email
```javascript
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Uso:
if (!validarEmail('test@example.com')) {
    mostrarNotificacion('Email inválido', 'error');
}
```

### Teléfono
```javascript
function validarTelefono(telefono) {
    const regex = /^[0-9\s+\-()]{7,}$/;
    return regex.test(telefono);
}
```

### Campo Requerido
```javascript
function validarRequerido(valor) {
    return valor.trim().length > 0;
}
```

### Longitud Mínima
```javascript
function validarMinimo(valor, min = 3) {
    return valor.trim().length >= min;
}
```

### Número Positivo
```javascript
function validarNumero(valor, minimo = 0) {
    const num = parseFloat(valor);
    return !isNaN(num) && num > minimo;
}
```

### Validar Formulario Completo
```javascript
function validarFormulario(formulario) {
    const inputs = formulario.querySelectorAll('input, textarea');
    let todasValidas = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#f44336';
            todasValidas = false;
        } else {
            input.style.borderColor = '#4CAF50';
        }
    });
    
    return todasValidas;
}
```

---

## Búsqueda

### Búsqueda Simple
```javascript
function buscar(e) {
    const searchTerm = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(searchTerm) ? '' : 'none';
    });
}

// Uso en HTML:
// <input class="search" placeholder="Buscar...">

// Agregar listener:
document.querySelector('.search').addEventListener('input', buscar);
```

### Búsqueda en Tabla
```javascript
function buscarEnTabla(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('table tbody tr');
    let resultados = 0;
    
    rows.forEach(row => {
        const celdas = row.querySelectorAll('td');
        let coincide = false;
        
        celdas.forEach(celda => {
            if (celda.textContent.toLowerCase().includes(searchTerm)) {
                coincide = true;
            }
        });
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) resultados++;
    });
    
    debug(`Resultados encontrados: ${resultados}`);
}
```

### Búsqueda Avanzada (múltiples campos)
```javascript
function buscarAvanzado(e, camposABuscar = []) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('table tbody tr');
    
    rows.forEach(row => {
        const celdasABuscar = row.querySelectorAll(
            camposABuscar.map(n => `td:nth-child(${n})`).join(',')
        );
        
        let coincide = false;
        celdasABuscar.forEach(celda => {
            if (celda.textContent.toLowerCase().includes(searchTerm)) {
                coincide = true;
            }
        });
        
        row.style.display = coincide ? '' : 'none';
    });
}
```

---

## CRUD

### Create (Crear)
```javascript
function crearRegistro(datos) {
    let registros = Storage.get('registros') || [];
    
    registros.push({
        id: Date.now(),
        ...datos,
        fechaCreacion: new Date().toISOString()
    });
    
    Storage.set('registros', registros);
    debug('Registro creado:', datos);
    return true;
}
```

### Read (Leer)
```javascript
function leerRegistro(id) {
    const registros = Storage.get('registros') || [];
    return registros.find(r => r.id === id);
}

function leerTodos() {
    return Storage.get('registros') || [];
}
```

### Update (Actualizar)
```javascript
function actualizarRegistro(id, datosNuevos) {
    let registros = Storage.get('registros') || [];
    
    registros = registros.map(r => {
        if (r.id === id) {
            return { ...r, ...datosNuevos };
        }
        return r;
    });
    
    Storage.set('registros', registros);
    debug('Registro actualizado:', id);
    return true;
}
```

### Delete (Eliminar)
```javascript
function eliminarRegistro(id) {
    if (!confirm('¿Está seguro de que desea eliminar?')) {
        return false;
    }
    
    let registros = Storage.get('registros') || [];
    registros = registros.filter(r => r.id !== id);
    
    Storage.set('registros', registros);
    debug('Registro eliminado:', id);
    return true;
}
```

---

## Storage

### Guardar Datos
```javascript
// Guardar un objeto
Storage.set('usuario', {
    nombre: 'Juan',
    email: 'juan@example.com'
});

// Guardar un array
Storage.set('clientes', [
    { id: 1, nombre: 'Cliente 1' },
    { id: 2, nombre: 'Cliente 2' }
]);
```

### Obtener Datos
```javascript
// Obtener y usar
const usuario = Storage.get('usuario');
console.log(usuario.nombre);

// Con valor por defecto
const clientes = Storage.get('clientes') || [];
```

### Actualizar Datos
```javascript
let items = Storage.get('items') || [];
items.push(nuevoItem);
Storage.set('items', items);
```

### Eliminar Datos
```javascript
Storage.remove('usuario');
// Después de esto, Storage.get('usuario') retorna null
```

### Limpiar Todo
```javascript
Storage.clear();
// CUIDADO: Elimina TODO del localStorage
```

---

## UI

### Notificación Success
```javascript
mostrarNotificacion('✓ Operación exitosa', 'success');
```

### Notificación Error
```javascript
mostrarNotificacion('Error: Intenta de nuevo', 'error');
```

### Notificación Info
```javascript
mostrarNotificacion('ℹ Información importante', 'info');
```

### Animación Fade Out
```javascript
function desvanecerElemento(elemento) {
    elemento.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
        elemento.remove();
    }, 300);
}
```

### Deshabilitar/Habilitar Botón
```javascript
function deshabilitarBoton(btn) {
    btn.disabled = true;
    btn.style.opacity = '0.5';
    btn.style.cursor = 'not-allowed';
}

function habilitarBoton(btn) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.style.cursor = 'pointer';
}
```

### Cambiar Contenido
```javascript
const elemento = document.querySelector('.selector');
elemento.textContent = 'Nuevo texto';
elemento.innerHTML = '<strong>HTML</strong>';
elemento.innerText = 'Texto';
```

### Agregar/Quitar Clases
```javascript
elemento.classList.add('clase1', 'clase2');
elemento.classList.remove('clase1');
elemento.classList.toggle('activo');
elemento.classList.contains('activo'); // true/false
```

---

## Fetch/API

### GET Básico
```javascript
fetch('/api/clientes')
    .then(response => response.json())
    .then(data => {
        console.log('Datos:', data);
        mostrarNotificacion('Datos cargados', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarNotificacion('Error al cargar', 'error');
    });
```

### POST (Crear)
```javascript
fetch('/api/clientes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombre: 'Juan',
        email: 'juan@example.com',
        telefono: '123456789'
    })
})
.then(response => response.json())
.then(data => {
    mostrarNotificacion('Cliente creado', 'success');
    window.location.href = '/clientes';
})
.catch(error => {
    mostrarNotificacion('Error al crear', 'error');
});
```

### PUT (Actualizar)
```javascript
fetch(`/api/clientes/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombre: 'Juan Nuevo',
        email: 'juannuevo@example.com'
    })
})
.then(response => response.json())
.then(data => {
    mostrarNotificacion('Cliente actualizado', 'success');
})
.catch(error => {
    mostrarNotificacion('Error al actualizar', 'error');
});
```

### DELETE
```javascript
fetch(`/api/clientes/${id}`, {
    method: 'DELETE'
})
.then(response => response.json())
.then(data => {
    mostrarNotificacion('Cliente eliminado', 'success');
    location.reload();
})
.catch(error => {
    mostrarNotificacion('Error al eliminar', 'error');
});
```

### Con Autenticación (Token)
```javascript
const token = localStorage.getItem('token');

fetch('/api/clientes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => console.log(data));
```

---

## Ejemplos Completos

### Guardar Formulario
```javascript
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar
    if (!validarFormulario(formulario)) {
        mostrarNotificacion('Completa todos los campos', 'error');
        return;
    }
    
    // Obtener datos
    const formData = new FormData(formulario);
    const datos = Object.fromEntries(formData);
    
    // Guardar
    crearRegistro(datos);
    mostrarNotificacion('✓ Guardado correctamente', 'success');
    
    // Limpiar
    formulario.reset();
    
    // Redirigir después de 1.5 segundos
    setTimeout(() => {
        window.location.href = 'lista.html';
    }, 1500);
});
```

### Edición Inline
```javascript
const editButton = document.querySelector('.edit-btn');
editButton.addEventListener('click', function() {
    const row = this.closest('tr');
    const inputs = row.querySelectorAll('input');
    
    // Cambiar a edición
    inputs.forEach(input => input.disabled = false);
    this.textContent = '✓';
    this.style.backgroundColor = '#4CAF50';
    
    // Guardar al hacer click de nuevo
    this.onclick = function() {
        // Validar
        const datosValidos = Array.from(inputs).every(
            input => input.value.trim().length > 0
        );
        
        if (!datosValidos) {
            mostrarNotificacion('Completa todos los campos', 'error');
            return;
        }
        
        // Guardar
        const id = row.dataset.id;
        const datos = {};
        inputs.forEach((input, i) => {
            datos[`campo${i}`] = input.value;
        });
        
        actualizarRegistro(parseInt(id), datos);
        mostrarNotificacion('✓ Actualizado', 'success');
        
        // Deshabilitar edición
        inputs.forEach(input => input.disabled = true);
        this.textContent = '✏️';
        this.style.backgroundColor = '';
        this.onclick = null;
    };
});
```

### Carrito de Compras
```javascript
function agregarAlCarrito(producto) {
    let carrito = Storage.get('carrito') || [];
    
    // Buscar si ya existe
    const existe = carrito.find(p => p.id === producto.id);
    
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }
    
    Storage.set('carrito', carrito);
    mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
}

function obtenerTotalCarrito() {
    const carrito = Storage.get('carrito') || [];
    return carrito.reduce((total, item) => {
        return total + (parseFloat(item.precio) * item.cantidad);
    }, 0);
}

function vaciarCarrito() {
    Storage.remove('carrito');
    mostrarNotificacion('Carrito vaciado', 'success');
}
```

---

## 🎯 Tips Útiles

### Variables Globales (Evitar)
```javascript
// ❌ Malo
window.usuario = {...};

// ✅ Bueno
const usuario = {...};
Storage.set('usuario', usuario);
```

### Event Delegation
```javascript
// En lugar de:
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', eliminar);
});

// Usar:
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        eliminar(e);
    }
});
```

### Debounce para búsqueda
```javascript
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Uso:
searchInput.addEventListener('input', 
    debounce(buscar, 300) // Espera 300ms después de escribir
);
```

---

**Última actualización: 25/02/2026**
