<?php
require_once __DIR__ . '/db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $stmt = $pdo->query('SELECT id, name, email, phone, role, badge, auth_provider, created_at FROM users ORDER BY created_at DESC LIMIT 100');
    $users = $stmt->fetchAll();
    echo json_encode(['ok' => true, 'count' => count($users), 'users' => $users]);
    exit();
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: $_POST;

    $id = !empty($data['id']) ? $data['id'] : ('TC-USR-' . rand(1000, 9999));
    $name = !empty($data['name']) ? trim($data['name']) : 'Traveler';
    $email = !empty($data['email']) ? strtolower(trim($data['email'])) : '';
    $phone = !empty($data['phone']) ? trim($data['phone']) : '';
    $pw = !empty($data['pw']) ? $data['pw'] : (!empty($data['password_hash']) ? $data['password_hash'] : '');
    $role = !empty($data['role']) ? $data['role'] : (strpos($email, 'admin') !== false ? 'admin' : 'user');
    $avatar = !empty($data['avatar']) ? $data['avatar'] : '';
    $badge = !empty($data['badge']) ? $data['badge'] : 'Verified Traveler';
    $auth_provider = !empty($data['via']) ? $data['via'] : (!empty($data['auth_provider']) ? $data['auth_provider'] : 'local');

    if (!$email) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Email is required']);
        exit();
    }

    try {
        $sql = "INSERT INTO users (id, name, email, phone, password_hash, role, avatar, badge, auth_provider)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name = VALUES(name), phone = VALUES(phone), avatar = VALUES(avatar), badge = VALUES(badge)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id, $name, $email, $phone, $pw, $role, $avatar, $badge, $auth_provider]);

        echo json_encode([
            'ok' => true,
            'user' => ['id' => $id, 'name' => $name, 'email' => $email, 'phone' => $phone, 'role' => $role, 'badge' => $badge]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => $e->getMessage()]);
    }
}
