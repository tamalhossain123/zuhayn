<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$id = zu_require_admin();
try {
    $db = zu_db();
    $st = $db->prepare('SELECT username FROM admins WHERE id = ?');
    $st->execute([$id]);
    $row = $st->fetch();
    $counts = [
        'leads_total' => (int)$db->query('SELECT COUNT(*) c FROM leads')->fetch()['c'],
        'leads_new' => (int)$db->query("SELECT COUNT(*) c FROM leads WHERE status = 'new'")->fetch()['c'],
        'services' => (int)$db->query('SELECT COUNT(*) c FROM services')->fetch()['c'],
        'packages' => (int)$db->query('SELECT COUNT(*) c FROM packages')->fetch()['c'],
    ];
    zu_json(['ok' => true, 'username' => $row ? $row['username'] : '', 'csrf' => zu_csrf_token(), 'counts' => $counts]);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Unavailable.'], 500);
}
