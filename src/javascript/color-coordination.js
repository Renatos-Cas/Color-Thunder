const form = document.getElementById("coordinationForm");
const numRowsAndColsWidget = document.getElementById("numRowsAndCols");
const numColorsWidget = document.getElementById("numColors");
const colorOptions = ['select', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
let previousSelections = Array(colorOptions.length).fill(null);;

form.addEventListener("submit", handleSubmit);
numRowsAndColsWidget.addEventListener("input", handleNumRowsAndColsInput);
numColorsWidget.addEventListener("input", handleNumColorsInput);

let numRowsAndCols;
let numColors;
let numRowsAndColsValid = false;
let colorsValid = false;

function handleSubmit(event) {
    event.preventDefault();
    const numRowsAndCols = numRowsAndColsWidget.value;
    const numColors = numColorsWidget.value;
    createTableUpper(numColors);
    createTableLower(numRowsAndCols);
    previousSelections = Array(colorOptions.length).fill(null);
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

function createTableUpper(numColors) {
    const tableContainer = document.getElementById("tableContainerUpper");
    tableContainer.innerHTML = "";
    const table = document.createElement("table");    
    for (let i = 0; i < numColors; i++) {
        const row = document.createElement("tr");
        const colorCell = document.createElement("td");
        const dropdown = document.createElement("select");
        const defaultOption = document.createElement("option");
        defaultOption.value = 'select';
        defaultOption.textContent = 'Select a color';
        dropdown.appendChild(defaultOption);

        colorOptions.forEach((color, index) => {
            if (color !== 'select') {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                dropdown.appendChild(option);
            }
        });

        const contentCell = document.createElement("td");
        dropdown.onchange = handleSelection(i, dropdown, previousSelections, colorOptions, contentCell);
        colorCell.appendChild(dropdown);
        row.appendChild(colorCell);
        row.appendChild(contentCell);
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}

function handleSelection(index, dropdown, previousSelections, colorOptions, contentCell) {
    return function() {
        const selectedColor = dropdown.value;
        if (selectedColor === 'select') {
            contentCell.textContent = "";
            dropdown.style.backgroundColor = "";
            return;
        }

        const selectedIndex = dropdown.selectedIndex;
        const isColorTaken = previousSelections.some((colorIndex, idx) => colorIndex === selectedIndex && idx !== index);
        
        if (isColorTaken) {
            dropdown.value = 'select';
            dropdown.style.backgroundColor = "red";
            contentCell.textContent = "";
        } else {
            previousSelections[index] = selectedIndex;
            dropdown.style.backgroundColor = "";
            contentCell.textContent = selectedColor;
        }
    };
}


function createTableLower(numRows) {
    const tableContainer = document.getElementById("tableContainerLower");
    tableContainer.innerHTML = "";
    const rows = Number(numRows) + 1;
    const cols = Number(numRows) + 1;
    const table = document.createElement("table");
    for (let i = 0; i < rows; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("td");
            if (i === 0 && j === 0) {
                cell.textContent = "";
            } else if (i === 0) {
                cell.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);
            } else if (j === 0) {
                cell.textContent = i.toString();
            } else {
                cell.textContent = "";
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}
