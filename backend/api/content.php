<?php
// Public content API: everything the website renders from the CMS,
// in exactly the shapes the frontend components already use.
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';

// Public content: safe to read cross-origin (used by preview builds).
header('Access-Control-Allow-Origin: *');

try {
    $db = zu_db();

    $settings = [];
    foreach ($db->query('SELECT k, v FROM settings') as $row) {
        if (strpos($row['k'], 'pkg_note_') === 0) continue;
        $settings[$row['k']] = $row['v'];
    }

    $services = [];
    $pricing = [];
    $svcRows = $db->query('SELECT * FROM services WHERE active = 1 ORDER BY sort, id')->fetchAll();
    $pkgStmt = $db->prepare('SELECT * FROM packages WHERE service_id = ? ORDER BY sort, id');
    foreach ($svcRows as $s) {
        $services[] = [
            'title' => $s['title'],
            'description' => $s['description'],
            'tags' => zu_json_list($s['tags']),
            'icon' => (int)$s['icon'],
        ];
        $pkgStmt->execute([$s['id']]);
        $tiers = [];
        foreach ($pkgStmt->fetchAll() as $p) {
            $t = [
                'name' => $p['name'],
                'price' => $p['price'],
                'per' => $p['per'],
                'feats' => zu_json_list($p['feats']),
            ];
            if ((int)$p['popular'] === 1) $t['pop'] = true;
            $tiers[] = $t;
        }
        if ($tiers) {
            $entry = ['tiers' => $tiers];
            $note = zu_setting($db, 'pkg_note_' . $s['id']);
            if ($note !== '') $entry = ['note' => $note, 'tiers' => $tiers];
            $pricing[$s['title']] = $entry;
        }
    }

    $works = [];
    foreach ($db->query('SELECT * FROM works ORDER BY sort, slug') as $w) {
        $works[] = [
            'id' => $w['slug'],
            'photo' => $w['photo'],
            'stage' => $w['stage'],
            'art' => (int)$w['art'],
            'logo' => $w['logo'],
            'offer' => $w['offer'],
            'headlineTop' => $w['headline_top'],
            'headlineEm' => $w['headline_em'],
            'sub' => $w['sub'],
            'cta' => $w['cta'],
            'tag' => $w['tag'],
            'kind' => $w['kind'],
            'description' => $w['description'],
        ];
    }

    $clients = [];
    foreach ($db->query('SELECT * FROM clients ORDER BY sort, id') as $c) {
        $clients[] = [
            'name' => $c['name'],
            'sector' => $c['sector'],
            'note' => $c['note'],
            'initials' => $c['initials'],
            'icon' => (int)$c['icon'],
        ];
    }

    $industries = [];
    foreach ($db->query('SELECT * FROM industries ORDER BY sort, id') as $in) {
        $industries[] = [
            'icon' => (int)$in['icon'],
            'title' => $in['title'],
            'description' => $in['description'],
            'tags' => zu_json_list($in['tags']),
        ];
    }

    $faqs = [];
    $pricingFaqs = [];
    foreach ($db->query('SELECT * FROM faqs ORDER BY sort, id') as $f) {
        $item = ['q' => $f['q'], 'a' => $f['a']];
        if ($f['page'] === 'pricing') $pricingFaqs[] = $item;
        else $faqs[] = $item;
    }

    $stats = [];
    foreach ($db->query('SELECT * FROM stats ORDER BY sort, id') as $s) {
        $stats[] = [
            'value' => (int)$s['value'],
            'suffix' => $s['suffix'],
            'label' => $s['label'],
            'plain' => (int)$s['plain'] === 1,
        ];
    }

    header('Cache-Control: no-cache, must-revalidate');
    zu_json([
        'ok' => true,
        'settings' => $settings,
        'services' => $services,
        'pricing' => $pricing,
        'works' => $works,
        'clients' => $clients,
        'industries' => $industries,
        'faqs' => $faqs,
        'pricing_faqs' => $pricingFaqs,
        'stats' => $stats,
    ]);
} catch (Throwable $e) {
    zu_json(['ok' => false, 'error' => 'Content unavailable.'], 500);
}
