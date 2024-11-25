<?php
$host = 'localhost';
$dbname = 'sempolsdatabase';
$username = 'root';
$password = '';

try {
    // Buat koneksi ke MySQL menggunakan PDO
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    // Atur PDO ke mode error exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Jika koneksi gagal, tampilkan pesan error
    die(json_encode(array("error" => "Connection failed: " . $e->getMessage())));
}
