<?php
// One-time installer: creates tables, seeds content from seed.json and
// creates the first admin account. Locks itself with installed.lock.
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

$lock = __DIR__ . '/installed.lock';

function zu_ddl(string $driver): array
{
    $ai = $driver === 'sqlite' ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'INT AUTO_INCREMENT PRIMARY KEY';
    $ts = $driver === 'sqlite' ? 'TEXT DEFAULT CURRENT_TIMESTAMP' : 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP';
    $tsu = $driver === 'sqlite' ? 'TEXT DEFAULT CURRENT_TIMESTAMP' : 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
    return [
        "CREATE TABLE IF NOT EXISTS settings (k VARCHAR(80) PRIMARY KEY, v TEXT)",
        "CREATE TABLE IF NOT EXISTS admins (id $ai, username VARCHAR(60) UNIQUE NOT NULL, pass_hash VARCHAR(255) NOT NULL, created_at $ts)",
        "CREATE TABLE IF NOT EXISTS leads (id $ai, full_name VARCHAR(120) NOT NULL, company VARCHAR(160) NOT NULL, mobile VARCHAR(40) NOT NULL, email VARCHAR(160) NOT NULL, address VARCHAR(255) NOT NULL, business_type VARCHAR(80) NOT NULL, service VARCHAR(120) DEFAULT '', message TEXT, status VARCHAR(16) NOT NULL DEFAULT 'new', ip VARCHAR(45) DEFAULT '', created_at $ts, updated_at $tsu)",
        "CREATE TABLE IF NOT EXISTS services (id $ai, title VARCHAR(120) NOT NULL, description TEXT, tags TEXT, icon INT DEFAULT 0, sort INT DEFAULT 0, active INT DEFAULT 1)",
        "CREATE TABLE IF NOT EXISTS packages (id $ai, service_id INT NOT NULL, name VARCHAR(60) NOT NULL, price VARCHAR(40) NOT NULL, per VARCHAR(40) DEFAULT '', feats TEXT, popular INT DEFAULT 0, sort INT DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS works (slug VARCHAR(40) PRIMARY KEY, photo VARCHAR(255) DEFAULT '', stage VARCHAR(60) DEFAULT '', art INT DEFAULT 0, logo VARCHAR(160) DEFAULT '', offer VARCHAR(80) DEFAULT '', headline_top VARCHAR(120) DEFAULT '', headline_em VARCHAR(120) DEFAULT '', sub VARCHAR(255) DEFAULT '', cta VARCHAR(80) DEFAULT '', tag VARCHAR(160) DEFAULT '', kind VARCHAR(80) DEFAULT '', description TEXT, sort INT DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS clients (id $ai, name VARCHAR(120) NOT NULL, sector VARCHAR(160) DEFAULT '', note TEXT, initials VARCHAR(8) DEFAULT '', icon INT DEFAULT 0, sort INT DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS industries (id $ai, icon INT DEFAULT 0, title VARCHAR(160) NOT NULL, description TEXT, tags TEXT, sort INT DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS faqs (id $ai, page VARCHAR(24) NOT NULL DEFAULT 'site', q TEXT NOT NULL, a TEXT NOT NULL, sort INT DEFAULT 0)",
        "CREATE TABLE IF NOT EXISTS stats (id $ai, value INT DEFAULT 0, suffix VARCHAR(8) DEFAULT '', label VARCHAR(200) DEFAULT '', plain INT DEFAULT 0, sort INT DEFAULT 0)",
    ];
}

