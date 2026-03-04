// ============================================
// AGREGAR NUEVO clt
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarfrmclt();
});

function inicializarfrmclt() {
    const frm = document.querySelector('.frm');
    
    if (frm) {
        // Validar en tiempo real
        const inputs = frm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validarcmpcltAñadir);
        });
        
        // Submit del frm
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevoclt();
        });
        
        debug('frm de agregar clt inicializado');
    }
}

function validarcmpcltAñadir(e) {
    const cmp = e.target;
    const valor = cmp.value.trim();
    
    if (cmp.id === 'nombre') {
        if (valor.length < 3) {
            cmp.style.borderColor = '#f44336';
            return false;
        } else {
            cmp.style.borderColor = '#4CAF50';
            return true;
        }
    }
    
    if (cmp.id === 'telefono') {
        if (!validarTelefono(valor)) {
            cmp.style.borderColor = '#f44336';
            return false;
        } else {
            cmp.style.borderColor = '#4CAF50';
            return true;
        }
    }
    
    if (cmp.id === 'correo') {
        if (!validarEmail(valor)) {
            cmp.style.borderColor = '#f44336';
            return false;
        } else {
            cmp.style.borderColor = '#4CAF50';
            return true;
        }
    }
    
    return true;
}

function guardarNuevoclt() {
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();
    
    // Validaciones
    if (!nombre) {
        mostrarNotificacion('Por favor ingresa un nombre', 'error');
        document.getElementById('nombre').focus();
        return;
    }
    
    if (nombre.length < 3) {
        mostrarNotificacion('El nombre debe tener al menos 3 caracteres', 'error');
        document.getElementById('nombre').focus();
        return;
    }
    
    if (!telefono) {
        mostrarNotificacion('Por favor ingresa un teléfono', 'error');
        document.getElementById('telefono').focus();
        return;
    }
    
    if (!validarTelefono(telefono)) {
        mostrarNotificacion('El teléfono no es válido', 'error');
        document.getElementById('telefono').focus();
        return;
    }
    
    if (!correo) {
        mostrarNotificacion('Por favor ingresa un correo', 'error');
        document.getElementById('correo').focus();
        return;
    }
    
    if (!validarEmail(correo)) {
        mostrarNotificacion('El correo no es válido', 'error');
        document.getElementById('correo').focus();
        return;
    }
    
    // Aquí se llamaría a un API para guardar el clt
    debug('Nuevo clt guardado:', { nombre, telefono, correo });
    
    // Guardar en localStorage (simulación)
    let clts = Storage.get('clts') || [];
    clts.push({
        id: Date.now(),
        nombre,
        telefono,
        correo,
        fechaCreacion: new Date().toISOString()
    });
    Storage.set('clts', clts);
    
    mostrarNotificacion(`✓ clt "${nombre}" agregado correctamente`, 'success');
    
    // Redirigir a la lista de clts después de 1.5 segundos
    setTimeout(() => {
        window.location.href = 'clt.html';
    }, 1500);
}


