let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda')
var search = document.getElementById('search_bar');
var tabla_info = document.querySelector('#tabla_info');
var titulo = document.getElementById('title');

async function fun(index){
  r = await axios.get(apiUrl_Resto+ "vehicles/"+ index).then(response =>{
    ret = response.data;
    return ret;
  });

    for(var k in r){
      if(k == "films"){
        var a = r[k].toString();
        var aux = a.split(",")
        var res = "";
        console.log(aux);
        var h1 = document.createElement("H1");
        var c1 = document.createTextNode(k + ":");
        h1.appendChild(c1);
        document.body.appendChild(h1);
        for (i = 0; i <aux.length; i++){
          var m = await filtrar(aux[i], k);
          t = m[0];
          url = m[1];
          var a = document.createElement("a");
          var c = document.createTextNode(t + "\n");
          a.appendChild(c);
          a.title  = t;
          aux2 = url.toString().split("/");
          if(k == "films"){
                a.href = "/info_films/" + aux2[aux2.length-2];
          }
          if(k == "homeworld"){
                a.href = "/planets/" + aux2[aux2.length-2];
          }
          else{
            a.href = "/"+k+"/" + aux2[aux2.length-2];
          }

          document.body.appendChild(a);

          var h3 = document.createElement("H1");
          var c3 = document.createTextNode("");
          h3.appendChild(c3);
          document.body.appendChild(h3);
        }

        console.log(k + " LISTOS");

      }
      else if (k=="url"){

      }
      else{
          name_info.innerHTML += "<br><br>" + k + ": " +r[k];
      }
  }
}


async function filtrar(parametro, film){
  aux = await axios.get(parametro).then(response =>{
    var res = "";
    var url = "";
      r2 = response.data;
      try{
        if(film != "films"){
          res += r2.name + " ";
        }
      else{
        res += r2.title + " ";
      }
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


async function load(index){
  console.log(index);
  const query_c = `{
    vehicle(id: "`+index+`") {
      name
      model
      vehicleClass
      manufacturers
      costInCredits
      length
      crew
      passengers
      maxAtmospheringSpeed
      cargoCapacity
      consumables
      pilotConnection{
        pilots{
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
    console.log(response);
    var responseData = response.data;
    if(responseData.data.vehicle == null){
      end = true;
    }
    else{
      vehicle_response(responseData.data.vehicle);
      film_response(responseData.data.vehicle.filmConnection.films);
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

function draw_table_films(){
  var row = tabla_films.insertRow(0);
  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell6 = row.insertCell(1);

  // Add some text to the new cells:
  cell1.innerHTML = "title";
}

async function film_response(result){
  for(var res in result){
    try{
      var row = tabla_films.insertRow(0);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var cell1 = row.insertCell(0);
      var cell6 = row.insertCell(1);

      // Add some text to the new cells:
      cell1.innerHTML = result[res].title;
      cell6.innerHTML = "VER MAS";
    }
    catch(e){
      name.innerText += " "+ e;
    }
  }
    
}

async function vehicle_response(result){
  draw_table_info("consumables", result.consumables);
  draw_table_info("cargoCapacity", result.cargoCapacity);
  draw_table_info("maxAtmospheringSpeed", result.maxAtmospheringSpeed);
  draw_table_info("passengers", result.passengers);
  draw_table_info("crew", result.crew);
  draw_table_info("length", result.length);
  draw_table_info("costInCredits", result.costInCredits);
  draw_table_info("manufacturers", result.manufacturers);
  draw_table_info("vehicleClass", result.vehicleClass);
  draw_table_info("model", result.model);
  titulo.textContent = result.name;
}

async function main(){
  var index = document.getElementById('url_tag').textContent;
  search.placeholder="LOADING..."
  search.readOnly = true;
  await load(index);
  search.readOnly = false;
  search.placeholder="Search.."

}
main();
