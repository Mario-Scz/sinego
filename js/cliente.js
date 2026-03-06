document.addEventListener("DOMContentLoaded", () => {

cargarClientes();

});



function cargarClientes(){

fetch("/api/clientes/consultar.php")

.then(res => res.json())

.then(data => {

let tabla = document.getElementById("tablaClientes");

tabla.innerHTML = "";

data.forEach(cliente => {

tabla.innerHTML += `

<tr data-id="${cliente.id}">

<td>${cliente.id}</td>

<td>
<input type="text" class="nombre" value="${cliente.nombre}" disabled>
</td>

<td>
<input type="text" class="telefono" value="${cliente.telefono}" disabled>
</td>

<td>
<input type="email" class="correo" value="${cliente.correo}" disabled>
</td>

<td>

<button class="editar">✏️</button>
<button class="guardar" style="display:none;">💾</button>
<button class="eliminar">🗑️</button>

</td>

</tr>

`;

});

activarEventos();

});

}



function activarEventos(){

document.querySelectorAll(".editar").forEach(btn => {

btn.addEventListener("click", function(){

let fila = this.closest("tr");

fila.querySelector(".nombre").disabled = false;
fila.querySelector(".telefono").disabled = false;
fila.querySelector(".correo").disabled = false;

fila.querySelector(".guardar").style.display = "inline";
this.style.display = "none";

});

});



document.querySelectorAll(".guardar").forEach(btn => {

btn.addEventListener("click", function(){

let fila = this.closest("tr");

let id = fila.dataset.id;

let nombre = fila.querySelector(".nombre").value;
let telefono = fila.querySelector(".telefono").value;
let correo = fila.querySelector(".correo").value;



fetch("/api/clientes/editar.php", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
id,
nombre,
telefono,
correo
})

})

.then(res => res.json())

.then(data => {

if(data.success){

alert("Cliente actualizado");

cargarClientes();

}else{

alert("Error al actualizar");

}

});

});

});



document.querySelectorAll(".eliminar").forEach(btn => {

btn.addEventListener("click", function(){

let fila = this.closest("tr");

let id = fila.dataset.id;

if(!confirm("¿Eliminar cliente?")) return;



fetch("/api/clientes/eliminar.php", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({id})

})

.then(res => res.json())

.then(data => {

if(data.success){

fila.remove();

}else{

alert("Error al eliminar");

}

});

});

});

}