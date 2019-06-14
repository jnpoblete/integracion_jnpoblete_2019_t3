let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda');
var tabla_info = document.querySelector('#tabla_info');
var tabla_characters = document.querySelector('#tabla_characters');
var tabla_planets = document.querySelector('#tabla_planets');
var tabla_vehicles = document.querySelector('#tabla_vehicles');
var tabla_starships = document.querySelector('#tabla_starships');
var tabla_species = document.querySelector('#tabla_species');
var search = document.getElementById('search_bar');
var titulo = document.getElementById('title');

async function load(index){
  console.log(index)
  const query_c = `{
    film(id:"`+ index +`" ) {
      id
      title
      episodeID
      openingCrawl
      director
      producers  
      releaseDate     
      characterConnection {
        characters {
          id
          name
          mass
          birthYear
        }
      }
      starshipConnection {
        edges {
          node {
            id
            name
            model
          }
        }
      }
      speciesConnection {
        edges {
          node {
            id
            name
          }
        }
      }
      vehicleConnection{
        edges {
          node {
            id
            name    
            model        
          }
        }
      }
      planetConnection{
        edges {
          node {
            id
            name           
          }
        }
      }
    }
  }`
  // const query_c = `{
  //   species(id: `+index+`) {
  //     name
  //     homeworld
  //   }
  // }`
  await axios({
    url: apiUrl,
    method: 'post',
    data: {
      query: query_c
    }
  }).then((response) => {
    var responseData = response.data;
    if(responseData.data.film == null){
      end = true;
    }
    else{
      console.log(responseData);
      film_response(responseData.data.film);
      species_response(responseData.data.film.speciesConnection.edges);
      draw_table_species();
      starships_response(responseData.data.film.starshipConnection.edges);
      draw_table_starships();
      vehicles_response(responseData.data.film.vehicleConnection.edges);
      draw_table_vehicles();
      character_response(responseData.data.film.characterConnection.characters);
      draw_table_characters();
      planets_response(responseData.data.film.planetConnection.edges);
      draw_table_planets();
    }         
  });
}


function draw_table_characters(){
  var row = tabla_characters.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell6 = row.insertCell(4);
  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "name";
  cell3.innerHTML = "birth Year";
  cell4.innerHTML = "mass";
}


function draw_table_species(){
  var row = tabla_species.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell6 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "name";
}

function draw_table_starships(){
  var row = tabla_starships.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell6 = row.insertCell(3);

  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "name";
  cell3.innerHTML = "model";
}

function draw_table_vehicles(){
  var row = tabla_vehicles.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell6 = row.insertCell(3);

  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "name";
  cell3.innerHTML = "model";
}

function draw_table_planets(){
  var row = tabla_planets.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell6 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "name";
}


async function draw_table_info(name, value){
  try{

    var row = tabla_info.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = name;
    cell2.innerHTML = value;   
  }
  catch(e){
    console.log(e);
    name.innerText += " "+ e;
  }
  
}

async function character_response(result){
  for(var res in result){
    try{
      var row = tabla_characters.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell6 = row.insertCell(4);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].id;      
      cell2.innerHTML = result[res].name;
      cell3.innerHTML = result[res].birthYear;
      if(result[res].mass == null){
        cell4.innerHTML = "unknown";
      }
      else{
        cell4.innerHTML = result[res].mass;
      }
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
  
}

async function film_response(result){
  draw_table_info("Opening Crawl", result.openingCrawl);
  draw_table_info("Episode Id", result.episodeID);
  draw_table_info("Producers", result.producers);
  draw_table_info("Director", result.director);
  draw_table_info("Release Date", result.releaseDate);
  titulo.textContent = result.title;
}


async function species_response(result){
  for(var res in result){
    try{
      var row = tabla_species.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell6 = row.insertCell(2);

      // Add some text to the new cells:
      
      cell1.innerHTML = result[res].node.id;
      cell2.innerHTML = result[res].node.name;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
  
}

async function starships_response(result){
  for(var res in result){
    try{
      var row = tabla_starships.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell6 = row.insertCell(3);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].node.id;
      cell2.innerHTML = result[res].node.name;
      cell3.innerHTML = result[res].node.model;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
}

async function vehicles_response(result){
  for(var res in result){
    try{
      var row = tabla_vehicles.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell6 = row.insertCell(3);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].node.id;
      cell2.innerHTML = result[res].node.name;
      cell3.innerHTML = result[res].node.model;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
}


async function planets_response(result){
  for(var res in result){
    try{
      var row = tabla_planets.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell6 = row.insertCell(2);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].node.id;
      cell2.innerHTML = result[res].node.name;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
}




async function ver_mas_species(){
  var index, table = tabla_species;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[2].onclick = function(){
        index = this.parentElement.rowIndex;
        index = table.rows[index].cells[0].innerHTML 
        console.log(index);    
        window.location = "/species/" +index;
      };
    }
    catch(e){
      console.log(e);
    }

  }
}


async function ver_mas_characters(){
  var index, table = tabla_characters;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[4].onclick = function(){
        index = this.parentElement.rowIndex;
        index = table.rows[index].cells[0].innerHTML 
        console.log(index);    
        window.location = "/people/" +index;
      };
    }
    catch(e){
      console.log(e);
    }

  }
}

async function ver_mas_starships(){
  var index, table = tabla_starships;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[3].onclick = function(){
        index = this.parentElement.rowIndex;
        index = table.rows[index].cells[0].innerHTML 
        console.log(index);    
        window.location = "/starships/" +index;
      };
    }
    catch(e){
      console.log(e);
    }

  }
}


async function ver_mas_vehicles(){
  var index, table = tabla_vehicles;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[3].onclick = function(){
        index = this.parentElement.rowIndex;
        index = table.rows[index].cells[0].innerHTML 
        console.log(index);    
        window.location = "/vehicles/" +index;
      };
    }
    catch(e){
      console.log(e);
    }

  }
}

async function ver_mas_planets(){
  var index, table = tabla_planets;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[2].onclick = function(){
        index = this.parentElement.rowIndex;
        index = table.rows[index].cells[0].innerHTML 
        console.log(index);    
        window.location = "/planets/" +index;
      };
    }
    catch(e){
      console.log(e);
    }

  }
}

async function main(){
  search.placeholder="LOADING..."
  search.readOnly = true;
  var index = document.getElementById('url_tag').textContent;
  await load(index);
  await ver_mas_species();
  await ver_mas_characters();
  await ver_mas_starships();
  await ver_mas_vehicles();
  await ver_mas_planets();
  search.readOnly = false;
  search.placeholder="Search..";
}

main();

