document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formimprenta");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id_libro = document.getElementById("idlibro").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const tipo = document.getElementById("tipo").value.trim();

    if (!id_libro || !autor || !tipo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/imprenta/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_libro, autor, tipo })
      });
      const data = await res.json();

      if (data.success) {
        alert("Producción agregada con ID " + data.id);
        form.reset();
        // Opcional: recargar la tabla automáticamente
        if (typeof cargarProducciones === "function") {
          cargarProducciones();
        }
      } else {
        alert("Error: " + (data.error || "Desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
    }
  });
});