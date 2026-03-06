// cl-add.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (!nombre || !telefono || !correo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/cliente/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, telefono, correo })
      });

      const data = await res.json();

      if (data.success) {
        alert("Cliente agregado con ID " + data.id);
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