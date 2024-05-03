<?php
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action']) && $_POST['action'] === 'delete') {
    $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
    
    if ($id) {
        $sql = $conn->prepare("DELETE FROM colors WHERE id = ?");
        $sql->bind_param("i", $id);
        
        if ($sql->execute()) {
            header("Location: color-selection.php");
            exit();
        } else {
            echo "Error deleting color.";
        }
    } else {
        echo "Invalid color ID.";
    }
} else {
    echo "Invalid request.";
}
?>
