<?php
// User management for the admin panel. Super admin only: list users,
// create accounts, change roles, reset passwords and delete users.
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

zu_require_role(['super_admin']);
$db = zu_db();
zu_migrate($db);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$selfId = zu_admin_id();

function zu_super_admin_count(PDO $db): int
{
    return (int)$db->query("SELECT COUNT(*) c FROM admins WHERE role = 'super_admin'")->fetch()['c'];
}

try {
    if ($method === 'GET') {
        $rows = $db->query('SELECT id, username, role, created_at FROM admins ORDER BY id')->fetchAll();
        foreach ($rows as &$r) {
            $r['id'] = (int)$r['id'];
            if (!in_array((string)$r['role'], zu_roles(), true)) $r['role'] = 'super_admin';
            $r['self'] = ((int)$r['id'] === $selfId);
        }
        zu_json(['ok' => true, 'users' => $rows, 'roles' => zu_roles()]);
    }

    zu_require_csrf();
    $body = zu_body();

    if ($method === 'POST') {
        $username = zu_str($body['username'] ?? '', 60);
        $password = (string)($body['password'] ?? '');
        $role = (string)($body['role'] ?? 'editor');
        if ($username === '') zu_json(['ok' => false, 'error' => 'Username is required.'], 422);
        if (strlen($password) < 8) zu_json(['ok' => false, 'error' => 'Password must be at least 8 characters.'], 422);
        if (!in_array($role, zu_roles(), true)) zu_json(['ok' => false, 'error' => 'Unknown role.'], 422);
        $st = $db->prepare('SELECT id FROM admins WHERE username = ?');
        $st->execute([$username]);
        if ($st->fetch()) zu_json(['ok' => false, 'error' => 'That username is already taken.'], 409);
        $db->prepare('INSERT INTO admins (username, pass_hash, role) VALUES (?, ?, ?)')
            ->execute([$username, password_hash($password, PASSWORD_DEFAULT), $role]);
        zu_json(['ok' => true, 'id' => (int)$db->lastInsertId()]);
    }

    if ($method === 'PATCH' || $method === 'PUT') {
        $id = (int)($body['id'] ?? 0);
        if ($id <= 0) zu_json(['ok' => false, 'error' => 'Invalid user.'], 422);
        $st = $db->prepare('SELECT id, role FROM admins WHERE id = ?');
        $st->execute([$id]);
        $target = $st->fetch();
        if (!$target) zu_json(['ok' => false, 'error' => 'User not found.'], 404);

        if (array_key_exists('role', $body)) {
            $role = (string)$body['role'];
            if (!in_array($role, zu_roles(), true)) zu_json(['ok' => false, 'error' => 'Unknown role.'], 422);
            if ($id === $selfId && $role !== 'super_admin') {
                zu_json(['ok' => false, 'error' => 'You cannot change your own role.'], 422);
            }
            if ((string)$target['role'] === 'super_admin' && $role !== 'super_admin' && zu_super_admin_count($db) <= 1) {
                zu_json(['ok' => false, 'error' => 'There must always be at least one super admin.'], 422);
            }
            $db->prepare('UPDATE admins SET role = ? WHERE id = ?')->execute([$role, $id]);
        }
        if (!empty($body['password'])) {
            $password = (string)$body['password'];
            if (strlen($password) < 8) zu_json(['ok' => false, 'error' => 'Password must be at least 8 characters.'], 422);
            $db->prepare('UPDATE admins SET pass_hash = ? WHERE id = ?')
                ->execute([password_hash($password, PASSWORD_DEFAULT), $id]);
        }
        zu_json(['ok' => true]);
    }

    if ($method === 'DELETE') {
        $id = (int)($body['id'] ?? ($_GET['id'] ?? 0));
        if ($id <= 0) zu_json(['ok' => false, 'error' => 'Invalid user.'], 422);
        if ($id === $selfId) zu_json(['ok' => false, 'error' => 'You cannot delete your own account.'], 422);
        $st = $db->prepare('SELECT role FROM admins WHERE id = ?');
        $st->execute([$id]);
        $target = $st->fetch();
        if (!$target) zu_json(['ok' => false, 'error' => 'User not found.'], 404);
        if ((string)$target['role'] === 'super_admin' && zu_super_admin_count($db) <= 1) {
            zu_json(['ok' => false, 'error' => 'There must always be at least one super admin.'], 422);
        }
        $db->prepare('DELETE FROM admins WHERE id = ?')->execute([$id]);
        zu_json(['ok' => true]);
    }

    zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'User operation failed.'], 500);
}
