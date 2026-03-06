// ============================================
// FUNCIONALIDAD DE LOGÍSTICA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarLogistica();
});

async function inicializarLogistica() {
    // Cargar envíos desde la API
    await cargarEnvios();
    
    // Búsqueda
    const inpBus = document.querySelector('.ib');
    if (inpBus) {
        inpBus.addEventListener('input', buscarEnvios);
    }
    
    // Botones de acción
    configurarBotonesLogistica();
    
    debug('Logística inicializada');
}

// Cargar envíos desde la API
async function cargarEnvios() {
    try {
        const res = await fetch('/api/envios/envios.php');
        const data = await res.json();
        
        if (data.success && data.envios) {
            renderizarEnvios(data.envios);
            debug('Envíos cargados:', data.envios.length);
        } else {
            console.error('Error al cargar envíos:', data.message);
        }
    } catch (err) {
        console.error('Error de conexión:', err);
    }
}

// Renderizar envíos en la tabla
function renderizarEnvios(envios) {
    const tbody = document.querySelector('.tab-dat tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    envios.forEach(envio => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td data-label="Autor"><input type="text" value="${envio.autor}" disabled data-id="${envio.id}" /></td>
            <td data-label="Tipo de Envío"><input type="text" value="${envio.tipo_envio}" disabled /></td>
            <td data-label="ID Libro"><input type="text" value="${envio.id_libro}" disabled /></td>
            <td data-label="Acciones">
                <div class="ba">
                    <button class="ba e" title="Editar" onclick="ediarEnvio(this)">✏️</button>
                    <button class="ba d" title="Eliminar" onclick="eliminarEnvio(this, ${envio.id})">🗑️</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    configurarBotonesLogistica();
}

// Buscar envíos
function buscarEnvios(e) {
    const termBus = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.tab-dat tbody tr');
    
    let enviosVisibles = 0;
    
    rows.forEach(row => {
        const celdas = row.querySelectorAll('td');
        let coincide = false;
        
        celdas.forEach(celda => {
            const input = celda.querySelector('input');
            if (input && input.value.toLowerCase().includes(termBus)) {
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
    // Los botones ya tienen onclick en el render, no necesitamos EventListeners adicionales
}

// Editar envío
async function ediarEnvio(btn) {
    const row = btn.closest('tr');
    const inputs = row.querySelectorAll('td input');
    
    inputs.forEach(input => {
        input.disabled = false;
    });
    
    inputs[0].focus();
    
    btn.textContent = '✓';
    btn.style.backgroundColor = '#4CAF50';
    btn.title = 'Guardar';
    btn.onclick = async function() {
        const id = inputs[0].dataset.id;
        const autor = inputs[0].value;
        const tipo_envio = inputs[1].value;
        const id_libro = inputs[2].value;
        
        try {
            const res = await fetch('/api/envios/envios.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, id_libro, autor, tipo_envio })
            });
            
            const data = await res.json();
            
            if (data.success) {
                mostrarNotificacion(`Envío actualizado correctamente`, 'success');
                
                inputs.forEach(input => {
                    input.disabled = true;
                });
                
                btn.textContent = '✏️';
                btn.style.backgroundColor = '';
                btn.title = 'Editar';
                btn.onclick = function() { ediarEnvio(btn); };
            } else {
                mostrarNotificacion('Error: ' + (data.message || 'Desconocido'), 'error');
            }
        } catch (err) {
            console.error('Error de conexión:', err);
            mostrarNotificacion('Error de conexión con el servidor', 'error');
        }
    };
}

// Eliminar envío
async function eliminarEnvio(btn, id) {
    const row = btn.closest('tr');
    const autor = row.querySelector('td:first-child input').value;
    
    if (confirm(`¿Estás seguro de eliminar el envío "${autor}"?`)) {
        try {
            const res = await fetch('/api/envios/envios.php', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            
            const data = await res.json();
            
            if (data.success) {
                row.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    row.remove();
                    mostrarNotificacion(`Envío "${autor}" eliminado correctamente`, 'success');
                }, 300);
            } else {
                mostrarNotificacion('Error: ' + (data.message || 'Desconocido'), 'error');
            }
        } catch (err) {
            console.error('Error de conexión:', err);
            mostrarNotificacion('Error de conexión con el servidor', 'error');
        }
    }
}


