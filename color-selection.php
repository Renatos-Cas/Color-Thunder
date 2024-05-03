<?php
require_once 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    $action = $_POST['action'];

    switch ($action) {
        case 'add':
            require_once 'add-color.php';
            break;
        case 'edit':
            require_once 'edit-color.php';
            break;
        case 'delete':
            require_once 'delete-color.php';
            break;
        default:
            break;
    }
}
$colors = fetchColors($conn);
?>

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
    <?php include './add-color.php'; ?>

    <?php
    if (!empty($colors)) {
        echo "<ul>";
        foreach ($colors as $color) {
            echo "<li>" . $color['colorName'] . "
              <form method='POST' action='".$_SERVER['PHP_SELF']."'>
                  <input type='hidden' name='id' value='".$color['id']."'>
                  <input type='hidden' name='action' value='delete'>
                  <input type='submit' value='Delete'>
              </form>
              </li>";
        }
        echo "</ul>";
    } else {
        echo "No colors found.";
    }
    ?>
</main>

<footer>
    <?php include './footer.html'; ?>
</footer>
</body>
</html>
