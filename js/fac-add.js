// ============================================
// AGREGAR NUEVA FACTURA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarfrmFactura();
});

function inicializarfrmFactura() {
    const frm = document.querySelector('.frm');
    
    if (frm) {
        // Validar en tiempo real
        const inputs = frm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validarcmpFactura);
        });
        
        // Submit del frm
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevaFactura();
        });
        
        debug('frm de agregar factura inicializado');
    }
}

function validarcmpFactura(e) {
    const cmp = e.target;
    const valor = cmp.value.trim();
    
    if (!valor) {
        cmp.style.borderColor = '#f44336';
        return false;
    } else {
        cmp.style.borderColor = '#4CAF50';
        return true;
    }
}

function guardarNuevaFactura() {
    const inputs = document.querySelectorAll('.frm input');
    const datos = {};
    let valido = true;
    
    inputs.forEach(input => {
        const valor = input.value.trim();
        if (!valor) {
            mostrarNotificacion(`El cmp "${input.placeholder}" no puede estar vacío`, 'error');
            input.focus();
            valido = false;
            return;
        }
        datos[input.id] = valor;
    });
    
    if (!valido) return;
    
    debug('Nueva factura guardada:', datos);
    
    // Guardar en localStorage (simulación)
    let facturas = Storage.get('facturas') || [];
    facturas.push({
        id: Date.now(),
        ...datos,
        fechaCreacion: new Date().toISOString()
    });
    Storage.set('facturas', facturas);
    
    mostrarNotificacion('✓ Factura agregada correctamente', 'success');
    
    // Redirigir a la lista de facturas después de 1.5 segundos
    setTimeout(() => {
        window.location.href = 'facturar.html';
    }, 1500);
}


