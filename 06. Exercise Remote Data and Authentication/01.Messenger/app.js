function attachEvents() {
    // add event listener to load button
    document.getElementById('refresh').addEventListener('click', loadMessages);
    // add event listener to post button
    document.getElementById('submit').addEventListener('click', onSubmit);
    loadMessages();
}

const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');
const list = document.getElementById('messages');


attachEvents();
// add single message to list
async function onSubmit() {
    const author = authorInput.value;
    const content = contentInput.value;

    const result = await createMessages({ author, content });

    contentInput.value = '';
    list.value += '\n' + `${author}: ${content}`;
}

// load messages & display all messages
async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const res = await fetch(url);
    const data = await res.json();

    const messages = Object.values(data);

    list.value = messages.map(m => `${m.author}: ${m.content}`).join('\n');
}

// post messages
async function createMessages(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';
    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }
    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}
