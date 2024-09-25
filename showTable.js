
const rowsPerPageSelect = document.getElementById('rowsPerPage');
const table = document.getElementById('tableStudent').getElementsByTagName('tbody')[0];
const paginationDiv = document.getElementById('pagination');

let currentPage = 1;
let rowsPerPage = parseInt(rowsPerPageSelect.value);
rowsPerPageSelect.onchange = updatePagination;
let filteredData = getStudents();
renderTable(currentPage, rowsPerPage);

function getStudents() {   
    let listStudents = localStorage.getItem('listStudents'); 
    return listStudents
        ? JSON.parse(listStudents)
        : [];
}

function renderTable(page, rowsPerPage) {
    table.innerHTML = '';
    
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = filteredData.slice(start, end);

    console.log(filteredData);
    paginatedData.forEach(dato => {
        const newRow = table.insertRow();
        const file = newRow.insertCell(0);
        const name = newRow.insertCell(1);
        const lastName = newRow.insertCell(2);
        
        file.textContent = dato.file;
        name.textContent = dato.name;
        lastName.textContent = dato.lastName;

        newRow.appendChild(file);
        newRow.appendChild(name);
        newRow.appendChild(lastName);
        table.appendChild(newRow);
    });
    setupPagination();
}

//pagination table
function setupPagination() { 
    paginationDiv.innerHTML = '';

    const pageCount = Math.ceil(filteredData.length / rowsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.className = i === currentPage ? 'active' : '';
        button.onclick = () => {
            currentPage = i;
            renderTable(currentPage, rowsPerPage);
        };
        paginationDiv.appendChild(button);
    }
}
//actualizacion de la paginacion
function updatePagination() {
    rowsPerPage = parseInt(rowsPerPageSelect.value);
    currentPage = 1;
    renderTable(currentPage, rowsPerPage);
}
//filtro del input por Apellido
function filterStudentsByLastName() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    filteredData = filteredData.filter(row => row.lastName.toLowerCase().includes(input));
    console.log(filteredData.length);
    currentPage = 1;
    renderTable(currentPage, rowsPerPage);
}