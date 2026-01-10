<!DOCTYPE html>
<html>
<head>
    <title>Data Mahasiswa - Prodi Sistem Informasi</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <!-- Tambahkan logo dengan tag <img> -->
    <img src="logoo.jpeg" alt="Logo Prodi Sistem Informasi" width="100" height="auto">
    <head>
  <style>
    body { background-color: logoo; }
    h1 { color: navy; }
  </style>
</head>

    <h2>DATA MAHASISWA</h2>
    <p>Program Studi Sistem Informasi<br>
       ITS Khatulistiwa – Pasaman Barat</p>

</header>

<nav>
    <a href="index.php">Beranda</a>
    <a href="dosen.php">Dosen</a>
    <a href="mahasiswa.php">Mahasiswa</a>
    <a href="kurikulum.php">Kurikulum</a>
    <a href="materi.php">Materi</a>
    <a href="tugas.php">Upload Tugas</a>
</nav>

<div class="container">

<div class="tab">
    <a href="?angkatan=2022">Angkatan 2022</a>
    <a href="?angkatan=2023">Angkatan 2023</a>
    <a href="?angkatan=2024">Angkatan 2024</a>
    <a href="?angkatan=2025">Angkatan 2025</a>
</div>

<hr>

<?php
$angkatan = $_GET['angkatan'] ?? "2022";

$data = [
    "2022" => [
        ["nama"=>"Juwita", "nim"=>"22722010001", "foto"=>".jpg"],
        ["nama"=>"Neng Ayu Atesya", "nim"=>"22722010002", "foto"=>".jpg"],
        ["nama"=>"Lissa Eka Agustin ", "nim"=>"22722010004", "foto"=>"lisa.jpeg"],
        ["nama"=>"Afriyani", "nim"=>"22722010010", "foto"=>"yani.jpeg"],
        ["nama"=>"Annisa", "nim"=>"22722010011", "foto"=>".jpg"]    
        
    ],
    "2023" => [
        ["nama"=>"Husnil Katimi", "nim"=>"23572010001", "foto"=>".jpg"],
        ["nama"=>"Sucy Mivtahul Riski", "nim"=>"23572010002", "foto"=>".jpg"],
        ["nama"=>"Adib Abyan", "nim"=>"23572010003", "foto"=>".jpg"],
        ["nama"=>"Achika Zenli Putri", "nim"=>"23572010005", "foto"=>".jpg"],
        ["nama"=>"Mila Yudia", "nim"=>"23572010006", "foto"=>".jpg"],
        ["nama"=>"Khaira Rahmah", "nim"=>"23572010007", "foto"=>".jpg"],
        ["nama"=>"Ahmad Idris", "nim"=>"23572010008", "foto"=>".jpg"],
        ["nama"=>"Jody Muzzaki", "nim"=>"23572010009", "foto"=>".jpg"],
        ["nama"=>"Nurhaliza", "nim"=>"23572010010", "foto"=>".jpg"]
        
    ],
    "2024" => [
        ["nama"=>"Risa Yolanda", "nim"=>"24572010001", "foto"=>"risa.jpeg"],
        ["nama"=>"Angel", "nim"=>"24572010002", "foto"=>"enjel.jpeg"],
        ["nama"=>"Gina Sentia", "nim"=>"24572010005", "foto"=>"gina.jpeg"],
        ["nama"=>"Jaswandi", "nim"=>"24572010006", "foto"=>"wandi.jpeg"],
        ["nama"=>"Raihan Naufal Putra", "nim"=>"24572010008", "foto"=>"raihan.jpeg"],
        ["nama"=>"Riri Anjeli", "nim"=>"24572010009", "foto"=>"riri.jpeg"],
        ["nama"=>"Rosmaina", "nim"=>"24572010010", "foto"=>"ina.jpeg"],
        ["nama"=>"Sri Rahayu Ningsih", "nim"=>"24572010011", "foto"=>"ayu.jpeg"],
        ["nama"=>"Sovia", "nim"=>"24572010012", "foto"=>"sovi.jpeg"],
        ["nama"=>"M. Edo Pane", "nim"=>"24572010024", "foto"=>"edo.jpeg"],
        ["nama"=>"Ella Suprani", "nim"=>"24572010025", "foto"=>"ela.jpeg"],
        ["nama"=>"Rika Yolanda Putri", "nim"=>"24572010026", "foto"=>"rika.jpeg"],
        ["nama"=>"Zelia Niken Faulina", "nim"=>"24572010027", "foto"=>"niken.jpeg"]
    ],
    "2025" => [
        ["nama"=>"Khairunnisa Siregar", "nim"=>"255720100001", "foto"=>"nisa.jpeg"],
        ["nama"=>"M.Mulyadi", "nim"=>"255720100002", "foto"=>"mulyadi.jpeg"],
        ["nama"=>"Nabila Zahra", "nim"=>"255720100003", "foto"=>"nabila.jpeg"],
        ["nama"=>"Saskia Aryani", "nim"=>"255720100004", "foto"=>"saskia.jpeg"],
        ["nama"=>"Sofiatun Nabila", "nim"=>"255720100005", "foto"=>"sofiatun.jpeg"],
        ["nama"=>"Tasya Aulia Putri", "nim"=>"255720100007", "foto"=>"tasya.jpeg"],
        ["nama"=>"Yuni Hazara", "nim"=>"255720100008", "foto"=>"yuni.jpeg"],
        ["nama"=>"Ay.Fadlurrahman", "nim"=>"255720100015", "foto"=>"alan.jpeg"],
        ["nama"=>"Irna Rahmawati", "nim"=>"255720100017", "foto"=>"irna.jpeg"],
        ["nama"=>"Salwa Maghfirah", "nim"=>"255720100018", "foto"=>"salwa.jpeg"]
    ],
];
?>

<h3>Mahasiswa Angkatan <?= $angkatan ?></h3>

<table border="1" cellpadding="8">
<tr>
    <th>No</th>
    <th>Foto</th>
    <th>Nama Mahasiswa</th>
    <th>NIM</th>
</tr>

<?php
$no = 1;
foreach ($data[$angkatan] as $m) {
    echo "<tr>
        <td>$no</td>
        <td><img src='{$m['foto']}' width='80'></td>
        <td>{$m['nama']}</td>
        <td>{$m['nim']}</td>
    </tr>";
    $no++;
}
?>

</table>

</div>

<footer>
    © 2025 Prodi Sistem Informasi Angkatan 24 – ITS Khatulistiwa, Pasaman Barat
</footer>

</body>
</html>
