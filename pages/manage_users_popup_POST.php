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

// Update user details (POST request)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if all necessary data is provided
    if (isset($_POST['user_id'], $_POST['password'], $_POST['payout_wallet'])) {
        $user_id = $_POST['user_id'];
        $password = $_POST['password'];
        $payout_wallet = $_POST['payout_wallet'];

        try {
            // Prepare the query to update the user details (password and payout_wallet only)
            $stmt = $pdo->prepare("
                UPDATE users 
                SET password = :password, payout_wallet = :payout_wallet
                WHERE id = :user_id
            ");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->bindParam(':password', $password, PDO::PARAM_STR);
            $stmt->bindParam(':payout_wallet', $payout_wallet, PDO::PARAM_STR);
            $stmt->execute();

            // Check if any rows were affected (meaning the update was successful)
            if ($stmt->rowCount() > 0) {
                echo json_encode(['message' => 'User details updated successfully.']);
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'User not found or no changes made.']);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update user details: ' . $e->getMessage()]);
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
