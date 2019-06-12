let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda');
var tabla_info = document.querySelector('#tabla_info');
var tabla_vehicles = document.querySelector('#tabla_vehicles');
var tabla_species = document.querySelector('#tabla_species');
var search = document.getElementById('search_bar');
var titulo = document.getElementById('title');

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
      console.log("hola");
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




async function filtrar(parametro){
  aux = await axios.get(parametro).then(response =>{
    var res = "";
    var url = "";
      r2 = response.data;
      try{
        res += r2.name + " ";
        url = r2.url;
      }
      catch(e){
        console.log(e);
      }
      return [res, url];
    });
    ret2 = aux[0];
    url2 = aux[1];
    return [ret2, url2];
}

async function buscador(){
  var text = document.getElementById('search_bar').value;
  while (div_resultado.firstChild) {
    div_resultado.removeChild(div_resultado.firstChild);
  }
  var casos = ["info_films", "characters", "starships", "planets"]
  var url = ""
  var resultado = "";
  //name, title
  for(var i  = 0; i < casos.length; i++)
  {

    if(casos[i] == "info_films")
    {
      url = apiUrlFilms;
    }
    else
    {
      if(casos[i] == "characters"){
        url = apiUrl_Resto + "people";
      }
      else{
        url = apiUrl_Resto + casos[i];
      }
    }
    if(text != ""){
      resp = await load(url,text, casos[i]);
      t = resp[0];
      url = resp[1];
      console.log(t);
      console.log(url);
      if(url != ""){
        var a = document.createElement("a");
        var c = document.createTextNode(t + "\n");
        a.appendChild(c);
        a.title  = t;
        aux2 = url.toString().split("/");
        a.href = "/"+ casos[i] + "/" + aux2[aux2.length-2];
        if(resultado == ""){
          var h3 = document.createElement("H3");
          var c3 = document.createTextNode("RESULTADOS DE LA BUSQUEDA: '" + text + "'");
          h3.appendChild(c3);
          div_resultado.appendChild(h3);
        }
        resultado = "encontrado";
        div_resultado.appendChild(a);
        var h3 = document.createElement("H1");
        var c3 = document.createTextNode("");
        h3.appendChild(c3);
        div_resultado.appendChild(h3);
      }
    }
    else{
      t = "SIN RESULTADOS";
    }
  }
  if(resultado == ""){
    var h3 = document.createElement("H1");
    var c3 = document.createTextNode(t);
    h3.appendChild(c3);
    div_resultado.appendChild(h3);
  }
}

async function load(url, text, parametro){
  r = await axios.get(url).then(response =>{
    return response.data.results;
  });
  for(var i  = 0; i < r.length; i++)
  {
    if(parametro == "info_films"){
      var B = r[i].title.toString().toUpperCase();
      if ( B.split(text.toUpperCase()).length  >= 2) {
        return [r[i].title, r[i].url];
      }
    }
    else{
      var B = r[i].name.toString().toUpperCase();
      if ( B.split(text.toUpperCase()).length  >= 2) {
        return [r[i].name, r[i].url];
      }
    }
  }
    return ["BUSQUEDA NO ENCONTRADA", ""];
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

