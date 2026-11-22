<?php
// Copy to config.php on the server and fill in the real values.
// config.php is created during deployment; never commit real credentials.
return [
    'db_driver' => 'mysql', // 'mysql' on the live server, 'sqlite' for local tests
    'db_host' => 'localhost',
    'db_name' => 'lpl123_zuhayn',
    'db_user' => 'lpl123_zuhayn',
    'db_pass' => 'CHANGE_ME',
    // 'db_path' => __DIR__ . '/dev.sqlite', // only for sqlite
];
