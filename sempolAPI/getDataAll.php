<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'connection.php'; // Menggunakan file connection.php yang telah menggunakan PDO

try {
    // Query untuk mendapatkan data dari tabel users
    $sql = "SELECT * FROM users";

    // Persiapkan dan eksekusi query menggunakan PDO
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Mengambil hasil query
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Cek apakah ada data yang diambil
    if ($users) {
        // Mengembalikan data dalam format JSON
        echo json_encode(array("success" => true, "data" => $users));
    } else {
        // Jika tidak ada data, kirimkan respons bahwa tidak ada data
        echo json_encode(array("success" => false, "message" => "Tidak ada data dalam tabel 'users'."));
    }
} catch (PDOException $e) {
    // Jika terjadi error saat menjalankan query, kembalikan pesan error
    echo json_encode(array("success" => false, "message" => "Error dalam menjalankan query: " . $e->getMessage()));
}

// Tidak perlu menutup koneksi secara manual, karena PDO akan otomatis menutupnya saat script selesai
