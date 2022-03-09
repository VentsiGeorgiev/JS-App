const locationInput = document.getElementById('location');

function attachEvents() {
   const location = locationInput.value;
   document.getElementById('submit').addEventListener('click', () => getAllLocations(location))
}

attachEvents();

async function getAllLocations(name) {
   const res = await fetch('http://localhost:3030/jsonstore/forecaster/locations')
   const data = await res.json();

   const info = data.find(x => x.name == name);

   console.log(info.code);
   // return info.code;
}

async function currentCondition(code) {
   const res = await fetch('http://localhost:3030/jsonstore/forecaster/today/' + code);
   const data = await res.json();



   return data;
}

async function forecastCondition(code) {
   const res = await fetch('http://localhost:3030/jsonstore/forecaster/upcoming/' + code);
   const data = await res.json();

   return data;
}

