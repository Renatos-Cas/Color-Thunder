<?php
    require_once 'db-connect.php';

    if (isset($_POST['color-name']) && isset($_POST['color'])) {
        $colorName = $_POST['color-name'];
        $hexValue = $_POST['color'];  // Capture the value from the color picker
        $sql = "INSERT INTO colors (colorName, hexValue) VALUES ('$colorName', '$hexValue')";

        if ($conn->query($sql) === TRUE) {
            header("Location: color-selection.php");
            exit();
        } else {
            echo "<p>Error: " . $conn->error . "</p>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Color</title>
</head>
<body>
    <div class="add-color">
        <p>Add a new color:</p>
        <form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <label for="color-name">Color Name:</label><br>
            <input type="text" id="color-name" name="color-name" maxlength="10"><br>
            <label for="color">Color:</label><br>
            <input type="color" id="color" name="color" value="#ffffff"><br>  <!-- Color picker field -->
            <input type="submit" value="Submit">
        </form>
    </div>
</body>
</html>
