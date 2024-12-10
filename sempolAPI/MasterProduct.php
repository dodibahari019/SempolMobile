<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'connection.php'; // Menggunakan PDO dari file connection.php

try {
    // Query untuk mengambil data dari tabel products
    $sql = "SELECT productId, productsName, productsPrice FROM products";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Ambil semua data sebagai array asosiatif
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Kirim data dalam format JSON
    echo json_encode($products);
} catch (PDOException $e) {
    // Jika terjadi error, kirim pesan error
    echo json_encode(["error" => $e->getMessage()]);
}
