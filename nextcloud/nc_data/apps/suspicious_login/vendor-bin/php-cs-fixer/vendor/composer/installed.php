<?php return array(
    'root' => array(
        'name' => '__root__',
        'pretty_version' => 'dev-stable30',
        'version' => 'dev-stable30',
        'reference' => '6e4a7cd7926f5168120461a0eda05ea99d2e26eb',
        'type' => 'library',
        'install_path' => __DIR__ . '/../../',
        'aliases' => array(),
        'dev' => true,
    ),
    'versions' => array(
        '__root__' => array(
            'pretty_version' => 'dev-stable30',
            'version' => 'dev-stable30',
            'reference' => '6e4a7cd7926f5168120461a0eda05ea99d2e26eb',
            'type' => 'library',
            'install_path' => __DIR__ . '/../../',
            'aliases' => array(),
            'dev_requirement' => false,
        ),
        'friendsofphp/php-cs-fixer' => array(
            'dev_requirement' => true,
            'replaced' => array(
                0 => 'v3.61.1',
            ),
        ),
        'nextcloud/coding-standard' => array(
            'pretty_version' => 'v1.2.1',
            'version' => '1.2.1.0',
            'reference' => 'cf5f18d989ec62fb4cdc7fc92a36baf34b3d829e',
            'type' => 'library',
            'install_path' => __DIR__ . '/../nextcloud/coding-standard',
            'aliases' => array(),
            'dev_requirement' => true,
        ),
        'php-cs-fixer/shim' => array(
            'pretty_version' => 'v3.61.1',
            'version' => '3.61.1.0',
            'reference' => '3ac8e446863e313b51a9466915c9b578409eef9e',
            'type' => 'application',
            'install_path' => __DIR__ . '/../php-cs-fixer/shim',
            'aliases' => array(),
            'dev_requirement' => true,
        ),
    ),
);
