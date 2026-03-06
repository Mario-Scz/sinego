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
        
        debug('Formulario de agregar envío inicializado');
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

async function guardarNuevoEnvio() {
    // Obtener valores con los IDs correctos del HTML
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
        mostrarNotificacion('Por favor ingresa el tipo de envío', 'error');
        return;
    }
    
    debug('Intentando guardar nuevo envío:', { id_libro: idLibro, autor, tipo_envio: tipo });
    
    try {
        const res = await fetch('/api/envios/envios.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_libro: idLibro,
                autor: autor,
                tipo_envio: tipo
            })
        });
        
        const data = await res.json();
        
        if (data.success) {
            mostrarNotificacion(`✓ Envío "${idLibro}" agregado correctamente`, 'success');
            
            setTimeout(() => {
                window.location.href = 'logistica.php';
            }, 1500);
        } else {
            mostrarNotificacion('Error: ' + (data.message || 'Desconocido'), 'error');
        }
    } catch (err) {
        console.error('Error de conexión:', err);
        mostrarNotificacion('Error de conexión con el servidor', 'error');
    }
}


