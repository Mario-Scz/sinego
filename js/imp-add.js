// ============================================
// AGREGAR NUEVA PRODUCCIÓN DE IMPRENTA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarfrmImprenta();
});

function inicializarfrmImprenta() {
    const frm = document.querySelector('.frm');
    
    if (frm) {
        // Validar en tiempo real
        const inputs = frm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validarcmpImprenta);
        });
        
        // Submit del frm
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevaProduccion();
        });
        
        debug('frm de agregar producción inicializado');
    }
}

function validarcmpImprenta(e) {
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

function guardarNuevaProduccion() {
    const idLibro = document.getElementById('idLibro')?.value.trim() || '';
    const autor = document.getElementById('autor')?.value.trim() || '';
    const tipo = document.getElementById('tipo')?.value.trim() || '';
    
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
        mostrarNotificacion('Por favor ingresa el tipo de impresión', 'error');
        return;
    }
    
    debug('Nueva producción guardada:', { idLibro, autor, tipo });
    
    // Guardar en localStorage (simulación)
    let producciones = Storage.get('producciones') || [];
    producciones.push({
        id: Date.now(),
        idLibro,
        autor,
        tipo,
        fechaCreacion: new Date().toISOString()
    });
    Storage.set('producciones', producciones);
    
    mostrarNotificacion(`✓ Producción de "${idLibro}" agregada correctamente`, 'success');
    
    setTimeout(() => {
        window.location.href = 'imprenta2.html';
    }, 1500);
}


