// ============================================
// FUNCIONALIDAD DE LOGÍSTICA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarLogistica();
});

function inicializarLogistica() {
    // Búsqueda
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', buscarEnvios);
    }
    
    // Botones de acción
    configurarBotonesLogistica();
    
    debug('Logística inicializada');
}

// Buscar envíos
function buscarEnvios(e) {
    const termBus = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.tab-dat tbody tr');
    
    let enviosVisibles = 0;
    
    rows.forEach(row => {
        const celdas = row.querySelectorAll('td input');
        let coincide = false;
        
        celdas.forEach(celda => {
            if (celda.value.toLowerCase().includes(termBus)) {
                coincide = true;
            }
        });
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) enviosVisibles++;
    });
    
    debug(`Búsqueda de envíos: ${termBus} - ${enviosVisibles} resultados`);
}

// Configurar botones de logística
function configurarBotonesLogistica() {
    const table = document.querySelector('.tab-dat');
    if (!table) return;
    
    const ediButtons = table.querySelectorAll('.bacc.edi');
    ediButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            ediarEnvio(row);
        });
    });
    
    const delButtons = table.querySelectorAll('.bacc.del');
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            eliminarEnvio(row);
        });
    });
}

// ediar envío
function ediarEnvio(row) {
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
        
        const envio = inputs[0].value;
        debug('Envío actualizado:', envio);
        
        mostrarNotificacion(`Envío "${envio}" actualizado correctamente`, 'success');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        ediBtn.textContent = '✏️';
        ediBtn.style.backgroundColor = '';
        ediBtn.title = 'ediar';
        ediBtn.onclick = null;
        configurarBotonesLogistica();
    };
}

// Eliminar envío
function eliminarEnvio(row) {
    const envio = row.querySelector('td:nth-child(1) input').value;
    
    if (confirm(`¿Estás seguro de eliminar el envío "${envio}"?`)) {
        debug('Envío eliminado:', envio);
        
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            mostrarNotificacion(`Envío "${envio}" eliminado correctamente`, 'success');
        }, 300);
    }
}


