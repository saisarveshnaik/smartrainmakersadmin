<?php
// Include your database connection
require './config/db.php';

// CORS settings to allow all origins (you can customize this for specific domains)
header('Access-Control-Allow-Origin: *'); // Allow requests from all origins
header('Access-Control-Allow-Methods: GET'); // Only allow GET method for this endpoint
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Set the content type to JSON

// Database connection
$pdo = require './config/db.php';

// Handle preflight request (for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight request: return 200 response
    http_response_code(200);
    exit;
}

// Fetch details for a specific user (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];

        try {
            // Prepare and execute the query to fetch user details based on user ID
            $stmt = $pdo->prepare("
                SELECT user_name, email, email_verified, payout_wallet, premium_level, rainmaker_level, total_withdrawn 
                FROM users 
                WHERE id = :user_id
            ");
            $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $stmt->execute();

            // Fetch user details
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
            // Catch any errors (e.g., database errors)
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch user details: ' . $e->getMessage()]);
        }
    } else {
        // Missing user_id parameter
        http_response_code(400);
        echo json_encode(['error' => 'Invalid request: Missing user ID.']);
    }
} else {
    // If the method is not GET, return a 405 Method Not Allowed response
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
