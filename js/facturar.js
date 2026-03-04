// ============================================
// GESTIÓN DE FACTURACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarGestionFacturacion();
});

function inicializarGestionFacturacion() {
    // Búsqueda de facturas
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', filtrarFacturas);
    }
    
    // Botones de acción (ediar y eliminar)
    configurarBotonesAccionFacturas();
    
    debug('Gestión de facturación inicializada');
}

// Filtrar facturas por búsqueda
function filtrarFacturas(e) {
    const termBus = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.tab-dat tbody tr');
    
    let facturasVisibles = 0;
    
    rows.forEach(row => {
        const idFactura = row.querySelector('td:nth-child(1) input')?.value.toLowerCase() || '';
        const clt = row.querySelector('td:nth-child(2) input')?.value.toLowerCase() || '';
        const comentario = row.querySelector('td:nth-child(3) input')?.value.toLowerCase() || '';
        
        const coincide = idFactura.includes(termBus) || 
                        clt.includes(termBus) || 
                        comentario.includes(termBus);
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) facturasVisibles++;
    });
    
    debug(`Búsqueda de facturas: ${termBus} - ${facturasVisibles} resultados`);
}

// Configurar botones de ediar y eliminar
function configurarBotonesAccionFacturas() {
    const table = document.querySelector('.tab-dat');
    if (!table) return;
    
    // Botones de ediar
    const ediButtons = table.querySelectorAll('.bacc.edi');
    ediButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            ediarFactura(row);
        });
    });
    
    // Botones de eliminar
    const delButtons = table.querySelectorAll('.bacc.del');
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            eliminarFactura(row);
        });
    });
}

// ediar factura
function ediarFactura(row) {
    const idFactura = row.querySelector('td:nth-child(1) input');
    const clt = row.querySelector('td:nth-child(2) input');
    const comentario = row.querySelector('td:nth-child(3) input');
    
    // Habilitar edición
    idFactura.disabled = false;
    clt.disabled = false;
    comentario.disabled = false;
    comentario.focus();
    
    // Cambiar botón a guardar
    const actionCell = row.querySelector('td:nth-child(4)');
    const ediBtn = actionCell.querySelector('.btn-acc.edi');
    ediBtn.textContent = '✓';
    ediBtn.style.backgroundColor = '#4CAF50';
    ediBtn.title = 'Guardar';
    
    // Al hacer click de nuevo, guardar
    ediBtn.onclick = function(e) {
        if (!validarDatosFactura(idFactura.value, clt.value)) {
            return;
        }
        
        e.preventDefault();
        
        debug('Factura actualizada:', {
            idFactura: idFactura.value,
            clt: clt.value,
            comentario: comentario.value
        });
        
        mostrarNotificacion(`Factura "${idFactura.value}" actualizada correctamente`, 'success');
        
        // Desactivar cmps
        idFactura.disabled = true;
        clt.disabled = true;
        comentario.disabled = true;
        
        // Restaurar botón
        ediBtn.textContent = '✏️';
        ediBtn.style.backgroundColor = '';
        ediBtn.title = 'ediar';
        ediBtn.onclick = null;
        configurarBotonesAccionFacturas();
    };
}

// Eliminar factura
function eliminarFactura(row) {
    const idFactura = row.querySelector('td:nth-child(1) input').value;
    
    if (confirm(`¿Estás seguro de que deseas eliminar la factura "${idFactura}"?`)) {
        debug('Factura eliminada:', idFactura);
        
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            mostrarNotificacion(`Factura "${idFactura}" eliminada correctamente`, 'success');
        }, 300);
    }
}

// Validar datos de factura
function validarDatosFactura(idFactura, clt) {
    if (!idFactura.trim()) {
        mostrarNotificacion('El ID de factura no puede estar vacío', 'error');
        return false;
    }
    
    if (!clt.trim()) {
        mostrarNotificacion('El clt no puede estar vacío', 'error');
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


