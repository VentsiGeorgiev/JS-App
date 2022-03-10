function attachEvents() {
    console.log('TODO...');
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    list.addEventListener('click', onDelete);
    loadContacts();
}

const list = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

attachEvents();

// # load contacts
async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();

    list.replaceChildren(...Object.values(data).map(createItem));

}

// # create
async function createContact(contact) {
    const res = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
    });

    const result = await res.json();

    return result;
}

async function onCreate() {
    const person = personInput.value;
    const phone = phoneInput.value;
    const contact = { person, phone };

    const result = await createContact(contact);

    list.appendChild(createItem(result));

    personInput.value = '';
    phoneInput.value = '';
}

function createItem(contact) {
    const liElement = document.createElement('li');
    liElement.innerHTML = `${contact.person}: ${contact.phone} <button data-id="${contact._id}">Delete</button>`;
    return liElement;
}

// # delete
async function deleteContact(id) {
    const res = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'delete'
    });
    const result = res.json();

    return result;
}

async function onDelete(event) {
    console.log(event.target.dataset.id);
    const id = event.target.dataset.id;

    if (id != undefined) {
        await deleteContact(id);
        event.target.parentElement.remove();
    }
}