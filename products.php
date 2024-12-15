<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database connection
$servername = "localhost";
$username = "Jasim";
$password = "Itsabitweak";
$database = "product_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    die(json_encode(["error" => htmlspecialchars("Connection failed: ") . $conn->connect_error]));
}

// Fetch data
$sql = "SELECT name, price, itemCode, img FROM products";
$result = $conn->query($sql);

// Check for SQL errors
if (!$result) {
    http_response_code(500); // Internal Server Error
    die(json_encode(["error" => "SQL error: " . $conn->error]));
}

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
} else {
    http_response_code(404); // Not Found
    echo json_encode(["message" => "No products found"]);
    exit;
}

// Close connection
$conn->close();

// Return data as JSON
http_response_code(200); // OK
echo json_encode($products);

