<?php
    if (isset($_POST['id']) && is_numeric($_POST['id'])) {
        $colorId = $_POST['id'];
        $result = deleteColorById($conn, $colorId);
        if ($result) {
            echo "Color deleted successfully.";
        } else {
            echo "Error deleting color.";
        }
    } else {
        echo "Invalid color ID.";
    }
?>
