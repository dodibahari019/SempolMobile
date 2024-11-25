<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'connection.php'; // Menggunakan file connection.php yang telah menggunakan PDO

try {
    // Mendapatkan data dari request JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Ambil semua data yang diperlukan dari JSON
    $tanggal = isset($data['tanggal']) ? $data['tanggal'] : '';

    // STOCK AWAL
    $stockAwalO = isset($data['stockAwalO']) ? $data['stockAwalO'] : 0;
    $stockAwalJ = isset($data['stockAwalJ']) ? $data['stockAwalJ'] : 0;
    $stockAwalH = isset($data['stockAwalH']) ? $data['stockAwalH'] : 0;
    $stockAwalMP = isset($data['stockAwalMP']) ? $data['stockAwalMP'] : 0;
    $stockAwalK = isset($data['stockAwalK']) ? $data['stockAwalK'] : 0;

    // STOCK AKHIR
    $stockAkhirO = isset($data['stockAkhirO']) ? $data['stockAkhirO'] : 0;
    $stockAkhirJ = isset($data['stockAkhirJ']) ? $data['stockAkhirJ'] : 0;
    $stockAkhirH = isset($data['stockAkhirH']) ? $data['stockAkhirH'] : 0;
    $stockAkhirMP = isset($data['stockAkhirMP']) ? $data['stockAkhirMP'] : 0;
    $stockAkhirK = isset($data['stockAkhirK']) ? $data['stockAkhirK'] : 0;

    // STOCK KELEBIHAN
    $stockKelebihanO = isset($data['stockKelebihanO']) ? $data['stockKelebihanO'] : 0;
    $stockKelebihanJ = isset($data['stockKelebihanJ']) ? $data['stockKelebihanJ'] : 0;
    $stockKelebihanH = isset($data['stockKelebihanH']) ? $data['stockKelebihanH'] : 0;
    $stockKelebihanMP = isset($data['stockKelebihanMP']) ? $data['stockKelebihanMP'] : 0;
    $stockKelebihanK = isset($data['stockKelebihanK']) ? $data['stockKelebihanK'] : 0;

    // STOCK KEKURANGAN
    $stockKekuranganO = isset($data['stockKekuranganO']) ? $data['stockKekuranganO'] : 0;
    $stockKekuranganJ = isset($data['stockKekuranganJ']) ? $data['stockKekuranganJ'] : 0;
    $stockKekuranganH = isset($data['stockKekuranganH']) ? $data['stockKekuranganH'] : 0;
    $stockKekuranganMP = isset($data['stockKekuranganMP']) ? $data['stockKekuranganMP'] : 0;
    $stockKekuranganK = isset($data['stockKekuranganK']) ? $data['stockKekuranganK'] : 0;

    // PRODUCT GAGAL
    $qtyBSO = isset($data['qtyBSO']) ? $data['qtyBSO'] : 0;
    $qtyBSJ = isset($data['qtyBSJ']) ? $data['qtyBSJ'] : 0;
    $qtyBSH = isset($data['qtyBSH']) ? $data['qtyBSH'] : 0;
    $qtyBSMP = isset($data['qtyBSMP']) ? $data['qtyBSMP'] : 0;
    $qtyBSK = isset($data['qtyBSK']) ? $data['qtyBSK'] : 0;

    // QTY BONUS PELANGGAN
    $qtyBonusO = isset($data['qtyBonusO']) ? $data['qtyBonusO'] : 0;
    $qtyBonusJ = isset($data['qtyBonusJ']) ? $data['qtyBonusJ'] : 0;
    $qtyBonusH = isset($data['qtyBonusH']) ? $data['qtyBonusH'] : 0;
    $qtyBonusMP = isset($data['qtyBonusMP']) ? $data['qtyBonusMP'] : 0;
    $qtyBonusK = isset($data['qtyBonusK']) ? $data['qtyBonusK'] : 0;

    // OPERASIONAL
    $bagiHasil = isset($data['bagiHasil']) ? $data['bagiHasil'] : 0;
    $makan = isset($data['makan']) ? $data['makan'] : 0;
    $bensin = isset($data['bensin']) ? $data['bensin'] : 0;
    $jumatBerkah = isset($data['jumatBerkah']) ? $data['jumatBerkah'] : 0;
    $tissue = isset($data['tissue']) ? $data['tissue'] : 0;
    $gas = isset($data['gas']) ? $data['gas'] : 0;
    $kresek10 = isset($data['kresek10']) ? $data['kresek10'] : 0;
    $kresek15 = isset($data['kresek15']) ? $data['kresek15'] : 0;
    $minyakGoreng = isset($data['minyakGoreng']) ? $data['minyakGoreng'] : 0;
    $telor1kg = isset($data['telor1kg']) ? $data['telor1kg'] : 0;
    $plastikSempol = isset($data['plastikSempol']) ? $data['plastikSempol'] : 0;
    $kasbon = isset($data['kasbon']) ? $data['kasbon'] : 0;
    $roico = isset($data['roico']) ? $data['roico'] : 0;
    $spon = isset($data['spon']) ? $data['spon'] : 0;
    $sunlight = isset($data['sunlight']) ? $data['sunlight'] : 0;
    $bonusHabis = isset($data['bonusHabis']) ? $data['bonusHabis'] : 0;
    $kebersihan = isset($data['kebersihan']) ? $data['kebersihan'] : 0;
    $kelabang = isset($data['kelabang']) ? $data['kelabang'] : 0;
    $takjil = isset($data['takjil']) ? $data['takjil'] : 0;

    // GOFOOD
    $rpGofood = isset($data['rpGofood']) ? $data['rpGofood'] : 0;

    // OTHER OPERASIONAL
    $freeCengek = isset($data['freeCengek']) ? $data['freeCengek'] : '';
    $cengek = isset($data['cengek']) ? $data['cengek'] : '';
    $stokAwalTelor = isset($data['stokAwalTelor']) ? $data['stokAwalTelor'] : '';
    $stokAkhirTelor = isset($data['stokAkhirTelor']) ? $data['stokAkhirTelor'] : '';
    $stokAwalSaos = isset($data['stokAwalSaos']) ? $data['stokAwalSaos'] : '';
    $stokAkhirSaos = isset($data['stokAkhirSaos']) ? $data['stokAkhirSaos'] : '';
    $btAyamBawang = isset($data['btAyamBawang']) ? $data['btAyamBawang'] : '';
    $btBalado = isset($data['btBalado']) ? $data['btBalado'] : '';
    $btKeju = isset($data['btKeju']) ? $data['btKeju'] : '';
    $cengekAbah = isset($data['cengekAbah']) ? $data['cengekAbah'] : '';
    $minyakBawang = isset($data['minyakBawang']) ? $data['minyakBawang'] : '';
    $plastik1530 = isset($data['plastik1530']) ? $data['plastik1530'] : '';
    $plastik1225 = isset($data['plastik1225']) ? $data['plastik1225'] : '';
    $plastikSaos = isset($data['plastikSaos']) ? $data['plastikSaos'] : '';

    // Siapkan query untuk menyimpan data ke database
    $sql = "CALL spTransaksi('INSERT', 'Gintara021', 
            '', :tanggal, 0, 0, 0, 
            '', :stockAwalO, :stockAkhirO, :stockKelebihanO, :stockKekuranganO, 0, :qtyBSO, :qtyBonusO, 
            '', :stockAwalJ, :stockAkhirJ, :stockKelebihanJ, :stockKekuranganJ, 0, :qtyBSJ, :qtyBonusJ,  
            '', :stockAwalH, :stockAkhirH, :stockKelebihanH, :stockKekuranganH, 0, :qtyBSH, :qtyBonusH, 
            '', :stockAwalMP, :stockAkhirMP, :stockKelebihanMP, :stockKekuranganMP, 0, :qtyBSMP, :qtyBonusMP, 
            '', :stockAwalK, :stockAkhirK, :stockKelebihanK, :stockKekuranganK, 0, :qtyBSK, :qtyBonusK, 
            '', :bagiHasil, :makan, :bensin, :bagiHasil, :tissue, :gas, :kresek10, :kresek15, :minyakGoreng, :telor1kg, :plastikSempol, :kasbon, :roico, :spon, :sunlight, :bonusHabis, :kebersihan, :kelabang, :takjil, 0, 
            '', 'PENDAPATAN GOFOOD', :rpGofood, 
            '', :freeCengek, :cengek, :stokAwalTelor, :stokAkhirTelor, :stokAwalSaos, :stokAkhirSaos, :btAyamBawang, :btBalado, :btKeju, :cengekAbah, :minyakBawang, :plastik1530, :plastik1225, :plastikSaos)";
    // Siapkan statement
    $stmt = $conn->prepare($sql);

    // Ikat parameter
    $stmt->bindParam(':tanggal', $tanggal);
    $stmt->bindParam(':stockAwalO', $stockAwalO);
    $stmt->bindParam(':stockAwalJ', $stockAwalJ);
    $stmt->bindParam(':stockAwalH', $stockAwalH);
    $stmt->bindParam(':stockAwalMP', $stockAwalMP);
    $stmt->bindParam(':stockAwalK', $stockAwalK);

    $stmt->bindParam(':stockAkhirO', $stockAkhirO);
    $stmt->bindParam(':stockAkhirJ', $stockAkhirJ);
    $stmt->bindParam(':stockAkhirH', $stockAkhirH);
    $stmt->bindParam(':stockAkhirMP', $stockAkhirMP);
    $stmt->bindParam(':stockAkhirK', $stockAkhirK);

    $stmt->bindParam(':stockKelebihanO', $stockKelebihanO);
    $stmt->bindParam(':stockKelebihanJ', $stockKelebihanJ);
    $stmt->bindParam(':stockKelebihanH', $stockKelebihanH);
    $stmt->bindParam(':stockKelebihanMP', $stockKelebihanMP);
    $stmt->bindParam(':stockKelebihanK', $stockKelebihanK);

    $stmt->bindParam(':stockKekuranganO', $stockKekuranganO);
    $stmt->bindParam(':stockKekuranganJ', $stockKekuranganJ);
    $stmt->bindParam(':stockKekuranganH', $stockKekuranganH);
    $stmt->bindParam(':stockKekuranganMP', $stockKekuranganMP);
    $stmt->bindParam(':stockKekuranganK', $stockKekuranganK);

    $stmt->bindParam(':qtyBSO', $qtyBSO);
    $stmt->bindParam(':qtyBSJ', $qtyBSJ);
    $stmt->bindParam(':qtyBSH', $qtyBSH);
    $stmt->bindParam(':qtyBSMP', $qtyBSMP);
    $stmt->bindParam(':qtyBSK', $qtyBSK);

    $stmt->bindParam(':qtyBonusO', $qtyBonusO);
    $stmt->bindParam(':qtyBonusJ', $qtyBonusJ);
    $stmt->bindParam(':qtyBonusH', $qtyBonusH);
    $stmt->bindParam(':qtyBonusMP', $qtyBonusMP);
    $stmt->bindParam(':qtyBonusK', $qtyBonusK);

    $stmt->bindParam(':bagiHasil', $bagiHasil);
    $stmt->bindParam(':makan', $makan);
    $stmt->bindParam(':bensin', $bensin);
    $stmt->bindParam(':jumatBerkah', $jumatBerkah);
    $stmt->bindParam(':tissue', $tissue);
    $stmt->bindParam(':gas', $gas);
    $stmt->bindParam(':kresek10', $kresek10);
    $stmt->bindParam(':kresek15', $kresek15);
    $stmt->bindParam(':minyakGoreng', $minyakGoreng);
    $stmt->bindParam(':telor1kg', $telor1kg);
    $stmt->bindParam(':plastikSempol', $plastikSempol);
    $stmt->bindParam(':kasbon', $kasbon);
    $stmt->bindParam(':roico', $roico);
    $stmt->bindParam(':spon', $spon);
    $stmt->bindParam(':sunlight', $sunlight);
    $stmt->bindParam(':bonusHabis', $bonusHabis);
    $stmt->bindParam(':kebersihan', $kebersihan);
    $stmt->bindParam(':kelabang', $kelabang);
    $stmt->bindParam(':takjil', $takjil);
    
    $stmt->bindParam(':rpGofood', $rpGofood);
    
    $stmt->bindParam(':freeCengek', $freeCengek);
    $stmt->bindParam(':cengek', $cengek);
    $stmt->bindParam(':stokAwalTelor', $stokAwalTelor);
    $stmt->bindParam(':stokAkhirTelor', $stokAkhirTelor);
    $stmt->bindParam(':stokAwalSaos', $stokAwalSaos);
    $stmt->bindParam(':stokAkhirSaos', $stokAkhirSaos);
    $stmt->bindParam(':btAyamBawang', $btAyamBawang);
    $stmt->bindParam(':btBalado', $btBalado);
    $stmt->bindParam(':btKeju', $btKeju);
    $stmt->bindParam(':cengekAbah', $cengekAbah);
    $stmt->bindParam(':minyakBawang', $minyakBawang);
    $stmt->bindParam(':plastik1530', $plastik1530);
    $stmt->bindParam(':plastik1225', $plastik1225);
    $stmt->bindParam(':plastikSaos', $plastikSaos);
    
    // Eksekusi statement
    if ($stmt->execute()) {
        echo json_encode(["message" => "Data berhasil disimpan."]);
    } else {
        echo json_encode(["message" => "Terjadi kesalahan saat menyimpan data.", "error" => $stmt->errorInfo()]);
    }
} catch (PDOException $e) {
    echo json_encode(["message" => "Terjadi kesalahan pada koneksi database.", "error" => $e->getMessage()]);
}
