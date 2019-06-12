let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda')
var search = document.getElementById('search_bar');

async function load(index){
  const query_c = `{
    species(id: `+index+`) {
      name
      homeworld
    }
  }`
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
    }          
  });
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
  await click_mas(index);
  search.readOnly = false;
  search.placeholder="Search..";
}
main();
