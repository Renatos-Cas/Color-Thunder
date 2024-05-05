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
        require_once 'db-connect.php';
        $colors = fetchColors($conn);
        if (!empty($colors)) {
            echo "<ul>";
            foreach ($colors as $color) {
                echo "<li>" . $color['colorName'] . "
                    <form method='POST' action='edit-color.php'>
                        <input type='submit' value='Edit' class='edit-button'>
                    </form>
                    <form method='POST' action='".$_SERVER['PHP_SELF']."'>
                        <input type='hidden' name='id' value='".$color['id']."'>
                        <input type='hidden' name='action' value='delete'>
                        <input type='submit' value='Delete'>
                    </form>
                    <div class='edit-color-form' style='display: none;'>
                        <form method='POST' action='edit-color.php'>
                            <input type='hidden' name='id' value='".$color['id']."'>
                            <input type='hidden' name='action' value='edit'>
                            New Name: <input type='text' name='new_name' required><br>
                            New Hex Value: <input type='text' name='new_hex_value' required><br>
                            <input type='submit' value='Save Changes'>
                            <button type='button' class='cancel'>Cancel</button>
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
        document.addEventListener("DOMContentLoaded", () => {
            const editButtons = document.querySelectorAll('.edit-button');
            const editForms = document.querySelectorAll('.edit-color-form');

            editButtons.forEach((button, index) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const currentEditForm = editForms[index];
                    const currentButton = event.target;
                    currentButton.style.display = 'none';
                    currentEditForm.style.display = 'block';
                });
            });

            editForms.forEach((form, index) => {
                const cancelButton = form.querySelector('.cancel');

                cancelButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    const currentEditButton = editButtons[index];
                    const currentEditForm = editForms[index];
                    currentEditForm.style.display = 'none';
                    currentEditButton.style.display = 'inline-block';
                });
            });
        });
    </script>
</body>
</html>
