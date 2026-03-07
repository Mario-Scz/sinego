document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const codigo = document.getElementById("idL").value.trim();
    const autor = document.getElementById("aut").value.trim();
    const titulo = document.getElementById("libro").value.trim();
    const tipo = document.getElementById("tp").value.trim();
    const precio = document.getElementById("prc").value.trim() || "0.00";

    if (!codigo || !autor || !titulo || !tipo) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    // Validar que precio sea un número válido
    if (isNaN(precio) || precio < 0) {
      alert("El precio debe ser un número válido");
      return;
    }

    try {
      const res = await fetch("/api/catalogo/agregar.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          codigo,
          autor,
          titulo,
          tipo,
          precio
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Libro agregado correctamente");
        form.reset();
      } else {
        alert("Error: " + (data.error || "desconocido"));
      }
    } catch (err) {
      alert("Error de conexión");
      console.error(err);
    }
  });
});