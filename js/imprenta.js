document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaImprenta");
  const buscarInput = document.getElementById("buscarImprenta");

  // Función global para recargar tabla
  window.cargarProducciones = async (query = "") => {
    try {
      const res = await fetch(`/api/imprenta/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";
      data.forEach(produccion => {
        const tr = document.createElement("tr");
        tr.dataset.id = produccion.id;

        tr.innerHTML = `
          <td data-label="ID">${produccion.id}</td>
          <td data-label="ID Libro"><input type="text" class="id_libro" value="${produccion.id_libro}"></td>
          <td data-label="Autor"><input type="text" class="autor" value="${produccion.autor}"></td>
          <td data-label="Tipo"><input type="text" class="tipo" value="${produccion.tipo}"></td>
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
      console.error("Error al cargar producciones:", err);
    }
  };

  // Cargar tabla al inicio
  cargarProducciones();

  // Buscar mientras escribes
  buscarInput?.addEventListener("input", e => cargarProducciones(e.target.value));

  // Delegación de eventos para editar, guardar y eliminar
  tabla.addEventListener("click", async e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const id = tr.dataset.id;

    if (e.target.classList.contains("editar")) {
      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";
    }

    if (e.target.classList.contains("guardar")) {
      const id_libro = tr.querySelector(".id_libro").value.trim();
      const autor = tr.querySelector(".autor").value.trim();
      const tipo = tr.querySelector(".tipo").value.trim();

      try {
        const res = await fetch("/api/imprenta/editar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({id_libro, autor, tipo })
        });
        const data = await res.json();
        if (data.success) {
          alert("Producción actualizada");
          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";
        } else {
          alert("Error al actualizar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
      }
    }

    if (e.target.classList.contains("eliminar")) {
      if (!confirm("¿Eliminar producción?")) return;
      try {
        const res = await fetch("/api/imprenta/eliminar.php", {
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
      }
    }
  });
});