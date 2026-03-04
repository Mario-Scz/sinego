// ========================================================
// LOGIN - esta función chequea el frm de entrada
// el frm se llama ".frm" ahora, antes era "login-frm"
// ========================================================

document.addEventListener('DOMContentLoaded', function() {
    const frm = document.querySelector('.frm'); // buscamos la clase corta nueva
    
    if (frm) {
        frm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('usr').value.trim();
            const password = document.getElementById('pwd').value.trim();
            
            // chequear que usuario y contra no estén vacíos
            if (!usuario) {
                mostrarNotificacion('Por favor ingresa un usuario', 'error');
                return;
            }
            
            if (!password) {
                mostrarNotificacion('Por favor ingresa una contraseña', 'error');
                return;
            }
            
            if (password.length < 4) {
                mostrarNotificacion('La contraseña debe tener al menos 4 caracteres', 'error');
                return;
            }
            
            // realiza llamada al backend PHP que devuelve JSON
            debug('Intento de login:', { usuario });
            
            fetch('/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usr: usuario, pwd: password })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // la respuesta puede incluir el objeto usuario completo
                    Storage.set('usuarioLogueado', {
                        usuario: data.usuario,
                        fechaLogin: new Date().toISOString()
                    });
                    mostrarNotificacion('¡Sesión iniciada correctamente!', 'success');
                    setTimeout(() => {
                        window.location.href = '/vistas/menu.php';
                    }, 1000);
                } else {
                    mostrarNotificacion(data.message || 'Credenciales inválidas', 'error');
                }
            })
            .catch(err => {
                debug('Error al comunicarse con el servidor', err);
                mostrarNotificacion('Error de red. Intenta nuevamente.', 'error');
            });
        });
    }
});


