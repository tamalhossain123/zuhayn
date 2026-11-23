<?php
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

$id = zu_require_admin();
try {
    $db = zu_db();
    zu_migrate($db);
    $st = $db->prepare('SELECT username, role FROM admins WHERE id = ?');
    $st->execute([$id]);
    $row = $st->fetch();
    $role = $row ? (string)($row['role'] ?? 'super_admin') : 'super_admin';
    if (!in_array($role, zu_roles(), true)) $role = 'super_admin';
    $weekSql = (zu_config()['db_driver'] ?? 'mysql') === 'sqlite'
        ? "SELECT COUNT(*) c FROM leads WHERE created_at >= datetime('now', '-7 days')"
        : 'SELECT COUNT(*) c FROM leads WHERE created_at >= (NOW() - INTERVAL 7 DAY)';
    $counts = [
        'leads_total' => (int)$db->query('SELECT COUNT(*) c FROM leads')->fetch()['c'],
        'leads_new' => (int)$db->query("SELECT COUNT(*) c FROM leads WHERE status = 'new'")->fetch()['c'],
        'leads_contacted' => (int)$db->query("SELECT COUNT(*) c FROM leads WHERE status = 'contacted'")->fetch()['c'],
        'leads_done' => (int)$db->query("SELECT COUNT(*) c FROM leads WHERE status = 'done'")->fetch()['c'],
        'leads_spam' => (int)$db->query("SELECT COUNT(*) c FROM leads WHERE status = 'spam'")->fetch()['c'],
        'leads_week' => (int)$db->query($weekSql)->fetch()['c'],
        'services' => (int)$db->query('SELECT COUNT(*) c FROM services')->fetch()['c'],
        'packages' => (int)$db->query('SELECT COUNT(*) c FROM packages')->fetch()['c'],
        'works' => (int)$db->query('SELECT COUNT(*) c FROM works')->fetch()['c'],
        'clients' => (int)$db->query('SELECT COUNT(*) c FROM clients')->fetch()['c'],
        'industries' => (int)$db->query('SELECT COUNT(*) c FROM industries')->fetch()['c'],
        'faqs' => (int)$db->query('SELECT COUNT(*) c FROM faqs')->fetch()['c'],
    ];
    zu_json(['ok' => true, 'username' => $row ? $row['username'] : '', 'role' => $role, 'csrf' => zu_csrf_token(), 'counts' => $counts]);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Unavailable.'], 500);
}
