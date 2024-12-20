<?php
// Include your database connection
require './config/db.php';

// CORS settings to allow all origins (you can customize this for specific domains)
header('Access-Control-Allow-Origin: *'); // Allow requests from all origins
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Allow these HTTP methods
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

// Fetch all users (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Prepare and execute the query to fetch users
        $stmt = $pdo->prepare("SELECT id, user_name, email, created_at FROM users ORDER BY created_at DESC");
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the users as a JSON response
        echo json_encode(['users' => $users]);
    } catch (Exception $e) {
        // In case of an error, send a 500 response with the error message
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch users: ' . $e->getMessage()]);
    }
} else {
    // If the method is not GET, return a 405 Method Not Allowed response
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
