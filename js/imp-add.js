// imp-add.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const idLibro = document.getElementById("idL").value.trim();
    const autor = document.getElementById("aut").value.trim();
    const tipo = document.getElementById("tp").value.trim();

    if (!idLibro || !autor || !tipo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/imprenta/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idLibro, autor, tipo })
      });

      const data = await res.json();

      if (data.success) {
        alert("Producción agregada con ID " + data.id);
        form.reset();
      } else {
        alert("Error: " + (data.error || "desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
      console.error(err);
    }
  });
});