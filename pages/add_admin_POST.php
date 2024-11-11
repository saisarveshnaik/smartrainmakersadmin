<?php
// Include your database connection
require './config/db.php';

// CORS settings
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Database connection
$pdo = require './config/db.php';

// Handle preflight request (for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Add new admin (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all necessary data is provided via form data (POST)
    if (isset($_POST['name'], $_POST['email'], $_POST['password'], $_POST['confirm_password'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        // Validate if password and confirm_password match
        if ($password !== $confirm_password) {
            http_response_code(400);
            echo json_encode(['error' => 'Password and Confirm Password do not match.']);
            exit;
        }

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        try {
            // Check if admin already exists with the given email
            $stmt = $pdo->prepare("SELECT id FROM admin WHERE email = :email");
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                // Email already exists
                http_response_code(409);
                echo json_encode(['error' => 'An admin with this email already exists.']);
                exit;
            }

            // Prepare the query to insert the new admin without date_added
            $stmt = $pdo->prepare("
                INSERT INTO admin (name, email, password) 
                VALUES (:name, :email, :password)
            ");
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':email', $email, PDO::PARAM_STR);
            $stmt->bindParam(':password', $hashed_password, PDO::PARAM_STR);
            $stmt->execute();

            // Check if the insertion was successful
            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'Admin added successfully.']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to add admin.']);
            }
        } catch (Exception $e) {
            // Error handling
            http_response_code(500);
            echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request: Missing required fields.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
