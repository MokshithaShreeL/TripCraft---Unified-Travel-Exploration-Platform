<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $email = isset($_GET['email']) ? trim($_GET['email']) : '';
    $user_id = isset($_GET['user_id']) ? trim($_GET['user_id']) : '';

    if ($email) {
        $stmt = $pdo->prepare('SELECT * FROM bookings WHERE user_email = ? ORDER BY id DESC');
        $stmt->execute([$email]);
    } else if ($user_id) {
        $stmt = $pdo->prepare('SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC');
        $stmt->execute([$user_id]);
    } else {
        $stmt = $pdo->query('SELECT * FROM bookings ORDER BY id DESC LIMIT 100');
    }

    $bookings = $stmt->fetchAll();
    echo json_encode(['ok' => true, 'count' => count($bookings), 'bookings' => $bookings]);
    exit();
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: $_POST;

    $ref = !empty($data['booking_ref']) ? $data['booking_ref'] : (!empty($data['id']) ? $data['id'] : ('TC-' . rand(100000, 999999)));
    $user_id = !empty($data['user_id']) ? $data['user_id'] : null;
    $user_name = !empty($data['user_name']) ? $data['user_name'] : (!empty($data['customerName']) ? $data['customerName'] : 'Traveler');
    $user_email = !empty($data['user_email']) ? strtolower(trim($data['user_email'])) : (!empty($data['customerEmail']) ? strtolower(trim($data['customerEmail'])) : '');
    $user_phone = !empty($data['user_phone']) ? trim($data['user_phone']) : (!empty($data['customerPhone']) ? trim($data['customerPhone']) : '');
    $title = !empty($data['title']) ? $data['title'] : 'Trip Reservation';
    $category = !empty($data['category']) ? $data['category'] : 'General';
    $travel_date = !empty($data['travel_date']) ? $data['travel_date'] : (!empty($data['travelDate']) ? $data['travelDate'] : date('Y-m-d'));
    $guests = isset($data['guests']) ? (int)$data['guests'] : 1;
    $adults = isset($data['adults']) ? (int)$data['adults'] : 1;
    $children = isset($data['children']) ? (int)$data['children'] : 0;
    $base_price = isset($data['base_price']) ? (float)$data['base_price'] : (isset($data['basePrice']) ? (float)$data['basePrice'] : 0.0);
    $gst = isset($data['gst']) ? (float)$data['gst'] : 0.0;
    $discount = isset($data['discount']) ? (float)$data['discount'] : 0.0;
    $total_price = isset($data['total_price']) ? (float)$data['total_price'] : (isset($data['totalPrice']) ? (float)$data['totalPrice'] : (isset($data['total']) ? (float)$data['total'] : ($base_price + $gst - $discount)));
    $status = !empty($data['status']) ? $data['status'] : 'Confirmed';
    $payment_mode = !empty($data['payment_mode']) ? $data['payment_mode'] : (!empty($data['paymentMode']) ? $data['paymentMode'] : 'Prepaid');
    $payment_status = !empty($data['payment_status']) ? $data['payment_status'] : 'Paid';
    $specs_json = !empty($data['specs']) ? json_encode($data['specs']) : '{}';

    try {
        $sql = "INSERT INTO bookings 
            (booking_ref, user_id, user_name, user_email, user_phone, title, category, travel_date, guests, adults, children, base_price, gst, discount, total_price, status, payment_mode, payment_status, specs_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE status = VALUES(status), total_price = VALUES(total_price)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $ref, $user_id, $user_name, $user_email, $user_phone, $title, $category,
            $travel_date, $guests, $adults, $children, $base_price, $gst, $discount,
            $total_price, $status, $payment_mode, $payment_status, $specs_json
        ]);

        echo json_encode([
            'ok' => true,
            'booking_ref' => $ref,
            'id' => $pdo->lastInsertId(),
            'message' => 'Booking saved to XAMPP MySQL database successfully!'
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
    }
}
