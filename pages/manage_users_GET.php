<?php
// Include your database connection
require './config/db.php';

// CORS settings
header('Access-Control-Allow-Origin: *'); // Allow requests from all origins
header('Access-Control-Allow-Methods: GET'); // Only allow GET method for this endpoint
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Set the content type to JSON

// Database connection
$pdo = require './config/db.php';

// Handle preflight request (for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Fetch all users (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // SQL query to fetch users, including the necessary fields
        $stmt = $pdo->prepare("
            SELECT id, user_name, email, email_verified, payout_wallet, premium_level, rainmaker_level, total_withdrawn, created_at
            FROM users
            ORDER BY created_at DESC
        ");
        $stmt->execute();

        // Fetch all users
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Check if users exist
        if ($users) {
            // Return user data as a JSON response
            echo json_encode(['users' => $users]);
        } else {
            // No users found
            http_response_code(404);
            echo json_encode(['error' => 'No users found.']);
        }
    } catch (Exception $e) {
        // Handle any database errors
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch users: ' . $e->getMessage()]);
    }
} else {
    // If the method is not GET, return a 405 Method Not Allowed response
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
