let apiUrl = 'https://swapi-graphql-integracion-t3.herokuapp.com';
var tabla_info = document.querySelector('#tabla_info');
var tabla_characters = document.querySelector('#tabla_characters');
var titulo = document.getElementById('title');
var div_resultado = document.querySelector('#resultado_busqueda')
var search = document.getElementById('search_bar');

async function load(index){
  console.log(index);
  const query_c = `{
    species(id: "`+index+`") {
      name
      classification
      designation
      averageHeight
      averageLifespan
      eyeColors
      hairColors
      skinColors
      language
      homeworld{
        id
        name
      }
      personConnection {
        people{
          id
          name
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
    if(responseData.data.species == null){
      end = true;
    }
    else{
      species_response(responseData.data.species);
      character_response(responseData.data.species.personConnection.people);
      draw_table_characters();
      if(responseData.data.species.homeworld){
      add_hyperlink(0, 1, "/planets/" + responseData.data.species.homeworld.id)
      }
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

async function species_response(result){
  draw_table_info("Classification", result.classification);
  draw_table_info("Designation", result.designation);
  draw_table_info("AverageHeight", result.averageHeight);
  draw_table_info("AverageLifespan", result.averageLifespan);
  draw_table_info("eyeColors", result.eyeColors);
  draw_table_info("hairColors", result.hairColors);
  draw_table_info("skinColors", result.skinColors);
  draw_table_info("language", result.language);
  draw_table_info("homeworld", result.homeworld.name);
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
      cell2.innerHTML = result[res].name;
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
