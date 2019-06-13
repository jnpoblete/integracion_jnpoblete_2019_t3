let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var tabla_info = document.querySelector('#tabla_info');
var tabla_characters = document.querySelector('#tabla_characters');
var tabla_films = document.querySelector('#tabla_films');
var titulo = document.getElementById('title');
var div_resultado = document.querySelector('#resultado_busqueda')
var search = document.getElementById('search_bar');

async function load(index){
  console.log(index);
  const query_c = `{
    planet(id: "`+index+`") {
      name
      diameter
      rotationPeriod
      orbitalPeriod
      gravity
      population
      climates
      terrains
      surfaceWater
      residentConnection{
        residents{
          id
          name
        }
      }
     filmConnection{
      films{
        id
        title
      }
     }
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
    if(responseData.data.planet == null){
      end = true;
    }
    else{
      planet_response(responseData.data.planet);
      character_response(responseData.data.planet.residentConnection.residents);
      draw_table_characters();
      film_response(responseData.data.planet.filmConnection.films);
      draw_table_films();
    }          
  });
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

async function planet_response(result){
  draw_table_info("surfaceWater", result.surfaceWater);
  draw_table_info("terrains", result.terrains);
  draw_table_info("climates", result.climate);
  draw_table_info("population", result.population);
  draw_table_info("gravity", result.gravity);
  draw_table_info("orbitalPeriod", result.orbitalPeriod);
  draw_table_info("rotatioPeriod", result.rotatioPeriod);
  draw_table_info("diameter", result.diameter);
  titulo.textContent = result.name;
}

function draw_table_characters(){
  var row = tabla_characters.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell6 = row.insertCell(2);
  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "name";
}

function draw_table_films(){
  var row = tabla_films.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell6 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = "id";
  cell2.innerHTML = "title";
}

async function film_response(result){
  for(var res in result){
    try{
      var row = tabla_films.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell6 = row.insertCell(2);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].id;
      cell2.innerHTML = result[res].title;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
    
}

async function character_response(result){
  for(var res in result){
    try{
      var row = tabla_characters.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell6 = row.insertCell(2);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].id;
      cell2.innerHTML = result[res].name
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
  
}



async function ver_mas_people(){
  var index, table = tabla_characters;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[2].onclick = function(){
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

async function ver_mas_films(){
  var index, table = tabla_films;
  for(var i  = 0; i < table.rows.length; i++){
    try{
      table.rows[i].cells[2].onclick = function(){
        index = this.parentElement.rowIndex;
        index = table.rows[index].cells[0].innerHTML 
        console.log(index);    
        window.location = "/info_films/" +index;
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
  await ver_mas_people();
  search.readOnly = false;
  search.placeholder="Search..";
}
main();
