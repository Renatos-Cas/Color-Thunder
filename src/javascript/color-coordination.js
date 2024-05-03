const form = document.getElementById("coordinationForm");
const numRowsAndColsWidget = document.getElementById("numRowsAndCols");
const numColorsWidget = document.getElementById("numColors");
const printViewButton = document.getElementById("printViewButton");
const colorOptions = ['select', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'grey', 'brown', 'black', 'teal'];
let previousSelections = Array(colorOptions.length).fill(null);
let current_color = null; 

form.addEventListener("submit", handleSubmit);
numRowsAndColsWidget.addEventListener("input", handleNumRowsAndColsInput);
numColorsWidget.addEventListener("input", handleNumColorsInput);
printViewButton.addEventListener("click", printView);

function getCurrentColor() {
    const radioButtons = document.querySelectorAll('#tableContainerUpper input[type="radio"]');
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            const row = radioButtons[i].closest('tr');
            return row;
        }
    }
    return null;
}

function handleSubmit(event) {
    event.preventDefault();
    const numRowsAndCols = numRowsAndColsWidget.value;
    const numColors = numColorsWidget.value;
    createTableUpper(numColors);
    createTableLower(numRowsAndCols);
    previousSelections = Array(colorOptions.length).fill(null);
    printViewButton.style.display = 'block';
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
        defaultOption.disabled = true;
        defaultOption.selected = true;

        dropdown.appendChild(defaultOption);

        colorOptions.forEach((color, index) => {
            if (color !== 'select') {
                const option = document.createElement("option");
                option.value = color;
                option.textContent = color;
                dropdown.appendChild(option);
            }
        });

        const currentColorCell = document.createElement("td");
        const currentColorRadioButton = document.createElement("input");
        currentColorRadioButton.type = "radio";
        currentColorRadioButton.name = "currentColorSelection";
        currentColorCell.appendChild(currentColorRadioButton);
        
        const contentCell = document.createElement("td");
        dropdown.onchange = handleSelection(i, dropdown, previousSelections, colorOptions, contentCell);
        
        colorCell.appendChild(dropdown);
        row.appendChild(colorCell);
        row.appendChild(contentCell);
        row.appendChild(currentColorCell);
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}

function handleSelection(index, dropdown, previousSelections, colorOptions, contentCell) {
    return function() {
        contentCell.textContent=''
        const selectedColor = dropdown.value;
        if (selectedColor === 'select') {
            contentCell.textContent = "";
            dropdown.style.backgroundColor = "";
            previousSelections[index] = null;
            contentCell.style.backgroundColor = "transparent";
            return;
        }

        const selectedIndex = dropdown.selectedIndex;
        const isColorTaken = previousSelections.some((colorIndex, idx) => colorIndex === selectedIndex && idx !== index);

        if (isColorTaken) {
            dropdown.value = 'select';
            dropdown.style.backgroundColor = "red";
            contentCell.textContent = `${colorOptions[selectedIndex]} already chosen`;
        } else {
            if (previousSelections[index] !== null) {
                updateColorsInLowerTable(previousSelections[index], selectedIndex, contentCell);
            }
            previousSelections[index] = selectedIndex;
            dropdown.style.backgroundColor = selectedColor;
            contentCell.style.backgroundColor = selectedColor;
        }
    };
}




function updateColorsInLowerTable(oldColorIndex, newColorIndex, contentCell) {
    const oldColor = colorOptions[oldColorIndex];
    const newColor = colorOptions[newColorIndex];
    const cells = document.querySelectorAll('#tableContainerLower td');
    cells.forEach(cell => {
        if (cell.style.backgroundColor === oldColor) {
            cell.style.backgroundColor = newColor;
            appendCoordinateToContentCell(cell.id, contentCell);
        }
    });
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
                cell.textContent = "";             } else if (i === 0) {
                cell.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);             } else if (j === 0) {
                cell.textContent = i.toString();             } else {
                cell.textContent = "";                 cell.id = String.fromCharCode('A'.charCodeAt(0) + j - 1) + i;                 cell.onclick = function() { handleCellClick(cell); };             }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    tableContainer.appendChild(table);
}


function handleCellClick(cell) {
    const row = getCurrentColor();
    if (!row) {
        console.log("No color selected");
        alert('Please select a color first.');
        return;
    }
    
    const selectElement = row.querySelector('select');
    const newColor = selectElement.value;
    const oldColor = window.getComputedStyle(cell).backgroundColor;     const contentCell = row.cells[row.cells.length - 2];

        if (cell.style.backgroundColor === newColor) {
        cell.style.backgroundColor = 'transparent';         removeCoordinateFromContentCell(cell.id, contentCell);     } else {
        if (cell.style.backgroundColor !== newColor && cell.style.backgroundColor !== '') {
            removeCoordinateFromOldRow(cell.id, oldColor); 
        }
        cell.style.backgroundColor = newColor;         appendCoordinateToContentCell(cell.id, contentCell);     }
}

