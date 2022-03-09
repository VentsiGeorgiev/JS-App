function solve() {
    const label = document.querySelector('#info span');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        // get information about next stop
        // display name of next stop
        departBtn.disabled = true;

        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);
        // const data = await res.json();
        stop = await res.json();

        label.textContent = `Next stop ${stop.name}`

        // activate other bytton

        arriveBtn.disabled = false;
    }

    function arrive() {
        // display name of current stop
        // activate other button
        label.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;

    }

    return {
        depart,
        arrive
    };
}

let result = solve();