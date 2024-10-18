/**
 * A3 Sistemas distribuidos parte 1
 * Autor Thiago Kasper de Souza - 2024
 */

/* colocar credenciais reais para testar*/
const vars = {
    api:"http://137.184.108.252:5000/api",
    email: "example@gmail.com",
    password: "example"
}


// token exemplo 
async function getCities(token) {
    try {
        const response = await fetch(new Request(vars.api+"/cidades", {
            method: "GET",
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'x-access-token': token,
                'Accept-Encoding': 'gzip,deflate',
                'Connection': 'keep-alive'
            },
          }));
        const cities = await response.json();
        const tableBody = document.getElementById('citiesTable').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; // Limpa a tabela antes de preencher
    
    
        cities.forEach(city => {
            const row = tableBody.insertRow(); // Cria uma nova linha
    
            const cellId = row.insertCell(0); // Cria a célula para o ID
            const cellName = row.insertCell(1); // Cria a célula para o nome da cidade
    
            cellId.textContent = city.id; // Supondo que a cidade tenha um campo 'id'
            cellName.textContent = city.nome; // Supondo que a cidade tenha um campo 'name'
        });
    } catch(error) {
        return error;
    };
  
}


async function init() {
    try {
        const res = await fetch(new Request(vars.api+"/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
         },
          body: JSON.stringify({
            email:vars.email,
            password:vars.password})
        }));
        const data = await res.json();
        if(res.ok) {
            console.log("TOKEN: ", data.token, Date.now());
            getCities(data.token);
        };
        //getCities("");
    } catch(error) {
       return  error;
    }
}

init();