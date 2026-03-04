// ============================================
// GESTIÓN DE CATÁLOGO DE LIBROS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarGestionCatalogo();
});

function inicializarGestionCatalogo() {
    // Búsqueda de libros
    const inpBus = document.querySelector('.inp-bus');
    if (inpBus) {
        inpBus.addEventListener('input', filtrarLibros);
    }
    
    // Botones de acción (ediar y eliminar)
    configurarBotonesAccionCatalogo();
    
    debug('Gestión de catálogo inicializada');
}

// Filtrar libros por búsqueda
function filtrarLibros(e) {
    const termBus = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.tab-dat tbody tr');
    
    let librosVisibles = 0;
    
    rows.forEach(row => {
        const autor = row.querySelector('td:nth-child(1) input')?.value.toLowerCase() || '';
        const tipo = row.querySelector('td:nth-child(2) input')?.value.toLowerCase() || '';
        const idLibro = row.querySelector('td:nth-child(3) input')?.value.toLowerCase() || '';
        
        const coincide = autor.includes(termBus) || 
                        tipo.includes(termBus) || 
                        idLibro.includes(termBus);
        
        row.style.display = coincide ? '' : 'none';
        if (coincide) librosVisibles++;
    });
    
    debug(`Búsqueda en catálogo: ${termBus} - ${librosVisibles} resultados`);
}

// Configurar botones de ediar y eliminar
function configurarBotonesAccionCatalogo() {
    const table = document.querySelector('.tab-dat');
    if (!table) return;
    
    // Botones de ediar
    const ediButtons = table.querySelectorAll('.bacc.edi');
    ediButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            ediarLibro(row);
        });
    });
    
    // Botones de eliminar
    const delButtons = table.querySelectorAll('.bacc.del');
    delButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const row = this.closest('tr');
            eliminarLibro(row);
        });
    });
}

// ediar libro
function ediarLibro(row) {
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
        
        const autor = inputs[0].value;
        debug('Libro actualizado:', autor);
        
        mostrarNotificacion(`Libro de "${autor}" actualizado correctamente`, 'success');
        
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        ediBtn.textContent = '✏️';
        ediBtn.style.backgroundColor = '';
        ediBtn.title = 'ediar';
        ediBtn.onclick = null;
        configurarBotonesAccionCatalogo();
    };
}

// Eliminar libro
function eliminarLibro(row) {
    const autor = row.querySelector('td:nth-child(1) input').value;
    const tit = row.querySelector('td:nth-child(3) input').value;
    
    if (confirm(`¿Estás seguro de que deseas eliminar el libro de "${autor}"?`)) {
        debug('Libro eliminado:', { autor, tit });
        
        row.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            row.remove();
            mostrarNotificacion(`Libro "${tit}" eliminado correctamente`, 'success');
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


