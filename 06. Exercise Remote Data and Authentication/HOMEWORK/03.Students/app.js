const tbody = document.querySelector('tbody');
const createForm = document.getElementById('form')

createForm.addEventListener('submit', onCreate)
loadAllStudent();

async function loadAllStudent() {
   const res = await fetch('http://localhost:3030/jsonstore/collections/students');
   const students = await res.json();

   const result = Object.entries(students).map(([id, student]) => createRow(id, student));
   tbody.replaceChildren(...result);

}

async function onCreate(event) {
   event.preventDefault();

   const formData = new FormData(event.target);

   const firstName = formData.get('firstName');
   const lastName = formData.get('lastName');
   const facultyNumber = formData.get('facultyNumber');
   const grade = formData.get('grade');
   console.log(firstName, lastName);

   const result = await createStudent({ firstName, lastName, facultyNumber, grade });
   tbody.appendChild(createRow(result._id, result));

   loadAllStudent();
   event.target.reset();
}



function createRow(id, student) {
   const row = document.createElement('tr');
   row.innerHTML = `<td>${student.firstName}</td>
<td>${student.lastName}</td>
<td>${student.facultyNumber}</td>
<td>${student.grade}</td>
<td data-id=${id}>`

   return row;
}

async function createStudent(student) {
   const result = await fetch('http://localhost:3030/jsonstore/collections/students', {
      method: 'post',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(student)
   })

   return result;
};
