<?php
// Include your database connection
require './config/db.php';

// CORS settings
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Database connection
$pdo = require './config/db.php';

// Handle preflight request (for CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Fetch withdrawals (GET request)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Query to fetch withdrawals from the transactions table
        $stmt = $pdo->prepare("
            SELECT t.id, u.user_name AS username, u.wallet_address AS wallet, t.created_at AS date, 
                   t.trx_hash AS hash, t.amount, t.txn_type AS type
            FROM transactions t
            JOIN users u ON t.user_id = u.id
            WHERE t.txn_type = 'withdrawal'
            ORDER BY t.created_at DESC
        ");
        
        $stmt->execute();
        $withdrawals = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return withdrawals data
        echo json_encode(['withdrawals' => $withdrawals]);
    } catch (Exception $e) {
        // Error handling
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch withdrawals: ' . $e->getMessage()]);
    }
} else {
    // If the method is not GET, return a 405 Method Not Allowed response
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>
