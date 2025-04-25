<?php

return [

    'paths' => ['api/*', 'fetch-bill', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'], // <-- Allow from any origin, or use ['http://127.0.0.1:8000'] for specific

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
