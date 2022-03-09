function attachEvents() {
    const getWetherBtn = document.getElementById('submit');

    const cityName = document.getElementById('location').value;

    getWetherBtn.addEventListener('click', () => getForecast(cityName));
}

attachEvents();

async function getForecast(name) {
    const code = await getLocationCode(name);

    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpComming(code)
    ]);

    return { current, upcoming };

}

async function getLocationCode(name) {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';

    const res = await fetch(url);
    const data = await res.json();

    const location = data.find(l => l.name == name);

    return location.code;

}

async function getCurrent(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}

async function getUpComming(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;

    const res = await fetch(url);
    const data = await res.json();

    return data;
}