document.addEventListener('DOMContentLoaded',  loadTableData);

const stuName = document.querySelector("#name");

const stuID = document.querySelector("#id");

const stuMail = document.querySelector("#email");

const stuCont = document.querySelector("#contNo");

const button = document.querySelector(".btnSubmit")
button.addEventListener("click", addInputData);

const data = document.querySelector(".inputdata");

function addInputData(){
    
    const tableRow = document.createElement("tr");
    
    const tableData = document.createElement("td");
    const tableData1 = document.createElement("td");
    const tableData2 = document.createElement("td");
    const tableData3 = document.createElement("td");

    tableData.innerHTML = stuName.value;
    tableData1.innerHTML = stuID.value;
    tableData2.innerHTML = stuMail.value;
    tableData3.innerHTML = stuCont.value;
    
    tableRow.appendChild(tableData);
    tableRow.appendChild(tableData1);
    tableRow.appendChild(tableData2);
    tableRow.appendChild(tableData3);
    
    if (stuName.value =='') return;
    if (stuID.value =='') return;
    if (stuMail.value =='') return;
    if (stuCont.value =='') return;
    data.appendChild(tableRow);
    stuName.value = "";
    stuID.value = "";
    stuMail.value = "";
    stuCont.value = "";

    const deletebtn = document.createElement("button");
    deletebtn.classList.add("deleteBtn");
    deletebtn.innerHTML = "Delete";
    deletebtn.addEventListener("click", (event) => deleteRow(event));
    tableRow.appendChild(deletebtn);

    const editbtn = document.createElement("button");
    editbtn.classList.add("editBtn");
    editbtn.innerHTML = "Edit";
    editbtn.addEventListener("click", () => editRow(tableRow, tableData, tableData1, tableData2, tableData3));
    tableRow.appendChild(editbtn);

    saveTableData();
}

    function deleteRow(event){
        const row = event.target.parentNode;
        row.parentNode.removeChild(row);
        saveTableData();
    }
    
    function editRow(row, tableData, tableData1, tableData2, tableData3) {
        const newName = prompt("Enter new name:", tableData.innerHTML);
        const newID = prompt("Enter new ID:", tableData1.innerHTML);
        const newMail = prompt("Enter new email:", tableData2.innerHTML);
        const newContact = prompt("Enter new contact:", tableData3.innerHTML);
    
        if (newName !== null) tableData.innerHTML = newName;
        if (newID !== null) tableData1.innerHTML = newID;
        if (newMail !== null) tableData2.innerHTML = newMail;
        if (newContact !== null) tableData3.innerHTML = newContact;

        saveTableData();
    }

    function saveTableData() {
        const rows = Array.from(data.querySelectorAll('tr')).map(row => ({
            name: row.cells[0].innerText,
            id: row.cells[1].innerText,
            email: row.cells[2].innerText,
            contact: row.cells[3].innerText
        }));
        localStorage.setItem('tableData', JSON.stringify(rows));
    }
    
    function loadTableData() {
        const rows = JSON.parse(localStorage.getItem('tableData')) || [];
        rows.forEach(({ name, id, email, contact }) => {
            const tableRow = document.createElement("tr");
    
            const tableData = document.createElement("td");
            const tableData1 = document.createElement("td");
            const tableData2 = document.createElement("td");
            const tableData3 = document.createElement("td");
    
            tableData.innerHTML = name;
            tableData1.innerHTML = id;
            tableData2.innerHTML = email;
            tableData3.innerHTML = contact;
    
            tableRow.appendChild(tableData);
            tableRow.appendChild(tableData1);
            tableRow.appendChild(tableData2);
            tableRow.appendChild(tableData3);
    
            const deletebtn = document.createElement("button");
            deletebtn.classList.add("deleteBtn");
            deletebtn.innerHTML = "Delete";
            deletebtn.addEventListener("click", (event) => deleteRow(event));
            tableRow.appendChild(deletebtn);
    
            const editbtn = document.createElement("button");
            editbtn.classList.add("editBtn");
            editbtn.innerHTML = "Edit";
            editbtn.addEventListener("click", () => editRow(tableRow, tableData, tableData1, tableData2, tableData3));
            tableRow.appendChild(editbtn);
    
            data.appendChild(tableRow);
        });
    }