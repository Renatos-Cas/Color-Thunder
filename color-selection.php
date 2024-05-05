<?php
require_once 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    switch ($_POST['action']) {
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
        $colors = fetchColors($conn);
        if (!empty($colors)) {
            echo "<ul>";
            foreach ($colors as $color) {
                echo "<li>" . $color['colorName'] . "
                    <form method='POST' action='".$_SERVER['PHP_SELF']."' class='edit-form'>
                        <input type='hidden' name='id' value='".$color['id']."'>
                        <input type='hidden' name='action' value='edit'>
                        <input type='submit' value='Edit'>
                    </form>
                    <div class='edit-color-form'>
                        <form method='POST' action='edit-color.php' style='display: none;'>
                            <input type='hidden' name='id' value='".$color['id']."'>
                            <input type='hidden' name='action' value='edit'>
                            New Name: <input type='text' name='new_name' required><br>
                            New Hex Value: <input type='text' name='new_hex_value' required><br>
                            <input type='submit' value='Save Changes'>
                        </form>
                    </div>
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
<script>
    // JavaScript to toggle display of edit color form
    const editForms = document.querySelectorAll('.edit-form');
    editForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const editColorForm = form.nextElementSibling.querySelector('form');
            editColorForm.style.display = 'block';
            this.style.display = 'none';
        });
    });
</script>
</body>
</html>
