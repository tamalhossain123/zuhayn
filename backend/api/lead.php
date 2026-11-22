<?php
// Public lead endpoint: validates the quote form, stores the lead and
// emails a notification. The database copy is the guarantee; email is
// best effort on top of it.
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Public form endpoint: allow cross-origin posts from preview builds.
header('Access-Control-Allow-Origin: *');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    header('Access-Control-Allow-Headers: Content-Type');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    zu_json(['ok' => false, 'error' => 'Method not allowed.'], 405);
}

$body = zu_body();

// Honeypot: real visitors never fill this hidden field.
if (!empty($body['website'])) {
    zu_json(['ok' => true, 'message' => 'Thanks! Your request has been received.']);
}

$lead = [
    'full_name' => zu_str($body['fullName'] ?? '', 120),
    'company' => zu_str($body['company'] ?? '', 160),
    'mobile' => zu_str($body['mobile'] ?? '', 40),
    'email' => zu_str($body['email'] ?? '', 160),
    'address' => zu_str($body['address'] ?? '', 255),
    'business_type' => zu_str($body['businessType'] ?? '', 80),
    'service' => zu_str($body['service'] ?? '', 120),
    'message' => zu_str($body['message'] ?? '', 3000),
];

$missing = [];
foreach (['full_name' => 'full name', 'company' => 'company name', 'mobile' => 'mobile number', 'email' => 'email', 'address' => 'address', 'business_type' => 'business type'] as $k => $label) {
    if ($lead[$k] === '') $missing[] = $label;
}
if ($missing) {
    zu_json(['ok' => false, 'error' => 'Please fill in all required fields: ' . implode(', ', $missing) . '.'], 422);
}
if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
    zu_json(['ok' => false, 'error' => 'Please enter a valid email address.'], 422);
}

try {
    $db = zu_db();
    $ip = zu_str($_SERVER['REMOTE_ADDR'] ?? '', 45);

    // Light rate limit: at most 5 submissions per IP per hour.
    $st = $db->prepare("SELECT COUNT(*) c FROM leads WHERE ip = ? AND created_at > datetime('now', '-1 hour')");
    if ((zu_config()['db_driver'] ?? 'mysql') !== 'sqlite') {
        $st = $db->prepare('SELECT COUNT(*) c FROM leads WHERE ip = ? AND created_at > (NOW() - INTERVAL 1 HOUR)');
    }
    $st->execute([$ip]);
    if ((int)$st->fetch()['c'] >= 5) {
        zu_json(['ok' => false, 'error' => 'Too many submissions. Please call us directly.'], 429);
    }

    $db->prepare('INSERT INTO leads (full_name, company, mobile, email, address, business_type, service, message, status, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
        ->execute([$lead['full_name'], $lead['company'], $lead['mobile'], $lead['email'], $lead['address'], $lead['business_type'], $lead['service'], $lead['message'], 'new', $ip]);

    $notify = zu_setting($db, 'notify_email');
    if ($notify !== '' && filter_var($notify, FILTER_VALIDATE_EMAIL)) {
        $from = zu_setting($db, 'notify_from', 'no-reply@zuhayn.com');
        $subject = 'New quote request from ' . $lead['full_name'] . ' - ZUHAYN website';
        $lines = [
            'A new quote request was submitted on zuhayn.com.',
            '',
            'Name: ' . $lead['full_name'],
            'Company: ' . $lead['company'],
            'Mobile: ' . $lead['mobile'],
            'Email: ' . $lead['email'],
            'Address: ' . $lead['address'],
            'Business type: ' . $lead['business_type'],
            'Service: ' . ($lead['service'] !== '' ? $lead['service'] : '-'),
            'Message: ' . ($lead['message'] !== '' ? $lead['message'] : '-'),
            '',
            'See all leads in the admin panel.',
        ];
        @mail($notify, $subject, implode("\n", $lines), 'From: ZUHAYN Website <' . $from . '>');
    }

    zu_json(['ok' => true, 'message' => 'Thanks, ' . $lead['full_name'] . '! Your request has been received. Our team will contact you shortly.']);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Something went wrong while sending. Please call us or message us on Facebook.'], 500);
}
