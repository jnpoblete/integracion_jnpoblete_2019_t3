let apiUrl_Resto = 'https://swapi.co/api/';
let apiUrlFilms = 'https://swapi.co/api/films/';
var div_resultado = document.querySelector('#resultado_busqueda')
var search = document.getElementById('search_bar');

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
  var index = document.getElementById('url_tag').textContent;
  search.placeholder="LOADING..."
  search.readOnly = true;
  await fun(index);
  search.readOnly = false;
  search.placeholder="Search.."

}
main();
