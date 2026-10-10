<?php
require_once __DIR__ . '/db.php';

try {
    $uCnt = $pdo->query('SELECT COUNT(*) AS cnt FROM users')->fetch()['cnt'];
    $bCnt = $pdo->query('SELECT COUNT(*) AS cnt FROM bookings')->fetch()['cnt'];
    $iCnt = $pdo->query('SELECT COUNT(*) AS cnt FROM inquiries')->fetch()['cnt'];
    $wCnt = $pdo->query('SELECT COUNT(*) AS cnt FROM wishlist')->fetch()['cnt'];

    echo json_encode([
        'ok' => true,
        'connected' => true,
        'database' => $db_name,
        'port' => $db_port,
        'engine' => 'XAMPP Apache + PHP PDO MySQL',
        'tables' => [
            'users' => (int)$uCnt,
            'bookings' => (int)$bCnt,
            'inquiries' => (int)$iCnt,
            'wishlist' => (int)$wCnt
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
}
