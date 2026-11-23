<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
}

$body = zu_body();
$username = zu_str($body['username'] ?? '', 60);
$password = (string)($body['password'] ?? '');

try {
    $db = zu_db();
    zu_migrate($db);
    $st = $db->prepare('SELECT id, pass_hash, role FROM admins WHERE username = ?');
    $st->execute([$username]);
    $row = $st->fetch();
    if (!$row || !password_verify($password, (string)$row['pass_hash'])) {
        // Small delay against brute force attempts.
        usleep(400000);
        zu_json(['ok' => false, 'error' => 'Wrong username or password.'], 401);
    }
    $role = (string)($row['role'] ?? 'super_admin');
    if (!in_array($role, zu_roles(), true)) $role = 'super_admin';
    zu_session_start();
    session_regenerate_id(true);
    $_SESSION['admin_id'] = (int)$row['id'];
    $_SESSION['csrf'] = bin2hex(random_bytes(24));
    zu_json(['ok' => true, 'username' => $username, 'role' => $role, 'csrf' => $_SESSION['csrf']]);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Login unavailable right now.'], 500);
}
