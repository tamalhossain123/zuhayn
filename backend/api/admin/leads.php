<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

zu_require_role(['super_admin', 'admin']);
$db = zu_db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method === 'GET') {
        $status = zu_str($_GET['status'] ?? '', 16);
        $allowed = ['new', 'contacted', 'done', 'spam'];
        if ($status !== '' && in_array($status, $allowed, true)) {
            $st = $db->prepare('SELECT * FROM leads WHERE status = ? ORDER BY id DESC LIMIT 300');
            $st->execute([$status]);
        } else {
            $st = $db->query('SELECT * FROM leads ORDER BY id DESC LIMIT 300');
        }
        zu_json(['ok' => true, 'leads' => $st->fetchAll()]);
    }

    zu_require_csrf();
    $body = zu_body();

    if ($method === 'PATCH' || $method === 'POST') {
        $id = (int)($body['id'] ?? 0);
        $status = zu_str($body['status'] ?? '', 16);
        if ($id <= 0 || !in_array($status, ['new', 'contacted', 'done', 'spam'], true)) {
            zu_json(['ok' => false, 'error' => 'Invalid lead or status.'], 422);
        }
        $db->prepare('UPDATE leads SET status = ? WHERE id = ?')->execute([$status, $id]);
        zu_json(['ok' => true]);
    }

    if ($method === 'DELETE') {
        $id = (int)($body['id'] ?? ($_GET['id'] ?? 0));
        if ($id <= 0) zu_json(['ok' => false, 'error' => 'Invalid lead.'], 422);
        $db->prepare('DELETE FROM leads WHERE id = ?')->execute([$id]);
        zu_json(['ok' => true]);
    }

    zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Lead operation failed.'], 500);
}
