// ============================================
// AGREGAR NUEVO ENVÍO DE LOGÍSTICA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarfrmLogistica();
});

function inicializarfrmLogistica() {
    const frm = document.querySelector('.frm');
    
    if (frm) {
        // Validar en tiempo real
        const inputs = frm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validarcmpLogistica);
        });
        
        // Submit del frm
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevoEnvio();
        });
        
        debug('frm de agregar envío inicializado');
    }
}

function validarcmpLogistica(e) {
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

function guardarNuevoEnvio() {
    const idLibro = document.getElementById('id_libro')?.value.trim() || '';
    const autor = document.getElementById('autor')?.value.trim() || '';
    const tipo = document.getElementById('tipo_envio')?.value.trim() || '';
    
    // Validaciones
    if (!idLibro) {
        mostrarNotificacion('Por favor ingresa el ID del libro', 'error');
        return;
    }
    
    if (!autor) {
        mostrarNotificacion('Por favor ingresa el autor', 'error');
        return;
    }
    
    if (!tipo) {
        mostrarNotificacion('Por favor ingresa el tipo de envío', 'error');
        return;
    }
    
    debug('Nuevo envío guardado:', { idLibro, autor, tipo });
    
    // Guardar en localStorage (simulación)
    let envios = Storage.get('envios') || [];
    envios.push({
        id: Date.now(),
        idLibro,
        autor,
        tipo,
        fechaCreacion: new Date().toISOString()
    });
    Storage.set('envios', envios);
    
    mostrarNotificacion(`✓ Envío "${idLibro}" agregado correctamente`, 'success');
    
    setTimeout(() => {
        window.location.href = 'logistica.html';
    }, 1500);
}


