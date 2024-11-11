<?php
// Include your database connection
require './config/db.php';

// CORS settings
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST'); // Allow both GET and POST methods
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Database connection
$pdo = require './config/db.php';

// Handle preflight request (for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Fetch user details (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];

        try {
            // Query to fetch user details based on the user ID
            $stmt = $pdo->prepare("
                SELECT user_name, password, payout_wallet
                FROM users 
                WHERE id = :user_id
            ");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch the user details
            $user_details = $stmt->fetch(PDO::FETCH_ASSOC);

            // Check if user exists
            if ($user_details) {
                echo json_encode(['user_details' => $user_details]);
            } else {
                // User not found
                http_response_code(404);
                echo json_encode(['error' => 'User not found.']);
            }
        } catch (Exception $e) {
            // Error fetching user details
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch user details: ' . $e->getMessage()]);
        }
    } else {
        // Missing user_id in the request
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request: Missing user ID.']);
    }
} else {
    // Method not allowed
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
