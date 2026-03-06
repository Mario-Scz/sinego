function togglePassword(btn) {

let input = btn.parentElement.querySelector("input");

if(input.type === "password"){
    input.type = "text";
}else{
    input.type = "password";
}

}
// administrar.js

document.addEventListener("DOMContentLoaded", () => {

const tabla = document.getElementById("tablaUsuarios");
const buscarInput = document.getElementById("buscarUsuario");

async function cargarUsuarios(query = "") {

try{

const res = await fetch(`/api/usuarios/consultar.php?buscar=${encodeURIComponent(query)}`);
const data = await res.json();

tabla.innerHTML = "";

data.forEach(usuario => {

const tr = document.createElement("tr");

tr.dataset.id = usuario.id;

tr.innerHTML = `
<td>${usuario.id}</td>

<td>
<input type="text" class="usuario" value="${usuario.usuario}">
</td>

<td>
<input type="password" class="password" value="${usuario.contraseña}">
</td>

<td>
<div class="ba">
<button class="editar">✏️</button>
<button class="guardar" style="display:none;">💾</button>
<button class="eliminar">🗑️</button>
</div>
</td>
`;

tabla.appendChild(tr);

});

}catch(err){

console.error("Error cargando usuarios",err);

}

}

cargarUsuarios();

buscarInput?.addEventListener("input",e=>{

cargarUsuarios(e.target.value);

});

tabla.addEventListener("click",async e=>{

const tr = e.target.closest("tr");

if(!tr) return;

const id = tr.dataset.id;

if(e.target.classList.contains("editar")){

tr.querySelector(".guardar").style.display="inline-block";
e.target.style.display="none";

}

if(e.target.classList.contains("guardar")){

const usuario = tr.querySelector(".usuario").value.trim();
const contraseña = tr.querySelector(".contraseña").value.trim();

try{

const res = await fetch("/api/usuarios/editar.php",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id,usuario,contraseña})

});

const data = await res.json();

if(data.success){

alert("Usuario actualizado");

tr.querySelector(".editar").style.display="inline-block";
e.target.style.display="none";

}else{

alert("Error: "+data.error);

}

}catch(err){

alert("Error de conexión");
console.error(err);

}

}

if(e.target.classList.contains("eliminar")){

if(!confirm("¿Eliminar usuario?")) return;

try{

const res = await fetch("/api/usuarios/eliminar.php",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id})

});

const data = await res.json();

if(data.success){

tr.remove();

}else{

alert("Error: "+data.error);

}

}catch(err){

alert("Error conexión");
console.error(err);

}

}

});

});