// ============================================
// administración - gestionar tabla usuarios
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarGestionAdministracion();
});

function inicializarGestionAdministracion() {
    // Búsqueda de usuarios
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', filtrarUsuarios);
    }
    
    // Botones de acción (ediar y eliminar)
    configurarBotonesAccionAdmin();
    
    debug('Gestión de administración inicializada');
}

// Filtrar usuarios por búsqueda
function filtrarUsuarios(e) {
    const termBus = e.target.value.toLowerCase();
    const rws = document.querySelectorAll('.tab-dat tbody tr');
    
    let usuariosVisibles = 0;
    
    rws.forEach(row => {
        const celdas = row.querySelectorAll('td input');
        let coincide = false;
        
        celdas.forEach(celda => {
            if (celda.value.toLowerCase().includes(termBus)) {
                coincide = true;
            }
        });
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) usuariosVisibles++;
    });
    
    debug(`Búsqueda de usuarios: ${termBus} - ${usuariosVisibles} resultados`);
}

// Configurar botones de ediar y eliminar
function configurarBotonesAccionAdmin() {
    const table = document.querySelector('.tab-dat');
    if (!table) return;
    
    // Botones de ediar
    const ediButtons = table.querySelectorAll('.bacc.edi');
    ediButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            ediarUsuario(row);
        });
    });
    
    // Botones de eliminar
    const delButtons = table.querySelectorAll('.bacc.del');
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            eliminarUsuario(row);
        });
    });
}

// ediar usuario
function ediarUsuario(row) {
    const inputs = row.querySelectorAll('td:not(:last-child) input');
    
    inputs.forEach(input => {
        input.disabled = false;
    });
    
    inputs[0].focus();
    
    // Cambiar botón a guardar
    const actionCell = row.querySelector('td:last-child');
    const ediBtn = actionCell.querySelector('.btn-acc.edi');
    ediBtn.textContent = '✓';
    ediBtn.style.backgroundColor = '#4CAF50';
    ediBtn.title = 'Guardar';
    
    // Al hacer click de nuevo, guardar
    ediBtn.onclick = function(e) {
        e.preventDefault();
        
        const usuario = inputs[0].value;
        debug('Usuario actualizado:', usuario);
        
        mostrarNotificacion(`Usuario "${usuario}" actualizado correctamente`, 'success');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        ediBtn.textContent = '✏️';
        ediBtn.style.backgroundColor = '';
        ediBtn.title = 'ediar';
        ediBtn.onclick = null;
        configurarBotonesAccionAdmin();
    };
}

// Eliminar usuario
function eliminarUsuario(row) {
    const usuario = row.querySelector('td:nth-child(1) input').value;
    
    if (confirm(`¿Estás seguro de que deseas eliminar al usuario "${usuario}"?`)) {
        debug('Usuario eliminado:', usuario);
        
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            mostrarNotificacion(`Usuario "${usuario}" eliminado correctamente`, 'success');
        }, 300);
    }
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transfrm: translateX(0);
        }
        to {
            opacity: 0;
            transfrm: translateX(-20px);
        }
    }
    
    .tab-dat input {
        cursor: default;
    }
    
    .tab-dat input:disabled {
        background-color: transparent;
        border: none;
        padding: 0;
    }
`;
document.head.appendChild(style);


