let currentEditIndex = -1;

const form = document.getElementById('form');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const formErrors = document.getElementById('formErrors');

function submitForm(event) {
    event.preventDefault();

    formErrors.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();

    if (!name || !email || !age) {
        formErrors.textContent = 'Por favor, preencha todos os campos!';
        return;
    }
    if (currentEditIndex === -1) {

        addUserToTable(name, email, age);
    } else {
        updateUserInTable(name, email, age);
    }
    form.reset();
}

function addUserToTable(name, email, age) {
    const row = userTable.insertRow();
    const rowIndex = userTable.rows.length;

    row.innerHTML = `
        <td>${rowIndex}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${age}</td>
        <td>
            <button class="edit-btn" onclick="editUser(${rowIndex - 1})">Editar</button>
            <button class="delete-btn" onclick="deleteUser(${rowIndex - 1})">Excluir</button>
        </td>
    `;
}

function editUser(index) {
    const row = userTable.rows[index];
    document.getElementById('name').value = row.cells[1].textContent;
    document.getElementById('email').value = row.cells[2].textContent;
    document.getElementById('age').value = row.cells[3].textContent;

    currentEditIndex = index;
}

function updateUserInTable(name, email, age) {
    const row = userTable.rows[currentEditIndex];
    row.cells[1].textContent = name;
    row.cells[2].textContent = email;
    row.cells[3].textContent = age;

    currentEditIndex = -1; 
}

function deleteUser(index) {
    if (confirm('Você tem certeza que deseja excluir este usuário?')) {
        userTable.deleteRow(index);
        updateRowIndexes();
    }
}

function updateRowIndexes() {
    for (let i = 0; i < userTable.rows.length; i++) {
        userTable.rows[i].cells[0].textContent = i + 1;
    }
}
