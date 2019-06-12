let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda')
var tabla_vehicles = document.querySelector('#tabla_vehicles');
var tabla_species = document.querySelector('#tabla_species');
var search = document.getElementById('search_bar');

async function click_mas(index){
  var name_info = document.querySelector('#name_info');
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
  await axios({
    url: apiUrl,
    method: 'post',
    data: {
      query: query_c
    }
  }).then((response) => {
    var responseData = response.data;
    console.log(responseData);
    if(responseData.data.film == null){
      end = true;
    }
    else{
      // film_response(responseData.data.film);
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



async function film_response(result){
  try{
    var row = tabla.insertRow(0);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    // Add some text to the new cells:
    cell1.innerHTML = result.title;
    cell2.innerHTML = result.releaseDate;
    cell3.innerHTML = result.director;
    cell4.innerHTML = result.producers;
    cell5.innerHTML = result.episodeID;
    cell6.innerHTML = "VER MAS";
  }
  catch(e){
    name.innerText += " "+ e;
    i = responseData.count + 1;
  }
  
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
  await click_mas(index);
  search.readOnly = false;
  search.placeholder="Search.."
}
main();
