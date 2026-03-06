// imp-add.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formImprenta");

  if (!form) {
    console.error("No se encontró el formulario con id 'formImprenta'");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Obtener los valores de los inputs
    const idLibroInput = document.getElementById("idLibro");
    const autorInput = document.getElementById("autor");
    const tipoInput = document.getElementById("tipo");

    if (!idLibroInput || !autorInput || !tipoInput) {
      alert("Error: No se encontraron todos los campos del formulario.");
      return;
    }

    const idLibro = idLibroInput.value.trim();
    const autor = autorInput.value.trim();
    const tipo = tipoInput.value.trim();

    if (!idLibro || !autor || !tipo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/imprenta/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idlibro, autor, tipo })
      });

      const data = await res.json();

      if (data.success) {
        alert("Producción agregada con ID " + data.id);
        form.reset();
      } else {
        alert("Error: " + (data.error || "Desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
      console.error(err);
    }
  });
});