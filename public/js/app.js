let name = document.querySelector('#name');
let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var tabla = document.querySelector('#tabla_resultados');
var div_resultado = document.querySelector('#resultado_busqueda');
var search = document.getElementById('search_bar');
// const request_ql = require('graphql-request');
// import request from 'graphql-request';


async function show_people(path, parametro) {
  var next = apiUrl_Resto + path;
  var responseData;
  var j = 0;
  while(next != ""){
    next = await search(next, parametro);
    if(next == undefined){
      next = "";
      console.log("fin");
    }
  }
}


//criterio: name, parametro:luke
async function people_shower(next, criterio, parametro){
  ret = await axios.get(next).then(response =>{
    responseData = response.data;
    for (i = 0; i < responseData.count; i++) {
      if(criterio == "name"){

      }
      else if(criterio == ""){

      }
      if(parametro != ""){
        if(response.data.results[i].name){

        }
      }
      else{
          try{
            name.innerText += " "+responseData.results[i].name;
          }
          catch{
            i = responseData.count + 1;
          }
      }
      return responseData.next;
    }
  });
  console.log(ret);
  return ret;
}


async function show_all_films() {
  var end = false;
  var i = 1;
  while(!end){
    const query_c = `{
      film(filmID:`+ i +` ) {
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
        film_response(responseData.data.film, );
      }      
      console.log(responseData);     
      i++;
    });
  }
  draw_table();
}

function draw_table(){
  var row = tabla.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);

  // Add some text to the new cells:
  cell1.innerHTML = "title";
  cell2.innerHTML = "release_date";
  cell3.innerHTML = "director";
  cell4.innerHTML = "producers";
  cell5.innerHTML = "episode_id";
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
    }
    
}



function updateInfoError(e){
  name.innerText = e;
}



async function main(){
  search.placeholder="LOADING..."
  search.readOnly = true;
  await show_all_films();
  var index, table = document.getElementById('tabla_resultados');
  console.log(table.rows.length);
  for(var i  = 0; i < table.rows.length; i++){
    table.rows[i].cells[5].onclick = function(){
      index = this.parentElement.rowIndex;
      index = parseInt(table.rows[index].cells[4].innerHTML, 10);
      if(index < 4){
        index =index + 3;
      }
      else if(index == 7){

      }
      else{
        index = index - 3;
      }
      console.log(index);
      window.location = "/info_films/" +index;
    };

  }
  search.readOnly = false;
  search.placeholder="Search..";

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
      url = apiUrl_Resto;
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

main();
