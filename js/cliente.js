// ============================================
// GESTIÓN DE cltS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarGestionclts();
});

function inicializarGestionclts() {
    // Búsqueda de clts
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', filtrarclts);
    }
    
    // Botones de acción (ediar y eliminar)
    configurarBotonesAccion();
    
    // Botón para agregar nuevo clt ya está en el HTML con href
    debug('Gestión de clts inicializada');
}

// Filtrar clts por búsqueda
function filtrarclts(e) {
    const termBus = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.tab-dat tbody tr');
    
    let cltsVisibles = 0;
    
    rows.forEach(row => {
        const nombre = row.querySelector('td:nth-child(1) input')?.value.toLowerCase() || '';
        const telefono = row.querySelector('td:nth-child(2) input')?.value.toLowerCase() || '';
        const correo = row.querySelector('td:nth-child(3) input')?.value.toLowerCase() || '';
        
        const coincide = nombre.includes(termBus) || 
                        telefono.includes(termBus) || 
                        correo.includes(termBus);
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) cltsVisibles++;
    });
    
    debug(`Búsqueda: ${termBus} - ${cltsVisibles} resultados`);
}

// Configurar botones de ediar y eliminar
function configurarBotonesAccion() {
    const table = document.querySelector('.tab-dat');
    if (!table) return;
    
    // Botones de ediar
    const ediButtons = table.querySelectorAll('.bacc.edi');
    ediButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            ediarclt(row);
        });
    });
    
    // Botones de eliminar
    const delButtons = table.querySelectorAll('.bacc.del');
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            eliminarclt(row);
        });
    });
}

// ediar clt
function ediarclt(row) {
    const nombre = row.querySelector('td:nth-child(1) input');
    const telefono = row.querySelector('td:nth-child(2) input');
    const correo = row.querySelector('td:nth-child(3) input');
    
    const nombreAnterior = nombre.value;
    
    // Habilitar edición
    nombre.disabled = false;
    telefono.disabled = false;
    correo.disabled = false;
    nombre.focus();
    
    // Cambiar botón a guardar
    const actionCell = row.querySelector('td:nth-child(4)');
    const ediBtn = actionCell.querySelector('.btn-acc.edi');
    ediBtn.textContent = '✓';
    ediBtn.style.backgroundColor = '#4CAF50';
    ediBtn.title = 'Guardar';
    
    // Al hacer click de nuevo, guardar
    ediBtn.onclick = function(e) {
        if (!validarDatosclt(nombre.value, telefono.value, correo.value)) {
            return;
        }
        
        e.preventDefault();
        
        debug('clt actualizado:', {
            nombre: nombre.value,
            telefono: telefono.value,
            correo: correo.value
        });
        
        mostrarNotificacion(`clt "${nombre.value}" actualizado correctamente`, 'success');
        
        // Desactivar cmps
        nombre.disabled = true;
        telefono.disabled = true;
        correo.disabled = true;
        
        // Restaurar botón
        ediBtn.textContent = '✏️';
        ediBtn.style.backgroundColor = '';
        ediBtn.title = 'ediar';
        ediBtn.onclick = null;
        configurarBotonesAccion();
    };
}

// Eliminar clt
function eliminarclt(row) {
    const nombreclt = row.querySelector('td:nth-child(1) input').value;
    
    if (confirm(`¿Estás seguro de que deseas eliminar al clt "${nombreclt}"?`)) {
        debug('clt eliminado:', nombreclt);
        
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            mostrarNotificacion(`clt "${nombreclt}" eliminado correctamente`, 'success');
        }, 300);
    }
}

// Validar datos del clt
function validarDatosclt(nombre, telefono, correo) {
    if (!nombre.trim()) {
        mostrarNotificacion('El nombre no puede estar vacío', 'error');
        return false;
    }
    
    if (!telefono.trim()) {
        mostrarNotificacion('El teléfono no puede estar vacío', 'error');
        return false;
    }
    
    if (!validarTelefono(telefono)) {
        mostrarNotificacion('El teléfono no es válido', 'error');
        return false;
    }
    
    if (!correo.trim()) {
        mostrarNotificacion('El correo no puede estar vacío', 'error');
        return false;
    }
    
    if (!validarEmail(correo)) {
        mostrarNotificacion('El correo no es válido', 'error');
        return false;
    }
    
    return true;
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


