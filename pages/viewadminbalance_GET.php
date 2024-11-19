<?php
// viewadminbalance_GET.php
// CORS settings to allow all origins (you can customize this for specific domains)
header('Access-Control-Allow-Origin: *'); // Allow requests from all origins
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Allow these HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Set the content type to JSON

// Include database connection
include('./config/db.php'); // Use your actual database connection file

// Initialize response array
$response = array();

try {
    // Use the PDO connection ($pdo) from db_connection.php
    global $pdo;

    // Prepare the query to fetch the sum of rainmaker_reserves_wallet from users table
    $query = "SELECT SUM(rainmaker_reserves_wallet) AS total_balance FROM users";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // Fetch the result
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // If data is found, return success and balance
    if ($row) {
        // Format the total balance to two decimal places
        $formatted_balance = number_format($row['total_balance'], 2, '.', '');
        
        $response['status'] = 'success';
        $response['total_balance'] = $formatted_balance; // Send the formatted balance
    } else {
        // Handle case where no data is found
        $response['status'] = 'error';
        $response['message'] = 'No data found';
    }
} catch (PDOException $e) {
    // Handle any errors during the database interaction
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

// Output the response as JSON
echo json_encode($response);

?>