function zu_seed(PDO $db): void
{
    $seedFile = __DIR__ . '/seed.json';
    if (!file_exists($seedFile)) return;
    $seed = json_decode((string)file_get_contents($seedFile), true);
    if (!is_array($seed)) return;

    $count = (int)$db->query('SELECT COUNT(*) c FROM settings')->fetch()['c'];
    if ($count === 0 && !empty($seed['settings'])) {
        $st = $db->prepare('INSERT INTO settings (k, v) VALUES (?, ?)');
        foreach ($seed['settings'] as $k => $v) $st->execute([$k, (string)$v]);
    }

    $count = (int)$db->query('SELECT COUNT(*) c FROM services')->fetch()['c'];
    if ($count === 0) {
        $ss = $db->prepare('INSERT INTO services (title, description, tags, icon, sort, active) VALUES (?, ?, ?, ?, ?, 1)');
        $sp = $db->prepare('INSERT INTO packages (service_id, name, price, per, feats, popular, sort) VALUES (?, ?, ?, ?, ?, ?, ?)');
        foreach (($seed['services'] ?? []) as $i => $s) {
            $ss->execute([$s['title'], $s['description'] ?? '', json_encode($s['tags'] ?? []), (int)($s['icon'] ?? 0), $i]);
            $sid = (int)$db->lastInsertId();
            $pkg = ($seed['pricing'] ?? [])[$s['title']] ?? null;
            if ($pkg) {
                if (!empty($pkg['note'])) {
                    $db->prepare('INSERT INTO settings (k, v) VALUES (?, ?)')->execute(['pkg_note_' . $sid, $pkg['note']]);
                }
                foreach (($pkg['tiers'] ?? []) as $j => $t) {
                    $sp->execute([$sid, $t['name'], $t['price'], $t['per'] ?? '', json_encode($t['feats'] ?? []), !empty($t['pop']) ? 1 : 0, $j]);
                }
            }
        }
    }

    $count = (int)$db->query('SELECT COUNT(*) c FROM works')->fetch()['c'];
    if ($count === 0) {
        $st = $db->prepare('INSERT INTO works (slug, photo, stage, art, logo, offer, headline_top, headline_em, sub, cta, tag, kind, description, sort) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        foreach (($seed['works'] ?? []) as $i => $w) {
            $st->execute([$w['id'], $w['photo'] ?? '', $w['stage'] ?? '', (int)($w['art'] ?? 0), $w['logo'] ?? '', $w['offer'] ?? '', $w['headlineTop'] ?? '', $w['headlineEm'] ?? '', $w['sub'] ?? '', $w['cta'] ?? '', $w['tag'] ?? '', $w['kind'] ?? '', $w['description'] ?? '', $i]);
        }
    }

    $count = (int)$db->query('SELECT COUNT(*) c FROM clients')->fetch()['c'];
    if ($count === 0) {
        $st = $db->prepare('INSERT INTO clients (name, sector, note, initials, icon, sort) VALUES (?, ?, ?, ?, ?, ?)');
        foreach (($seed['clients'] ?? []) as $i => $c) {
            $st->execute([$c['name'], $c['sector'] ?? '', $c['note'] ?? '', $c['initials'] ?? '', (int)($c['icon'] ?? 0), $i]);
        }
    }

    $count = (int)$db->query('SELECT COUNT(*) c FROM industries')->fetch()['c'];
    if ($count === 0) {
        $st = $db->prepare('INSERT INTO industries (icon, title, description, tags, sort) VALUES (?, ?, ?, ?, ?)');
        foreach (($seed['industries'] ?? []) as $i => $in) {
            $st->execute([(int)($in['icon'] ?? 0), $in['title'], $in['description'] ?? '', json_encode($in['tags'] ?? []), $i]);
        }
    }

    $count = (int)$db->query('SELECT COUNT(*) c FROM faqs')->fetch()['c'];
    if ($count === 0) {
        $st = $db->prepare('INSERT INTO faqs (page, q, a, sort) VALUES (?, ?, ?, ?)');
        foreach (($seed['faqs'] ?? []) as $i => $f) $st->execute(['site', $f['q'], $f['a'], $i]);
        foreach (($seed['pricing_faqs'] ?? []) as $i => $f) $st->execute(['pricing', $f['q'], $f['a'], $i]);
    }

    $count = (int)$db->query('SELECT COUNT(*) c FROM stats')->fetch()['c'];
    if ($count === 0) {
        $st = $db->prepare('INSERT INTO stats (value, suffix, label, plain, sort) VALUES (?, ?, ?, ?, ?)');
        foreach (($seed['stats'] ?? []) as $i => $s) {
            $st->execute([(int)($s['value'] ?? 0), $s['suffix'] ?? '', $s['label'] ?? '', !empty($s['plain']) ? 1 : 0, $i]);
        }
    }
}

if (file_exists($lock)) {
    zu_json(['ok' => false, 'error' => 'Already installed.'], 403);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    // Report readiness without changing anything.
    try {
        $db = zu_db();
        zu_json(['ok' => true, 'ready' => true, 'message' => 'POST a username and password (min 8 characters) to finish setup.']);
    } catch (Throwable $e) {
        zu_json(['ok' => false, 'error' => 'Database connection failed. Check api/config.php.'], 500);
    }
}

if ($method === 'POST') {
    $body = zu_body();
    $username = zu_str($body['username'] ?? '', 60);
    $password = (string)($body['password'] ?? '');
    if ($username === '' || strlen($password) < 8) {
        zu_json(['ok' => false, 'error' => 'Username is required and the password must be at least 8 characters.'], 422);
    }
    try {
        $db = zu_db();
        $driver = (string)(zu_config()['db_driver'] ?? 'mysql');
        foreach (zu_ddl($driver) as $sql) $db->exec($sql);
        zu_seed($db);
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $db->prepare('INSERT INTO admins (username, pass_hash) VALUES (?, ?)')->execute([$username, $hash]);
        file_put_contents($lock, 'installed ' . date('c'));
        zu_json(['ok' => true, 'message' => 'Setup complete. You can now log in to the admin panel.']);
    } catch (Throwable $e) {
        zu_json(['ok' => false, 'error' => 'Setup failed: ' . $e->getMessage()], 500);
    }
}

zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
