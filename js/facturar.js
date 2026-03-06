document.addEventListener("DOMContentLoaded", () => {

const tabla = document.getElementById("tablaFacturas");
const buscar = document.getElementById("buscarFactura");

async function cargarFacturas(query=""){

const res = await fetch("/api/facturas/consultar.php?buscar="+encodeURIComponent(query));
const data = await res.json();

tabla.innerHTML="";

data.forEach(f => {

const tr = document.createElement("tr");

tr.dataset.id = f.id;

tr.innerHTML=`

<td>${f.id}</td>

<td>
<input class="id_factura" value="${f.id_factura}">
</td>

<td>
<input class="cliente" value="${f.cliente}">
</td>

<td>
<input class="descripcion" value="${f.descripcion}">
</td>

<td>

<div class="ba">

<button class="editar">✏️</button>
<button class="guardar" style="display:none">💾</button>
<button class="eliminar">🗑️</button>

</div>

</td>

`;

tabla.appendChild(tr);

});

}

cargarFacturas();

buscar.addEventListener("input",e=>{

cargarFacturas(e.target.value);

});

tabla.addEventListener("click", async e => {

const tr = e.target.closest("tr");
if(!tr) return;

const id = tr.dataset.id;

if(e.target.classList.contains("editar")){

tr.querySelector(".guardar").style.display="inline";
e.target.style.display="none";

}

if(e.target.classList.contains("guardar")){

const id_factura = tr.querySelector(".id_factura").value.trim();
const cliente = tr.querySelector(".cliente").value.trim();
const descripcion = tr.querySelector(".descripcion").value.trim();

const res = await fetch("/api/facturas/editar.php",{

method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({id,id_factura,cliente,descripcion})

});

const data = await res.json();

if(data.success){

alert("Factura actualizada");

tr.querySelector(".editar").style.display="inline";
e.target.style.display="none";

}else{

alert("Error: "+data.error);

}

}

if(e.target.classList.contains("eliminar")){

if(!confirm("¿Eliminar factura?")) return;

const res = await fetch("/api/facturas/eliminar.php",{

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

}

});

});