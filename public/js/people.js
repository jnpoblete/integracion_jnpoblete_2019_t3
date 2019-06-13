let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var div_resultado = document.querySelector('#resultado_busqueda')
var tabla_info = document.querySelector('#tabla_info');
var titulo = document.getElementById('title');
var search = document.getElementById('search_bar');
var tabla_films = document.querySelector('#tabla_films');


async function fun(index){
  r = await axios.get(apiUrl_Resto+ "people/"+ index).then(response =>{
    ret = response.data;
    return ret;
  });

    for(var k in r){
      if(k == "species" || k=="films" || k == "homeworld"){
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
          else if(k == "homeworld"){
                a.href = "/planets/" + aux2[aux2.length-2];
          }
          else{
            a.href = "/" + k + "/" + aux2[aux2.length-2];
          }
          document.body.appendChild(a);

          var h3 = document.createElement("H1");
          var c3 = document.createTextNode("");
          h3.appendChild(c3);
          document.body.appendChild(h3);
        }

        console.log(k + " LISTOS");

      }
      else if (k == "vehicles" || k == "starships" || k=="url"){

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
    person(id: "`+index+`") {
      name
      birthYear
      eyeColor
      gender
      hairColor
      height
      mass
      skinColor
      species{
        id
        name
      }
      homeworld {
        id
        name
      }
      filmConnection{
        films{
          id
          title
        }
      }
    }
  }
  `
  await axios({
    url: apiUrl,
    method: 'post',
    data: {
      query: query_c
    }
  }).then((response) => {
    
    var responseData = response.data;
    if(responseData.data.person == null){
      end = true;
    }
    else{
      people_response(responseData.data.person);
      console.log(responseData.data.person);
      if(responseData.data.person.species){
        add_hyperlink(1, 1, "/species/" + responseData.data.person.species.id)
      }
      if(responseData.data.person.homeworld){
      add_hyperlink(0, 1, "/planets/" + responseData.data.person.homeworld.id)
      }
      film_response(responseData.data.person.filmConnection.films);
      draw_table_films();
    }          
  });
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

async function people_response(result){
  draw_table_info("Birth Year", result.birthYear);
  draw_table_info("eye Color", result.eyeColor);
  draw_table_info("gender", result.gender);
  draw_table_info("hair Color", result.hairColor);
  draw_table_info("height", result.height);
  draw_table_info("mass", result.mass);
  draw_table_info("skin Color", result.skinColor);
  if(result.species){
  draw_table_info("specie", result.species.name);
  }
  else{
    draw_table_info("specie", "null");
  }
  if(result.homeworld){
    draw_table_info("homeworld", result.homeworld.name);
  }
  else{
    draw_table_info("homeworld", "null");
  }
  titulo.textContent = result.name;
}

async function add_hyperlink(row, col, url){
  var table = tabla_info;
  var value =  table.rows[row].cells[col].textContent;
  table.rows[row].cells[col].textContent = "";
  try{
    var link = document.createElement("a");
    link.setAttribute("href", url)
    var linkText = document.createTextNode(value);
    link.appendChild(linkText);
    table.rows[row].cells[col].appendChild(link); 
  }
  catch(e){
    console.log(e);
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
  var index = document.getElementById('url_tag').textContent;
  search.placeholder="LOADING..."
  search.readOnly = true;
  await load(index);
  await ver_mas_films();
  search.readOnly = false;
  search.placeholder="Search.."

}
main();
