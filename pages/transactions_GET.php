<?php
// Include your database connection
require './config/db.php';

// CORS settings to allow all origins (you can customize this for specific domains)
header('Access-Control-Allow-Origin: *'); // Allow requests from all origins
header('Content-Type: application/json'); // Set the content type to JSON

// Database connection
$pdo = require './config/db.php';

// Handle preflight request (for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Preflight request: return 200 response
    http_response_code(200);
    exit;
}

// Fetch transactions and user details (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Check if user_id is provided in the request
    if (isset($_GET['user_id']) && !empty($_GET['user_id'])) {
        $user_id = $_GET['user_id'];

        try {
            // First, fetch the user details based on user_id
            $userStmt = $pdo->prepare("
                SELECT user_name, email, email_verified, payout_wallet, premium_level, rainmaker_level, total_withdrawn
                FROM users
                WHERE id = :user_id
            ");
            $userStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
            $userStmt->execute();
            $user_details = $userStmt->fetch(PDO::FETCH_ASSOC);

            // Check if user exists
            if ($user_details) {
                // Now fetch the transactions for the given user_id
                $stmt = $pdo->prepare("
                    SELECT id, user_id, amount, trx_hash, type, description, created_at
                    FROM transactions
                    WHERE user_id = :user_id
                    ORDER BY created_at DESC
                ");
                $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
                $stmt->execute();
                $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

                // Return both user details and transactions
                echo json_encode([
                    'user_details' => $user_details,
                    'transactions' => $transactions
                ]);
            } else {
                // User not found
                http_response_code(404);
                echo json_encode(['error' => 'User not found.']);
            }
        } catch (Exception $e) {
            // Catch any errors (e.g., database errors)
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch user details and transactions: ' . $e->getMessage()]);
        }
    } else {
        try {
            // Fetch all transactions if no user_id is provided
            $stmt = $pdo->prepare("
                SELECT t.id, t.user_id, t.amount, t.trx_hash, t.type, t.description, t.created_at, u.user_name
                FROM transactions t
                LEFT JOIN users u ON t.user_id = u.id
                ORDER BY t.created_at DESC
            ");
            $stmt->execute();
            $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Return all transactions
            echo json_encode([
                'transactions' => $transactions
            ]);
        } catch (Exception $e) {
            // Catch any errors (e.g., database errors)
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch transactions: ' . $e->getMessage()]);
        }
    }
} else {
    // If the method is not GET, return a 405 Method Not Allowed response
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
