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
        <div class="header-top">
            <div class="header-title">~Color Thunder~</div>
            <img src="src/logo.png" alt="Logo" class="logo">
        </div>
        <nav class="header-nav">
            <a href="home.html">Homepage</a>
            <a href = "color-coordination.html">Color Coordinate Generation</a> <!--!color cordinate generation tab-->
            <a class="active" href="about.html">About</a> <!--about tab-->
        </nav>
    </header>
    <main>
        <form id="coordinationForm">
            <label for="numRowsAndCols">Number of rows and columns:</label>
            <input id="numRowsAndCols" placeholder="Enter number of rows and columns" type="number" min="1" max="26" required>
            <label for="numColors">Number of colors:</label>
            <input id="numColors" placeholder="Enter number of colors." type="number" min="1" max="10" required>
            <button type="submit">Enter</button>
        </form>
        <div id="tableContainer1"></div>
        <div id="tableContainer2"></div>
    </main>
    <script src="./src/javascript/color-coordination.js"></script>
    <footer>
        <p>&copy; Made by CS312 Students.</p>
    </footer>
</body>
</html>