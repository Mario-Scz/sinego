// ============================================
// FUNCIONALIDAD DE IMPRENTA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarImprenta();
});

function inicializarImprenta() {
    // Búsqueda
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', buscarServicios);
    }
    
    // Botones de acción
    configurarBotonesImprenta();
    
    debug('Imprenta inicializada');
}

// Buscar servicios
function buscarServicios(e) {
    const termBus = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.tab-dat tbody tr');
    
    let serviciosVisibles = 0;
    
    rows.forEach(row => {
        const celdas = row.querySelectorAll('td input');
        let coincide = false;
        
        celdas.forEach(celda => {
            if (celda.value.toLowerCase().includes(termBus)) {
                coincide = true;
            }
        });
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) serviciosVisibles++;
    });
    
    debug(`Búsqueda de servicios: ${termBus} - ${serviciosVisibles} resultados`);
}

// Configurar botones de imprenta
function configurarBotonesImprenta() {
    const table = document.querySelector('.tab-dat');
    if (!table) return;
    
    const ediButtons = table.querySelectorAll('.bacc.edi');
    ediButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            ediarServicio(row);
        });
    });
    
    const delButtons = table.querySelectorAll('.bacc.del');
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            eliminarServicio(row);
        });
    });
}

// ediar servicio
function ediarServicio(row) {
    const inputs = row.querySelectorAll('td:not(:last-child) input');
    
    inputs.forEach(input => {
        input.disabled = false;
    });
    
    inputs[0].focus();
    
    const actionCell = row.querySelector('td:last-child');
    const ediBtn = actionCell.querySelector('.btn-acc.edi');
    ediBtn.textContent = '✓';
    ediBtn.style.backgroundColor = '#4CAF50';
    ediBtn.title = 'Guardar';
    
    ediBtn.onclick = function(e) {
        e.preventDefault();
        
        const servicio = inputs[0].value;
        debug('Servicio actualizado:', servicio);
        
        mostrarNotificacion(`Servicio "${servicio}" actualizado correctamente`, 'success');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        ediBtn.textContent = '✏️';
        ediBtn.style.backgroundColor = '';
        ediBtn.title = 'ediar';
        ediBtn.onclick = null;
        configurarBotonesImprenta();
    };
}

// Eliminar servicio
function eliminarServicio(row) {
    const servicio = row.querySelector('td:nth-child(1) input').value;
    
    if (confirm(`¿Estás seguro de eliminar el servicio "${servicio}"?`)) {
        debug('Servicio eliminado:', servicio);
        
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            mostrarNotificacion(`Servicio "${servicio}" eliminado correctamente`, 'success');
        }, 300);
    }
}


