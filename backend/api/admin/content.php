<?php
// Admin content CRUD. Resources and their writable columns are whitelisted;
// every query is prepared and every column name comes from this file only.
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';

zu_require_admin();
$db = zu_db();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$resource = zu_str($_GET['resource'] ?? '', 24);

$RES = [
    'services' => [
        'table' => 'services', 'id' => 'id',
        'cols' => ['title' => 'text', 'description' => 'text', 'tags' => 'json', 'icon' => 'int', 'sort' => 'int', 'active' => 'int'],
        'order' => 'sort, id',
    ],
    'packages' => [
        'table' => 'packages', 'id' => 'id',
        'cols' => ['service_id' => 'int', 'name' => 'text', 'price' => 'text', 'per' => 'text', 'feats' => 'json', 'popular' => 'int', 'sort' => 'int'],
        'order' => 'service_id, sort, id',
    ],
    'works' => [
        'table' => 'works', 'id' => 'slug',
        'cols' => ['photo' => 'text', 'stage' => 'text', 'art' => 'int', 'logo' => 'text', 'offer' => 'text', 'headline_top' => 'text', 'headline_em' => 'text', 'sub' => 'text', 'cta' => 'text', 'tag' => 'text', 'kind' => 'text', 'description' => 'text', 'sort' => 'int'],
        'order' => 'sort, slug',
        'create_cols' => ['slug' => 'text'],
    ],
    'clients' => [
        'table' => 'clients', 'id' => 'id',
        'cols' => ['name' => 'text', 'sector' => 'text', 'note' => 'text', 'initials' => 'text', 'icon' => 'int', 'sort' => 'int'],
        'order' => 'sort, id',
    ],
    'industries' => [
        'table' => 'industries', 'id' => 'id',
        'cols' => ['icon' => 'int', 'title' => 'text', 'description' => 'text', 'tags' => 'json', 'sort' => 'int'],
        'order' => 'sort, id',
    ],
    'faqs' => [
        'table' => 'faqs', 'id' => 'id',
        'cols' => ['page' => 'text', 'q' => 'text', 'a' => 'text', 'sort' => 'int'],
        'order' => 'page, sort, id',
    ],
    'stats' => [
        'table' => 'stats', 'id' => 'id',
        'cols' => ['value' => 'int', 'suffix' => 'text', 'label' => 'text', 'plain' => 'int', 'sort' => 'int'],
        'order' => 'sort, id',
    ],
];

function zu_coerce($v, string $type)
{
    if ($type === 'int') return (int)$v;
    if ($type === 'json') {
        if (is_array($v)) return json_encode(array_values($v));
        $s = trim((string)$v);
        if ($s === '') return '[]';
        $parts = array_values(array_filter(array_map('trim', preg_split('/\r?\n/', $s))));
        return json_encode($parts);
    }
    return zu_str($v, 5000);
}

