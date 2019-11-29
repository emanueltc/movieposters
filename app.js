var empleados = [{id:'1234',nombre:'Juan',apellido:'Pirulo',email:'pirulo@gmail.com'},
{id:'1235',nombre:'Gabriel',apellido:'Batistuta',email:'batigol@gmail.com'},
{id:'1236',nombre:'Ricardo',apellido:'Gimenez',email:'ricardo@gmail.com'},
{id:'1237',nombre:'Ramon',apellido:'Alvarez',email:'ramon@gmail.com'},
{id:'1238',nombre:'Roberto',apellido:'Mondongo',email:'roberto@gmail.com'}];
//var tableUI = document.getElementById("listaEmpleados");
var tbTableUI = document.getElementById("listaEmpleados");

var getDataItem;
var getDataItemID;
var inputNombre = document.querySelector('#modal-nombre');
var inputApellido = document.querySelector('#modal-apellido');
var inputEmail = document.querySelector('#modal-email');

var guardado;
let movies = [];


init ();

function init(){
	datos("top");
	
	guardado = localStorage.getItem('datos');

 	if (guardado !== null && guardado !== undefined){
 		getData(JSON.parse(guardado));
 		empleados = JSON.parse(guardado);
 	} else { 	
 		getData(empleados); 
 	}
 	//getMovies();

}

function datos (searchTerm){
	 window.fetch('http://www.omdbapi.com/?apikey=9ecc70c7&s='+searchTerm, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({"a": 1, "b": 2})
    
    })
    .then(function(response) {
        console.log('response =', response);
        return response.json();
    })
    .then(function(data) {
    	
        //console.log(data['Search'][0]);
        tbTableUI.innerHTML = "" ;
        console.log(data);
        for (var i = 0; i < data['Search'].length; i++) {
 		tbTableUI.innerHTML += '<li class="item" id="'+data['Search'][i]['imdbID']+'"><img src="'+data['Search'][i]['Poster']+'" /><h4>'+data['Search'][i]['Title']+'</h4><h5>'+data['Search'][i]['Year']+'</h5></li>';

		}
		var btMovies = document.querySelectorAll('li.item');
for (var x = 0; x <  btMovies.length; x++){
	btMovies[x].addEventListener('click', function(){
		console.log(this.id);
		getDataByID(this.id);
	})
}
	
	
	
		
    }	)
    .catch(function(err) {
        console.error(err);
    });
}

function buscarPeli(value) {
	datos(nombrePeli.value);
}

function getDataByID (id){
	 window.fetch('http://www.omdbapi.com/?apikey=9ecc70c7&i='+id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({"a": 1, "b": 2})
    
    })
    .then(function(response) {
        console.log('response =', response);
        return response.json();
    })
    .then(function(data) {
 		var emptyContainer = document.getElementById("container");

    	   		
 		emptyContainer.innerHTML = "";


		//emptyContainer.style.padding = "40px";

   		emptyContainer.style.transition = "height 1.5s ease-in";
 		console.log(data);

 		emptyContainer.style.background = "#fff";
 		emptyContainer.style.height = "auto";
   		emptyContainer.style.transition = "height 0.75s ease-in";

 		var img = document.createElement("img");
 		var container = document.getElementById("container").appendChild(img); 
		img.setAttribute("src", data['Poster']);
  		//document.body.insertBefore(newDiv, currentDiv);
  		var specs = document.createElement("div");
  		specs.setAttribute("id", 'specs');
  		var specsContainer = document.getElementById("container").appendChild(specs);
  		var titulo = document.createElement('h4');
  		var pais = document.createElement('span');
  		var director = document.createElement('span');
  		var actors = document.createElement('span');
  		var fecha = document.createElement('span');
  		var genero = document.createElement('span');
  		var plot = document.createElement('span');
  		specsContainer.appendChild(titulo).innerHTML = data['Title'];
  		specsContainer.appendChild(director).innerHTML = "<strong>Director:</strong> " + data['Director'];
  		specsContainer.appendChild(pais).innerHTML = "<strong>País:</strong> " +data['Country'];
  		specsContainer.appendChild(actors).innerHTML = "<strong>Actores:</strong> " +data['Actors'];
		specsContainer.appendChild(fecha).innerHTML = "<strong>Fecha:</strong> " +data['Released'];
		specsContainer.appendChild(genero).innerHTML = "<strong>Género:</strong> " +data['Genre'];
  		specsContainer.appendChild(plot).innerHTML = "<strong>Plot:</strong> " +data['Plot'];

//  	<img src="https://m.media-amazon.com/images/M/MV5BNmFiYmJmN2QtNWQwMi00MzliLThiOWMtZjQxNGRhZTQ1MjgyXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_SX300.jpg" />
//     	<div id="specs">
	//     	<h4>"Kill Bill: Vol. 2"</h4>
	//     	<span id="actors">Actors: "Vivica A. Fox, Ambrosia Kelley, Michael Parks, James Parks"</span>
	// ​    	<span id="country">Country: "USA"</span>
	// ​    	<span id="date">DVD: "10 Aug 2004"</span>
	// ​    	<span id="director">Director: "Quentin Tarantino"</span>
	// ​    	<span id="genre">Genre: "Action, Crime, Thriller"</span>
	// ​    	<span id="plot">Plot: "The Bride continues her quest of vengeance against her former boss and lover Bill, the reclusive bouncer Budd, and the treacherous, one-eyed Elle."</span>
	// ​
		
		// var btMovies = document.querySelectorAll('li.item');
		// for (var x = 0; x <  btMovies.length; x++){
		// 	btMovies[x].addEventListener('click', function(){
		// 		console.log(this.id);
		// 	})
		// }
		
    })
    .catch(function(err) {
        console.error(err);
    });
}




