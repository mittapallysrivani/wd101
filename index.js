let myFormEl = document.getElementById("myForm");
let submitButton = document.getElementById("submitButton");
let inputNameEl = document.getElementById("name");
let inputEmailEl = document.getElementById("email");
let inputPasswordEl = document.getElementById("password");
let inputDobEl = document.getElementById("dob");
let acceptEL = document.getElementById("checkbox");
let errMsgEl = document.getElementById("errmsg");
let errMsgEl1 = document.getElementById("errmsg1");
let errMsgEl2 = document.getElementById("errmsg2");
let errMsgEl3 = document.getElementById("errmsg3");
let errMsgEl4 = document.getElementById("errmsg4");
let tableBody = document.getElementById("dataBody");

function populateTableFromLocalStorage() {
    // Check if table data exists in local storage
    if (localStorage.getItem("tableData")) {
        // Parse the JSON string and populate the table
        let tableData = JSON.parse(localStorage.getItem("tableData"));
        tableData.forEach(rowData => {
            let newRow = tableBody.insertRow();
            rowData.forEach(cellData => {
                let newCell = newRow.insertCell();
                newCell.innerHTML = cellData;
            });
        });
    }
}

// Call the function when the page loads
window.onload = populateTableFromLocalStorage;

function validatename() {
    if (inputNameEl.value === "") {
        errMsgEl.textContent = "required*";
    } else {
        localStorage.setItem("name", JSON.stringify(inputNameEl.value));
        errMsgEl.textContent = "";
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateemail() {
    const email = inputEmailEl.value.trim();

    if (email === "" || !validateEmail(email)) {
        errMsgEl1.textContent = "Enter a valid email address";
    } else {
        localStorage.setItem("email", JSON.stringify(inputEmailEl.value));
        errMsgEl1.textContent = "";
    }
}

function validatepassword() {
    if (inputPasswordEl.value === "") {
        errMsgEl2.textContent = "required*";
    } else {
        localStorage.setItem("password", JSON.stringify(inputPasswordEl.value));
        errMsgEl2.textContent = "";
    }
}

function validateDob() {
    let selectedDate = new Date(inputDobEl.value);
    let currentDate = new Date();
    let minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 55);
    let maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 18);

    if (
        selectedDate >= minDate &&
        selectedDate <= maxDate &&
        selectedDate <= currentDate
    ) {
        errMsgEl3.textContent = "";
        localStorage.setItem("dob", JSON.stringify(inputDobEl.value));
        return true;
    } else {
        errMsgEl3.textContent = "Please enter a valid date of birth between ages 18 and 55";
        return false;
    }
}

function validateCheckBox() {
    if (!acceptEL.checked) {
        errMsgEl4.textContent = "required*";
        return false;
    } else {
        errMsgEl.textContent = "";
        localStorage.setItem("Accept Terms & Conditions", true);
        return true;
    }
}

submitButton.onclick = function() {
    validatename();
    validateemail();
    validatepassword();
    validateDob();
    validateCheckBox();
    if (validateCheckBox()) {
        localStorage.setItem("Accept Terms & Conditions", true);
    }
};

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    submitForm();
});


function submitForm() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let checkbox = document.getElementById("checkbox").value;

    // Validate the form data (you can add your validation logic here)

    // Create a new row in the table
    let tableBody = document.getElementById("dataBody");
    let newRow = tableBody.insertRow();

    // Insert cells with the user-submitted data
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);

    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = password;
    cell4.innerHTML = dob;
    cell5.innerHTML = "true";

    let tableData = Array.from(tableBody.rows).map(row =>
        Array.from(row.cells).map(cell => cell.innerHTML)
    );
    localStorage.setItem("tableData", JSON.stringify(tableData));

    // Clear the form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("checkbox").checked = false;
}
