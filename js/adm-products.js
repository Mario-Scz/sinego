// JS para panel admin de productos
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('adminProducts')) {
        cargarProductosAdmin();
        document.getElementById('addProductBtn')?.addEventListener('click', abrirFormularioCrear);
    }
});

function cargarProductosAdmin() {
    fetch('/api/admin_products.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (data.success) renderTablaProductos(data.items);
            else mostrarNotificacion('No se pudieron cargar productos', 'error');
        }).catch(err => debug('error admin load', err));
}

function renderTablaProductos(items) {
    const tbody = document.getElementById('adminProductsBody');
    tbody.innerHTML = '';
    items.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td data-label="ID">${p.id}</td>
            <td data-label="Nombre"><input type="text" value="${escapeHtml(p.nombre)}" disabled></td>
            <td data-label="Precio"><input type="number" step="0.01" value="${parseFloat(p.precio)}" disabled></td>
            <td data-label="Género"><input type="text" value="${escapeHtml(p.genero||'')}" disabled></td>
            <td data-label="Acciones">
                <button class="btn-acc edi">✏️</button>
                <button class="btn-acc del">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    configurarAccionesTabla();
}

function configurarAccionesTabla() {
    document.querySelectorAll('#adminProductsBody tr').forEach((row, idx) => {
        const edi = row.querySelector('.btn-acc.edi');
        const del = row.querySelector('.btn-acc.del');
        edi.onclick = function() { activarEdicionProducto(row); };
        del.onclick = function() { eliminarProducto(row); };
    });
}

function activarEdicionProducto(row) {
    const inputs = row.querySelectorAll('input');
    inputs.forEach(i=>i.disabled=false);
    inputs[0].focus();
    const ediBtn = row.querySelector('.btn-acc.edi');
    ediBtn.textContent = '✓';
    ediBtn.onclick = function() { guardarProducto(row); };
}

function guardarProducto(row) {
    const id = parseInt(row.querySelector('td:first-child').textContent);
    const nombre = row.querySelector('td:nth-child(2) input').value.trim();
    const precio = parseFloat(row.querySelector('td:nth-child(3) input').value) || 0;
    const genero = row.querySelector('td:nth-child(4) input').value.trim();

    fetch('/api/admin_products.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ action: 'update', id: id, nombre: nombre, precio: precio, genero: genero })
    }).then(r=>r.json()).then(data=>{
        if (data.success) {
            mostrarNotificacion('Producto actualizado', 'success');
            cargarProductosAdmin();
        } else mostrarNotificacion(data.message || 'Error', 'error');
    });
}

function eliminarProducto(row) {
    if (!confirm('Eliminar este producto?')) return;
    const id = parseInt(row.querySelector('td:first-child').textContent);
    fetch('/api/admin_products.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ action: 'delete', id: id })
    }).then(r=>r.json()).then(data=>{
        if (data.success) {
            mostrarNotificacion('Producto eliminado', 'success');
            cargarProductosAdmin();
        } else mostrarNotificacion(data.message || 'Error', 'error');
    });
}

function abrirFormularioCrear() {
    const form = document.getElementById('createProductForm');
    form.style.display = 'block';
    form.querySelector('input[name="nombre"]').focus();
    form.querySelector('button[type="submit"]').onclick = function(e){
        e.preventDefault();
        crearProductoDesdeFormulario();
    };
}

function crearProductoDesdeFormulario() {
    const form = document.getElementById('createProductForm');
    const nombre = form.querySelector('input[name="nombre"]').value.trim();
    const descripcion = form.querySelector('textarea[name="descripcion"]').value.trim();
    const precio = parseFloat(form.querySelector('input[name="precio"]').value) || 0;
    const genero = form.querySelector('input[name="genero"]').value.trim();

    fetch('/api/admin_products.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ action: 'create', nombre: nombre, descripcion: descripcion, precio: precio, genero: genero })
    }).then(r=>r.json()).then(data=>{
        if (data.success) {
            mostrarNotificacion('Producto creado', 'success');
            form.reset();
            form.style.display = 'none';
            cargarProductosAdmin();
        } else mostrarNotificacion(data.message || 'Error', 'error');
    });
}

function escapeHtml(str){
    return String(str).replace(/[&<>\"]/g, function(s){
        return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[s];
    });
}