try {
    if ($resource === 'settings') {
        zu_require_role(['super_admin', 'admin']);
        if ($method === 'GET') {
            $out = [];
            foreach ($db->query('SELECT k, v FROM settings') as $r) $out[$r['k']] = $r['v'];
            zu_json(['ok' => true, 'settings' => $out]);
        }
        zu_require_csrf();
        if ($method === 'POST' || $method === 'PUT') {
            $body = zu_body();
            $items = $body['settings'] ?? null;
            if (!is_array($items)) zu_json(['ok' => false, 'error' => 'No settings given.'], 422);
            $st = $db->prepare('INSERT INTO settings (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v');
            if ((zu_config()['db_driver'] ?? 'mysql') !== 'sqlite') {
                $st = $db->prepare('INSERT INTO settings (k, v) VALUES (?, ?) ON DUPLICATE KEY UPDATE v = VALUES(v)');
            }
            foreach ($items as $k => $v) {
                $key = preg_replace('/[^a-zA-Z0-9_]/', '', (string)$k);
                if ($key === '') continue;
                $st->execute([$key, zu_str($v, 2000)]);
            }
            zu_json(['ok' => true]);
        }
        zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
    }

    if ($resource === 'password') {
        zu_require_csrf();
        if ($method !== 'POST') zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
        $body = zu_body();
        $adminId = zu_admin_id();
        $st = $db->prepare('SELECT pass_hash FROM admins WHERE id = ?');
        $st->execute([$adminId]);
        $row = $st->fetch();
        $new = (string)($body['new'] ?? '');
        if (!$row || !password_verify((string)($body['current'] ?? ''), (string)$row['pass_hash'])) {
            zu_json(['ok' => false, 'error' => 'Current password is wrong.'], 401);
        }
        if (strlen($new) < 8) zu_json(['ok' => false, 'error' => 'New password must be at least 8 characters.'], 422);
        $db->prepare('UPDATE admins SET pass_hash = ? WHERE id = ?')->execute([password_hash($new, PASSWORD_DEFAULT), $adminId]);
        zu_json(['ok' => true]);
    }

    if (!isset($RES[$resource])) zu_json(['ok' => false, 'error' => 'Unknown resource.'], 404);
    $R = $RES[$resource];
    $table = $R['table'];
    $idcol = $R['id'];

    if ($method === 'GET') {
        $rows = $db->query("SELECT * FROM $table ORDER BY {$R['order']}")->fetchAll();
        foreach ($rows as &$r) {
            foreach ($R['cols'] as $col => $type) {
                if ($type === 'json') $r[$col] = zu_json_list($r[$col] ?? null);
            }
        }
        zu_json(['ok' => true, 'rows' => $rows]);
    }

    zu_require_csrf();
    $body = zu_body();

    if ($method === 'POST') {
        $cols = $R['cols'];
        if (!empty($R['create_cols'])) $cols = $R['create_cols'] + $cols;
        $names = [];
        $vals = [];
        foreach ($cols as $col => $type) {
            if (array_key_exists($col, $body)) {
                $names[] = $col;
                $vals[] = zu_coerce($body[$col], $type);
            }
        }
        if (!$names) zu_json(['ok' => false, 'error' => 'Nothing to save.'], 422);
        $ph = implode(', ', array_fill(0, count($names), '?'));
        $db->prepare("INSERT INTO $table (" . implode(', ', $names) . ") VALUES ($ph)")->execute($vals);
        zu_json(['ok' => true, 'id' => $idcol === 'slug' ? ($body['slug'] ?? null) : (int)$db->lastInsertId()]);
    }

    if ($method === 'PUT' || $method === 'PATCH') {
        $id = $body['id'] ?? null;
        if ($id === null || $id === '') zu_json(['ok' => false, 'error' => 'Missing id.'], 422);
        $sets = [];
        $vals = [];
        foreach ($R['cols'] as $col => $type) {
            if (array_key_exists($col, $body)) {
                $sets[] = "$col = ?";
                $vals[] = zu_coerce($body[$col], $type);
            }
        }
        if (!$sets) zu_json(['ok' => false, 'error' => 'Nothing to update.'], 422);
        $vals[] = $idcol === 'slug' ? (string)$id : (int)$id;
        $db->prepare("UPDATE $table SET " . implode(', ', $sets) . " WHERE $idcol = ?")->execute($vals);
        zu_json(['ok' => true]);
    }

    if ($method === 'DELETE') {
        $id = $body['id'] ?? ($_GET['id'] ?? null);
        if ($id === null || $id === '') zu_json(['ok' => false, 'error' => 'Missing id.'], 422);
        $db->prepare("DELETE FROM $table WHERE $idcol = ?")->execute([$idcol === 'slug' ? (string)$id : (int)$id]);
        zu_json(['ok' => true]);
    }

    zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Operation failed: ' . $e->getMessage()], 500);
}
