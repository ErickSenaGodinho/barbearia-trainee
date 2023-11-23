document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const table = document.querySelector('table');
    let editRowIndex = null;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const day = document.getElementById('day').value;
        const hour = document.getElementById('hour').value;
        const service = document.getElementById('service-choice').value;

        if (editRowIndex !== null) {
            // Editar a linha existente
            editRowInTable(editRowIndex, name, email, phone, day, hour, service);
            editRowIndex = null; // Resetar o índice de edição
        } else {
            // Adicionar uma nova linha
            addRowToTable(name, email, phone, day, hour, service);
        }

        form.reset();
    });

    function addRowToTable(name, email, phone, day, hour, service) {
        const newRow = table.insertRow();

        const cellId = newRow.insertCell(0);
        const cellName = newRow.insertCell(1);
        const cellEmail = newRow.insertCell(2);
        const cellPhone = newRow.insertCell(3);
        const cellDay = newRow.insertCell(4);
        const cellHour = newRow.insertCell(5);
        const cellService = newRow.insertCell(6);
        const cellActions = newRow.insertCell(7);

        cellId.textContent = table.rows.length - 1;
        cellName.textContent = name;
        cellEmail.textContent = email;
        cellPhone.textContent = phone;
        cellDay.textContent = day;
        cellHour.textContent = hour;
        cellService.textContent = service;

        const editButton = createButton('Editar', function () {
            editRowIndex = newRow.rowIndex;
            fillFormWithRowData(newRow);
        });

        const deleteButton = createButton('Excluir', function () {
            deleteRow(newRow);
        });

        cellActions.appendChild(editButton);
        cellActions.appendChild(deleteButton);
    }

    function createButton(text, clickHandler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    function fillFormWithRowData(row) {
        // Preencher o formulário com os dados da linha selecionada para edição
        document.getElementById('name').value = row.cells[1].textContent;
        document.getElementById('email').value = row.cells[2].textContent;
        document.getElementById('phone').value = row.cells[3].textContent;
        document.getElementById('day').value = row.cells[4].textContent;
        document.getElementById('hour').value = row.cells[5].textContent;
        document.getElementById('service-choice').value = row.cells[6].textContent;
    }

    function editRowInTable(rowIndex, name, email, phone, day, hour, service) {
        // Editar os dados da linha existente
        const row = table.rows[rowIndex];
        row.cells[1].textContent = name;
        row.cells[2].textContent = email;
        row.cells[3].textContent = phone;
        row.cells[4].textContent = day;
        row.cells[5].textContent = hour;
        row.cells[6].textContent = service;
    }

    function deleteRow(row) {
        table.deleteRow(row.rowIndex);
    }
});
