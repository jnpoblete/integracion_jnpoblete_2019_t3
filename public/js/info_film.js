let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda');
var tabla_info = document.querySelector('#tabla_info');
var tabla_characters = document.querySelector('#tabla_characters');
var tabla_vehicles = document.querySelector('#tabla_vehicles');
var tabla_species = document.querySelector('#tabla_species');
var search = document.getElementById('search_bar');
var titulo = document.getElementById('title');

async function load(index){
  const query_c = `{
    film(filmID:`+ index +` ) {
      id
      title
      episodeID
      openingCrawl
      director
      producers  
      releaseDate     
      characterConnection {
        characters {
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
            manufacturers
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
      film_response(responseData.data.film);
      species_response(responseData.data.film.speciesConnection.edges);
      draw_table_species();
      vehicle_response(responseData.data.film.starshipConnection.edges);
      draw_table_vehicles();
      character_response(responseData.data.film.characterConnection.characters);
      draw_table_characters();
    }          

  });
}


function draw_table_characters(){
  var row = tabla_characters.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell6 = row.insertCell(3);

  // Add some text to the new cells:
  cell1.innerHTML = "name";
  cell2.innerHTML = "birth Year";
  cell3.innerHTML = "mass";
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
  cell3.innerHTML = "manufacturers";
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
      var cell6 = row.insertCell(3);

      // Add some text to the new cells:
      
      cell1.innerHTML = result[res].name;
      cell2.innerHTML = result[res].birthYear;
      if(result[res].mass == null){
        cell3.innerHTML = "unknown";
      }
      else{
        cell3.innerHTML = result[res].mass;
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

async function vehicle_response(result){
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
      cell3.innerHTML = result[res].node.manufacturers;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
}


async function main(){
  search.placeholder="LOADING..."
  search.readOnly = true;
  var index = document.getElementById('id_tag').textContent;
  await load(index);
  await ver_mas_species();
  search.readOnly = false;
  search.placeholder="Search..";
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

main();

