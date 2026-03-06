// cliente.js
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaClientes");
  const buscarInput = document.getElementById("buscarCliente");

  // Función para actualizar la tabla desde el servidor
  async function cargarClientes(query = "") {
    try {
      const res = await fetch(`/api/cliente/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";
      data.forEach(cliente => {
        const tr = document.createElement("tr");
        tr.dataset.id = cliente.id;

        tr.innerHTML = `
          <td data-label="ID">${cliente.id}</td>
          <td data-label="Nombre"><input type="text" class="nombre" value="${cliente.nombre}"></td>
          <td data-label="Teléfono"><input type="text" class="telefono" value="${cliente.telefono}"></td>
          <td data-label="Correo"><input type="email" class="correo" value="${cliente.correo}"></td>
          <td data-label="Acciones">
            <div class="ba">
              <button class="ba editar">✏️</button>
              <button class="ba guardar" style="display:none;">💾</button>
              <button class="ba eliminar">🗑️</button>
            </div>
          </td>
        `;
        tabla.appendChild(tr);
      });
    } catch (err) {
      console.error("Error al cargar clientes:", err);
    }
  }

  // Cargar clientes al inicio
  cargarClientes();

  // Buscar clientes mientras escribes
  buscarInput?.addEventListener("input", e => {
    cargarClientes(e.target.value);
  });

  // Delegación de eventos para editar, guardar y eliminar
  tabla.addEventListener("click", async e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const id = tr.dataset.id;

    // EDITAR: mostrar botón guardar
    if (e.target.classList.contains("editar")) {
      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";
    }

    // GUARDAR: enviar cambios al servidor
    if (e.target.classList.contains("guardar")) {
      const nombre = tr.querySelector(".nombre").value.trim();
      const telefono = tr.querySelector(".telefono").value.trim();
      const correo = tr.querySelector(".correo").value.trim();

      try {
        const res = await fetch("/api/cliente/editar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, nombre, telefono, correo })
        });

        const data = await res.json();
        if (data.success) {
          alert("Cliente actualizado");
          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";
        } else {
          alert("Error al actualizar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
        console.error(err);
      }
    }

    // ELIMINAR
    if (e.target.classList.contains("eliminar")) {
      if (!confirm("¿Eliminar cliente?")) return;
      try {
        const res = await fetch("/api/cliente/eliminar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
        });

        const data = await res.json();
        if (data.success) {
          tr.remove();
        } else {
          alert("Error al eliminar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
        console.error(err);
      }
    }
  });
});