//for var i=1; i < 


function getData (empleados) {
	// window.fetch()
	//  .then((success) => { success.json() } )
	//  .then((movies) => { console.log(movies) } )
	//  .catch((error) =>{ console.log(error)});
	//console.log("movies ",movies);   

	for (var i = 0; i < empleados.length; i++) {
 		//tbTableUI.innerHTML += '<tr id="'+empleados[i].id+'"><td>'+empleados[i].nombre+'</td><td>'+empleados[i].apellido+'</td><td>'+empleados[i].email+'</td><td><button class="btn btn-danger">Delete</button><button class="btn btn-info" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat" style="margin-left: 10px">Details</button></td></tr>';
	}
	
	//Acciones boton 
	var btInfos = document.querySelectorAll('button.btn.btn-info');

	for(var i = 0; i<btInfos.length; i++) {
		btInfos[i].addEventListener('click', function(){ 
			getDataItem = this.parentNode.parentNode;
			getDataItemID = getDataItem.id;
			//console.log("id:" + getDataItem.id)
			//console.log(empleados.findIndex(getDataItem.id))
			var index = empleados.map(function(o) { return o.id; }).indexOf(getDataItem.id);
			console.log(index);
			console.log(empleados[index]);
			inputNombre.value = empleados[index].nombre;
			inputApellido.value = empleados[index].apellido;
			inputEmail.value = empleados[index].email;
			localStorage.setItem('datos', JSON.stringify(empleados));

		});

	}		  	

	var btBorrar = document.querySelectorAll('button.btn.btn-danger');
	for(var i = 0; i<btBorrar.length; i++) {
		btBorrar[i].addEventListener('click', function(){ 
			borrarItem(this.parentNode.parentNode.rowIndex)
		});
	}	


}

// var btModificar = document.querySelector("#btModificar");
// btModificar.addEventListener('click',function(){

// 		var index = empleados.map(function(o) { return o.id; }).indexOf(getDataItemID);
// 		if(index != null){
// 		empleados[index].nombre = inputNombre.value;
// 		empleados[index].apellido = inputApellido.value;
// 		empleados[index].email = inputEmail.value;
// 		localStorage.setItem('datos', JSON.stringify(empleados));

// 		//console.log("nombre: " + empleados[index].nombre);
// 		//console.log("nombre campo: "+ inputNombre.value);
// 		tablaReset ("#listaEmpleados tr");
// 		getData (empleados);
// 	}
// })

function getItemByID (id){
	empleados.findIndex(x => x.id === id)
}		  	


function borrarItem (id) {
	var idSplice = id-1;
	
	//borrarBase(idSplice);
	empleados.splice(idSplice,1);

	tablaReset ("#listaEmpleados tr");

	localStorage.setItem('datos', JSON.stringify(empleados));

  	//guardado = localStorage.getItem('datos');
 	
 	//console.log('objetoObtenidoD: ', JSON.parse(guardado));

	//getData (JSON.parse(guardado));

	getData (empleados);
}

function tablaReset (elemento){

	var elem = document.querySelectorAll(elemento);
	
	for (var i = 1; i < elem.length; i++) {
		elem[i].parentNode.removeChild(elem[i])
	}
}

	


// function borrarBase (id){
// 	empleados.splice(id,1);
// }

// $('#exampleModal').on('show.bs.modal', function (event) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })