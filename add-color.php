<?php
    if (isset($_POST['color-name']) && isset($_POST['hex-value'])) {
        $colorName = $_POST['color-name'];
        $hexValue = $_POST['hex-value'];
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
            <label for="hex-value">Hex Value:</label><br>
            <input type="text" id="hex-value" name="hex-value" maxlength="6"><br>
            <input type="submit" value="Submit">
        </form>
    </div>
</body>
</html>