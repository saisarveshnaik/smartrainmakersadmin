<?php
// helpsupport_GET.php
// CORS settings to allow all origins (you can customize this for specific domains)
header('Access-Control-Allow-Origin: *'); // Allow requests from all origins
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE'); // Allow these HTTP methods
header('Access-Control-Allow-Headers: Content-Type, Authorization'); // Allow specific headers
header('Content-Type: application/json'); // Set the content type to JSON

// Include database connection
include('./config/db.php'); // Make sure to include your actual database connection file

// Initialize response array
$response = array();

try {
    // Use the PDO connection ($pdo) from db_connection.php
    global $pdo;

    // Prepare the query to fetch all records from the help_and_support table
    $query = "SELECT id, user_name, direct_team, message FROM help_and_support";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    // Fetch all records
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // If data is found, return success and records
    if ($rows) {
        $response['status'] = 'success';
        $response['data'] = $rows;
    } else {
        // Handle case where no data is found
        $response['status'] = 'error';
        $response['message'] = 'No support records found';
    }
} catch (PDOException $e) {
    // Handle any errors during the database interaction
    $response['status'] = 'error';
    $response['message'] = $e->getMessage();
}

// Output the response as JSON
echo json_encode($response);
?>
