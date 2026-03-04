// ============================================
// agregar usuario - frma de crear usuario nuevo
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarfrmUsuario();
});

function inicializarfrmUsuario() {
    const frm = document.querySelector('.frm');
    
    if (frm) {
        // chequear cmps en tiempo real
        const inputs = frm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', validarcmpUsuario);
        });
        
        // cuando envía el frm
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarNuevoUsuario();
        });
        
        debug('frm de agregar usuario inicializado');
    }
}

function validarcmpUsuario(e) {
    const cmp = e.target;
    const valor = cmp.value.trim();
    
    if (cmp.id === 'usuario') {
        if (valor.length < 3) {
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
    
    if (cmp.id === 'password') {
        if (valor.length < 6) {
            cmp.style.borderColor = '#f44336';
            return false;
        } else {
            cmp.style.borderColor = '#4CAF50';
            return true;
        }
    }
    
    return true;
}

function guardarNuevoUsuario() {
    const usuario = document.getElementById('usr')?.value.trim() || '';
    const correo = document.getElementById('correo')?.value.trim() || '';
    const password = document.getElementById('pwd')?.value.trim() || '';
    const rol = document.getElementById('rol')?.value || 'usuario';
    
    // chequeos del usuario
    if (!usuario) {
        mostrarNotificacion('Por favor ingresa un usuario', 'error');
        return;
    }
    
    if (usuario.length < 3) {
        mostrarNotificacion('El usuario debe tener al menos 3 caracteres', 'error');
        return;
    }
    
    if (!correo) {
        mostrarNotificacion('Por favor ingresa un correo', 'error');
        return;
    }
    
    if (!validarEmail(correo)) {
        mostrarNotificacion('El correo no es válido', 'error');
        return;
    }
    
    if (!password) {
        mostrarNotificacion('Por favor ingresa una contraseña', 'error');
        return;
    }
    
    if (password.length < 6) {
        mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    debug('Nuevo usuario guardado:', { usuario, correo, rol });
    
    // Guardar en localStorage (simulación)
    let usuarios = Storage.get('usuarios') || [];
    usuarios.push({
        id: Date.now(),
        usuario,
        correo,
        rol,
        fechaCreacion: new Date().toISOString()
    });
    Storage.set('usuarios', usuarios);
    
    mostrarNotificacion(`✓ Usuario "${usuario}" agregado correctamente`, 'success');
    
    setTimeout(() => {
        window.location.href = 'administrar.html';
    }, 1500);
}


