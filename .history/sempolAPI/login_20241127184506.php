<?php
// Nonaktifkan error reporting
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Sertakan file koneksi
include 'connection.php';

// Ambil data JSON dari permintaan
$data = json_decode(file_get_contents("php://input"), true);

// Validasi input
if (!$data || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid request"]);
    exit;
}

$email = $data['email'];
$password = $data['password'];

try {
    // Query untuk memeriksa kredensial
    $sql = "SELECT userid, password FROM users WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        // Verifikasi password
        if (password_verify($password, $user['password'])) {
            $token = base64_encode(random_bytes(32)); // Token sederhana (gunakan JWT untuk produksi)
            http_response_code(200);
            echo json_encode(["message" => "Login successful", "token" => $token]);
        } else {
            http_response_code(401);
            echo json_encode(["message" => "Invalid credentials"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
} catch (PDOException $e) {
    // Jangan tampilkan error detail ke klien
    http_response_code(500);
    echo json_encode(["message" => "An error occurred while processing the request"]);
}
?>