function appendCoordinateToContentCell(coordinate, contentCell) {
    let coordinates = contentCell.textContent ? contentCell.textContent.split(', ') : [];
    if (coordinate && !coordinates.includes(coordinate)) {
        coordinates.push(coordinate);
        coordinates.sort((a, b) => {
            const aParts = a.match(/(\D+)(\d+)/);
            const bParts = b.match(/(\D+)(\d+)/);
            if (aParts[1] === bParts[1]) return parseInt(aParts[2]) - parseInt(bParts[2]);
            return aParts[1].localeCompare(bParts[1]);
        });
        contentCell.textContent = coordinates.join(', ');
    }
}

function removeCoordinateFromContentCell(coordinate, contentCell) {
    let coordinates = contentCell.textContent ? contentCell.textContent.split(', ') : [];
    const index = coordinates.indexOf(coordinate);
    if (index > -1) {
        coordinates.splice(index, 1);
        contentCell.textContent = coordinates.join(', ');
    }
}

function removeCoordinateFromOldRow(coordinate, oldColor) {
    const rows = document.querySelectorAll('#tableContainerUpper tr');
    rows.forEach(row => {
        const contentCell = row.cells[row.cells.length - 2];
        if (window.getComputedStyle(contentCell).backgroundColor === oldColor) {
            removeCoordinateFromContentCell(coordinate, contentCell);
        }
    });
}






function getPreviewStyles() {
    return `
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            filter: grayscale(100%);
        }
        
        header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        img {
            width: 100px;
            height: 100px;
        }
        
        #tableContainerLower {
            page-break-inside: avoid;
        }

        #tableContainerLower table {
            margin: 0 auto;
            margin-bottom: 100px;
            border: 1px solid;
            border-collapse: collapse;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }
        
        #tableContainerLower td {
            width: 30px;
            height: 30px;
            text-align: center;
        }
        
        #tableContainerLower tr:first-child, #tableContainerLower td:first-child {
            background-color: #05445e;
            color: white;
            font-weight: bold;
            font-size: 20px;
        }
        
        #tableContainerLower tr:not(:first-child) td:not(:first-child) {
            border: 1px solid lightgrey;
        }

        #tableContainerUpper table {
            margin-bottom: 50px;
        }
    `;
}

function buildPrintViewHTML(upperTable, lowerTable) {
    return `
        <html>
        <head>
            <title>Print Preview</title>
            <style>${getPreviewStyles()}</style>
        </head>
        <body>
            <header>
                <img src="./src/logo.png" alt="Greyscale Logo">
                <h1>Color Thunder</h1>
            </header>
            <div id="tableContainerUpper">${upperTable}</div>
            <div id="tableContainerLower">${lowerTable}</div>
        </body>
        </html>
    `;
}

function getInvalidUpperTableTDs() {
    return Array.from(document.querySelectorAll("#tableContainerUpper tr"))
        .filter(tr => {
            const tds = tr.querySelectorAll('td');
            const select = tds[0].querySelector('select');
            const color = tds[1];

            if (select.value === 'select') {
                select.style.backgroundColor = "red";
                color.textContent = "Choose a color or adjust number of colors.";
                return true;
            }
            return false;
        });
}

function getUpperTableHTML() {
    const tds = Array.from(document.querySelectorAll("#tableContainerUpper tr td:first-child"))
    let upperTableHTML = '<table>';
    tds.forEach(td => upperTableHTML += `<tr><td>${td.querySelector('select').value}</td></tr>`);
    upperTableHTML += '</table>';
    return upperTableHTML;
}

function getLowerTableHTML() {
    return document.getElementById("tableContainerLower").innerHTML;
}

function printView() {
    if (getInvalidUpperTableTDs().length > 0) {
        return;
    }

    const printViewHTML = buildPrintViewHTML(getUpperTableHTML(), getLowerTableHTML());

    const printViewWindow = window.open('', '_blank');
    printViewWindow.document.write(printViewHTML);

    if (Boolean(printViewWindow.chrome)) {
                setTimeout(function() {
            printViewWindow.document.close();
            printViewWindow.focus();
            printViewWindow.print(); 
            printViewWindow.close();
        }, 200);
      }
      else {
        printViewWindow.document.close();
        printViewWindow.focus();
        printViewWindow.print();
        printViewWindow.close();
      }
}