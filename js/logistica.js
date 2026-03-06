document.addEventListener("DOMContentLoaded", cargarEnvios);

async function cargarEnvios() {

  const res = await fetch("/api/logistica/consultar.php");
  const data = await res.json();

  const tbody = document.querySelector(".tab-dat tbody");

  tbody.innerHTML = "";

  data.forEach(envio => {

    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${envio.autor}</td>
      <td>${envio.tipo}</td>
      <td>${envio.idLibro}</td>
      <td>
        <button onclick="eliminar(${envio.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);

  });

}

async function eliminar(id){

  if(!confirm("Eliminar envío?")) return;

  await fetch("/api/logistica/eliminar.php?id="+id);

  cargarEnvios();

}