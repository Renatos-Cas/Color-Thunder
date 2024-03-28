const form = document.getElementById("coordinationForm");
const numRowsAndColsWidget = document.getElementById("numRowsAndCols");
const numColorsWidget = document.getElementById("numColors");

form.addEventListener("submit", handleSubmit);
numRowsAndColsWidget.addEventListener("input", handleNumRowsAndColsInput);
numColorsWidget.addEventListener("input", handleNumColorsInput);

let numRowsAndCols;
let numColors;
let numRowsAndColsValid = false;
let colorsValid = false;

function handleSubmit(event) {
    event.preventDefault();

    if (numRowsAndColsValid && colorsValid) {
        numRowsAndCols = numRowsAndColsWidget.value;
        numColors = numColorsWidget.value;
        createTable(2, numColors, "tableContainer1");
    }
}

function handleNumRowsAndColsInput(event) {
    const { value } = event.target;

    if (value > 26 || value < 1) {
        setInvalidStyle(numRowsAndColsWidget);
        numRowsAndColsValid = false;
    } else {
        setValidStyle(numRowsAndColsWidget);
        numRowsAndColsValid = true;
    }
}

function handleNumColorsInput(event) {
    const { value } = event.target;

    if (value < 1 || value > 10) {
        setInvalidStyle(numColorsWidget);
        colorsValid = false;
    } else {
        setValidStyle(numColorsWidget);
        colorsValid = true;
    }
}

function setValidStyle(element) {
    element.style.backgroundColor = "white";
}

function setInvalidStyle(element) {
    element.style.backgroundColor = "red";
}

function createTable(rows, cols, containerId)  {
    const tableContainer = document.getElementById(containerId);
    tableContainer.innerHTML = "";
    
    const table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            cell.textContent = `Row ${i + 1}, Col ${j + 1}`;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}