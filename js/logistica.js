document.addEventListener("DOMContentLoaded", () => {

const tabla = document.getElementById("tablaEnvios");
const buscarInput = document.getElementById("buscarEnvio");

async function cargarEnvios(query = "") {

try {

const res = await fetch(`/api/envios/consultar.php?buscar=${encodeURIComponent(query)}`);
const data = await res.json();

tabla.innerHTML = "";

data.forEach(envio => {

const tr = document.createElement("tr");

tr.dataset.id = envio.id;

tr.innerHTML = `

<td data-label="Autor">
<input type="text" class="autor" value="${envio.autor}">
</td>

<td data-label="Tipo">
<input type="text" class="tipo_envio" value="${envio.tipo_envio}">
</td>

<td data-label="ID Libro">
<input type="text" class="id_libro" value="${envio.id_libro}">
</td>

<td data-label="Acciones">

<button class="editar">✏️</button>
<button class="guardar" style="display:none;">💾</button>
<button class="eliminar">🗑️</button>

</td>
`;

tabla.appendChild(tr);

});

} catch (error) {

console.error("Error cargando envíos:", error);

}

}

cargarEnvios();

buscarInput.addEventListener("input", e => {
cargarEnvios(e.target.value);
});

tabla.addEventListener("click", async e => {

const tr = e.target.closest("tr");

if(!tr) return;

const id = tr.dataset.id;

if(e.target.classList.contains("editar")){

tr.querySelector(".guardar").style.display = "inline-block";
e.target.style.display = "none";

}

if(e.target.classList.contains("guardar")){

const autor = tr.querySelector(".autor").value;
const tipo_envio = tr.querySelector(".tipo_envio").value;
const id_libro = tr.querySelector(".id_libro").value;

const res = await fetch("/api/envios/editar.php",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({
id,
autor,
tipo_envio,
id_libro
})

});

const data = await res.json();

if(data.success){

alert("Envío actualizado");

tr.querySelector(".editar").style.display = "inline-block";
e.target.style.display = "none";

}else{

alert("Error al actualizar");

}

}

if(e.target.classList.contains("eliminar")){

if(!confirm("¿Eliminar envío?")) return;

const res = await fetch("/api/envios/eliminar.php",{

method:"POST",
headers:{"Content-Type":"application/json"},

body:JSON.stringify({id})

});

const data = await res.json();

if(data.success){

tr.remove();

}else{

alert("Error al eliminar");

}

}

});

});