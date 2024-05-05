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

$colors = fetchColors($conn);
header('Content-Type: application/json');
echo json_encode($colors);
?>
