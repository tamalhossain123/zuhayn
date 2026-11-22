<?php
// ZUHAYN backend bootstrap: config, DB, JSON helpers, session auth, CSRF.
declare(strict_types=1);

function zu_config(): array
{
    static $cfg = null;
    if ($cfg !== null) return $cfg;
    $file = __DIR__ . '/config.php';
    if (!file_exists($file)) {
        http_response_code(503);
        header('Content-Type: application/json');
        echo json_encode(['ok' => false, 'error' => 'Backend not installed yet.']);
        exit;
    }
    $cfg = require $file;
    return $cfg;
}

function zu_db(): PDO
{
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    $c = zu_config();
    $driver = $c['db_driver'] ?? 'mysql';
    if ($driver === 'sqlite') {
        $pdo = new PDO('sqlite:' . $c['db_path']);
    } else {
        $dsn = 'mysql:host=' . ($c['db_host'] ?? 'localhost')
            . ';dbname=' . $c['db_name']
            . ';charset=utf8mb4';
        $pdo = new PDO($dsn, $c['db_user'], $c['db_pass']);
    }
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
}

function zu_json($data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function zu_body(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') return [];
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function zu_str($v, int $max = 2000): string
{
    $s = trim((string)($v ?? ''));
    if (function_exists('mb_substr')) return mb_substr($s, 0, $max);
    return substr($s, 0, $max);
}

function zu_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) return;
    $https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $https,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_name('ZUHAYNADMIN');
    session_start();
}

function zu_admin_id(): ?int
{
    zu_session_start();
    return isset($_SESSION['admin_id']) ? (int)$_SESSION['admin_id'] : null;
}

function zu_require_admin(): int
{
    $id = zu_admin_id();
    if ($id === null) zu_json(['ok' => false, 'error' => 'Not logged in.'], 401);
    return $id;
}

function zu_csrf_token(): string
{
    zu_session_start();
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(24));
    return $_SESSION['csrf'];
}

function zu_require_csrf(): void
{
    $sent = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
    $real = $_SESSION['csrf'] ?? '';
    if ($real === '' || !hash_equals($real, (string)$sent)) {
        zu_json(['ok' => false, 'error' => 'Invalid session token. Please reload and try again.'], 403);
    }
}

function zu_setting(PDO $db, string $key, string $default = ''): string
{
    $st = $db->prepare('SELECT v FROM settings WHERE k = ?');
    $st->execute([$key]);
    $row = $st->fetch();
    return $row ? (string)$row['v'] : $default;
}

function zu_json_list($v): array
{
    if (is_array($v)) return array_values($v);
    if (is_string($v) && $v !== '') {
        $d = json_decode($v, true);
        if (is_array($d)) return array_values($d);
    }
    return [];
}
