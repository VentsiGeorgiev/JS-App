async function lockedProfile() {

    const main = document.querySelector('main');
    const users = await getAllUsers();
    Object.values(users).map(createPreview).forEach(u => main.appendChild(u));


}

async function getAllUsers() {

    const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
    const users = await response.json();

    return users;
}
function createPreview(user) {

    const element = document.createElement('div');
    element.className = 'profile';
    const showBtn = `<button>Show more</button>`
    const hiddenDiv = `<div class="hiddenInfo">
	<hr>
	<label>Email:</label>
	<input type="email" name="user1Email" value="${user.email}" disabled readonly />
	<label>Age:</label>
	<input type="email" name="user1Age" value="${user.email}" disabled readonly />
</div>`;
    element.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user1Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user1Locked" value="unlock"><br>
<hr>
<label>${user.username}</label>
<input type="text" name="user1Username" value="${user.email}" disabled readonly />
${hiddenDiv}
${showBtn}`;

    return element;

}
