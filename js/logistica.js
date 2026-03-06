document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaEnvios");
  const buscarInput = document.getElementById("buscarEnvio");

  // Cargar envíos
  async function cargarEnvios(query = "") {
    try {
      const res = await fetch(`/api/envios/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";

      data.forEach(envio => {
        const tr = document.createElement("tr");
        tr.dataset.id = envio.id;

        tr.innerHTML = `
          <td data-label="ID">${envio.id}</td>

          <td data-label="Autor">
            <input type="text" class="autor" value="${envio.autor}">
          </td>

          <td data-label="Tipo Envío">
            <input type="text" class="tipo_envio" value="${envio.tipo_envio}">
          </td>

          <td data-label="ID Libro">
            <input type="text" class="id_libro" value="${envio.id_libro}">
          </td>

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
      console.error("Error al cargar envíos:", err);
    }
  }

  // cargar al iniciar
  cargarEnvios();

  // buscar
  buscarInput?.addEventListener("input", e => {
    cargarEnvios(e.target.value);
  });

  // eventos editar guardar eliminar
  tabla.addEventListener("click", async e => {

    const tr = e.target.closest("tr");
    if (!tr) return;

    const id = tr.dataset.id;

    // EDITAR
    if (e.target.classList.contains("editar")) {
      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";
    }

    // GUARDAR
    if (e.target.classList.contains("guardar")) {

      const autor = tr.querySelector(".autor").value.trim();
      const tipo_envio = tr.querySelector(".tipo_envio").value.trim();
      const id_libro = tr.querySelector(".id_libro").value.trim();

      try {

        const res = await fetch("/api/envios/editar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            autor,
            tipo_envio,
            id_libro
          })
        });

        const data = await res.json();

        if (data.success) {
          alert("Envío actualizado");

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

      if (!confirm("¿Eliminar envío?")) return;

      try {

        const res = await fetch("/api/envios/eliminar.php", {
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