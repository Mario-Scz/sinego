document.addEventListener("DOMContentLoaded", cargarLibros);

function cargarLibros(){

fetch("/api/catalogo/read.php")

.then(res => res.json())

.then(data => {

const tabla = document.getElementById("tablaCatalogo");

tabla.innerHTML = "";

data.forEach(libro => {

tabla.innerHTML += `
<tr>

<td data-label="Autor">
<input type="text" value="${libro.autor}" id="autor${libro.id}">
</td>

<td data-label="Tipo">
<input type="text" value="${libro.tipo}" id="tipo${libro.id}">
</td>

<td data-label="ID Libro">
<input type="text" value="${libro.codigo}" id="codigo${libro.id}">
</td>

<td data-label="Acciones">
<div class="ba">

<button class="ba e" onclick="editarLibro(${libro.id})">
✏️
</button>

<button class="ba d" onclick="eliminarLibro(${libro.id})">
🗑️
</button>

</div>
</td>

</tr>
`;
});

});
}

function eliminarLibro(id){

if(!confirm("Eliminar libro?")) return;

fetch("/api/catalogo/delete.php?id="+id)

.then(res=>res.json())

.then(()=>{
cargarLibros();
});

}

function editarLibro(id){

const autor = document.getElementById("autor"+id).value;
const tipo = document.getElementById("tipo"+id).value;
const codigo = document.getElementById("codigo"+id).value;

fetch("/api/catalogo/update.php",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
id:id,
autor:autor,
tipo:tipo,
codigo:codigo
})

})
.then(res=>res.json())
.then(()=>{

alert("Libro actualizado");
cargarLibros();

});

}