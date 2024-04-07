<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Color Coordination</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <h1>~Color Coordination Generator~</h1>
    <?php include './header.html'; ?>
</header>
<main>
    <div class="container">
        <div class="formContainer">
            <form id="coordinationForm">
                <div class="form-group">
                    <label for="numRowsAndCols">Number of rows and columns:</label>
                    <input id="numRowsAndCols" placeholder="Enter number of rows and columns" type="number" min="1" max="26" required>
                </div>
                <div class="form-group">
                    <label for="numColors">Number of colors:</label>
                    <input id="numColors" placeholder="Enter number of colors." type="number" min="1" max="10" required>
                </div>
                <input type="submit" value="Submit">
            </form>
        </div>
        <div id="tableContainerUpper"></div>
        <div id="tableContainerLower"></div>
        <input type="button" id="printViewButton" value="Print View">
    </div>
</main>
    <script src="./src/javascript/color-coordination.js"></script>
    <footer>
        <?php include './footer.html'; ?>
    </footer>
</body>
</html>