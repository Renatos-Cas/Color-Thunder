<?php
require_once 'db-connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] === 'edit') {
    $id = $_POST['id'];
    $newName = $_POST['new_name'];
    $newHexValue = $_POST['new_hex_value'];
    
    if (!empty($id) && !empty($newName) && !empty($newHexValue)) {
        if (editColor($conn, $id, $newName, $newHexValue)) {
            header("Location: color-selection.php");
            exit();
        } else {
            echo "Error editing color.";
        }
    } else {
        echo "Please fill in all fields.";
    }
    exit();
}
?>
