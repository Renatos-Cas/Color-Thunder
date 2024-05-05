<?php
include ".db-login.php";

$conn = new mysqli($servername, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function fetchColors($conn) {
    $colors = array();
    $sql = "SELECT * FROM colors";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $colors[] = array(
                'id' => $row['id'],
                'colorName' => $row['colorName'],
                'hexValue' => $row['hexValue']
            );
        }
    }
    return $colors;
}

function editColor($conn, $colorId, $newName, $newHexValue) {
    $sql = $conn->prepare("UPDATE colors SET colorName = ?, hexValue = ? WHERE id = ?");
    $sql->bind_param("ssi", $newName, $newHexValue, $colorId);

    if ($sql->execute()) {
        return true;
    } else {
        return false;
    }
}


function deleteColorById($conn, $color_id) {
    $sql = $conn->prepare("DELETE FROM colors WHERE id = ?");
    $sql->bind_param("i", $color_id);

    if ($sql->execute()) {
        return true;
    } else {
        return false;
    }
}
?>
