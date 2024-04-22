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
    <h1>~Color Selection~</h1>
    <?php include './header.html'; ?>
</header>



<main class="selection-interfaces">
    <?php
        include ".db-login.php";

        $conn = new mysqli($servername, $username, $password, $db);
        if ($conn->connect_error) {
            echo "<p>Bad connection</p>";
        } else {
            echo "<p>Successfully connected to database.</p>";
        }

        $sql = "CREATE TABLE colors (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            colorName VARCHAR(30) UNIQUE NOT NULL,
            hexValue VARCHAR(30) UNIQUE NOT NULL
            )";

        if ($conn->query($sql) === TRUE) {
            echo "Table colors created successfully\n";
        } else {
            echo "Error creating table: " . $conn->error;
        }

        $sql = "INSERT INTO colors (colorName, hexValue)
        VALUES ('green', '00FF00')";

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully\n";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $sql = "SELECT * FROM colors";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "<br>id: " . $row["id"]. " - Name: " . $row["colorName"]. " - Hex Value: " . $row["hexValue"]. "<br>";
            }
        } else {
            echo "0 results";
        }

        $sql = "DROP TABLE colors";

        if ($conn->query($sql) === TRUE) {
            echo "Table deleted successfully\n";
        } else {
            echo "Error deleting table: " . $conn->error;
        }

        $conn->close();
    ?> 

    <div class="add-color">
        <p>add color exists!</p>
    </div>
    <div class="edit-color">
        <p>edit color exists!</p>
    </div>
    <div class="delete-color">
        <p>delete color exists!</p>
    </div>
</main>

<script src="./src/javascript/color-selection.js"></script>
<footer>
    <?php include './footer.html'; ?>
</footer>
</body>
</html>