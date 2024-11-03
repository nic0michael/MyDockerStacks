<?php

declare(strict_types=1);
/**
 * @copyright Copyright (c) 2017 Julius Härtl <jus@bitgrid.net>
 *
 * @author Julius Härtl <jus@bitgrid.net>
 *
 * @license GNU AGPL version 3 or any later version
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\Support\Sections;

use OC\DB\Exceptions\DbalException;
use OC\IntegrityCheck\Checker;
use OC\SystemConfig;
use OCA\Files_External\Lib\StorageConfig;
use OCA\Files_External\Service\GlobalStoragesService;
use OCA\Support\IDetail;
use OCA\Support\Section;
use OCA\User_LDAP\Configuration;
use OCA\User_LDAP\Helper;
use OCP\App\IAppManager;
use OCP\Http\Client\IClientService;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IUserManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Helper\Table;
use Symfony\Component\Console\Output\BufferedOutput;

class ServerSection extends Section {
	public function __construct(
		protected readonly IConfig $config,
		protected readonly Checker $checker,
		protected readonly IAppManager $appManager,
		protected readonly IDBConnection $connection,
		protected readonly IClientService $clientService,
		protected readonly IUserManager $userManager,
		protected readonly LoggerInterface $logger,
		protected readonly SystemConfig $systemConfig,
	) {
		parent::__construct('server-detail', 'Server configuration detail');
	}

	public function getDetails(): array {
		$this->createDetail('Operating system', $this->getOsVersion());
		$this->createDetail('Webserver', $this->getWebserver());
		$this->createDetail('Database', $this->getDatabaseInfo());
		$this->createDetail('PHP version', $this->getPhpVersion());
		$this->createDetail('Nextcloud version', $this->getNextcloudVersion());
		$this->createDetail('Updated from an older Nextcloud/ownCloud or fresh install', '');
		$this->createDetail('Where did you install Nextcloud from', $this->getInstallMethod());
		$this->createDetail('Signing status', $this->getIntegrityResults(), IDetail::TYPE_COLLAPSIBLE);
		$this->createDetail('List of activated apps', $this->renderAppList(), IDetail::TYPE_COLLAPSIBLE_PREFORMAT);

		$this->createDetail('Configuration (config/config.php)', print_r(json_encode($this->getConfig(), JSON_PRETTY_PRINT), true), IDetail::TYPE_COLLAPSIBLE_PREFORMAT);
		$this->createDetail('Cron Configuration', print_r($this->getCronConfig(), true));

		$externalStorageEnabled = $this->appManager->isEnabledForUser('files_external');
		$this->createDetail('External storages', $externalStorageEnabled ? 'yes' : 'files_external is disabled');
		if ($externalStorageEnabled) {
			$this->createDetail('External storage configuration', $this->getExternalStorageInfo(), IDetail::TYPE_COLLAPSIBLE_PREFORMAT);
		}

		$this->createDetail('Encryption', $this->getEncryptionInfo());
		$this->createDetail('User-backends', $this->getUserBackendInfo());

		if ($this->isLDAPEnabled()) {
			$this->createDetail('LDAP configuration', $this->getLDAPInfo(), IDetail::TYPE_COLLAPSIBLE_PREFORMAT);
		}
		if ($this->isTalkEnabled()) {
			$this->createDetail('Talk configuration', $this->getTalkInfo());
		}

		$this->createDetail('Browser', $this->getBrowser());

		return parent::getDetails();
	}

	private function getWebserver(): string {
		return ($_SERVER['SERVER_SOFTWARE'] ?? 'Unknown') . ' (' . PHP_SAPI . ')';
	}

	private function getNextcloudVersion(): string {
		return \OC_Util::getHumanVersion() . ' - ' . $this->config->getSystemValue('version');
	}
	private function getOsVersion(): string {
		return function_exists('php_uname') ? php_uname('s') . ' ' . php_uname('r') . ' ' . php_uname('v') . ' ' . php_uname('m') : PHP_OS;
	}
	private function getPhpVersion(): string {
		return PHP_VERSION . "\n\nModules loaded: " . implode(', ', get_loaded_extensions());
	}

	protected function getDatabaseInfo(): string {
		return $this->config->getSystemValue('dbtype') . ' ' . $this->getDatabaseVersion();
	}

	/**
	 * original source from nextcloud/survey_client
	 * @link https://github.com/nextcloud/survey_client/blob/master/lib/Categories/Database.php#L80-L107
	 *
	 * @copyright Copyright (c) 2016, ownCloud, Inc.
	 * @author Joas Schilling <coding@schilljs.com>
	 * @license AGPL-3.0
	 */
	private function getDatabaseVersion(): string {
		switch ($this->config->getSystemValue('dbtype')) {
			case 'sqlite':
			case 'sqlite3':
				$sql = 'SELECT sqlite_version() AS version';
				break;
			case 'oci':
				$sql = 'SELECT VERSION FROM PRODUCT_COMPONENT_VERSION';
				break;
			case 'mysql':
			case 'pgsql':
			default:
				$sql = 'SELECT VERSION() AS version';
				break;
		}

		try {
			$result = $this->connection->executeQuery($sql);
			$version = $result->fetchColumn();
			$result->closeCursor();
			if ($version) {
				return $this->cleanVersion($version);
			}
		} catch (DBALException $e) {
			$this->logger->debug('Unable to determine database version', [
				'exception' => $e
			]);
		}

		return 'N/A';
	}

	/**
	 * Try to strip away additional information
	 *
	 * @copyright Copyright (c) 2016, ownCloud, Inc.
	 * @author Joas Schilling <coding@schilljs.com>
	 * @license AGPL-3.0
	 *
	 * @param string $version E.g. `5.6.27-0ubuntu0.14.04.1`
	 * @return string `5.6.27`
	 */
	protected function cleanVersion(string $version): string {
		$matches = [];
		preg_match('/^(\d+)(\.\d+)(\.\d+)/', $version, $matches);
		if (isset($matches[0])) {
			return $matches[0];
		}
		return $version;
	}

	/**
	 * @return array{backgroundjobs_mode: string, lastcron: string}
	 */
	private function getCronConfig(): array {
		return [
			'backgroundjobs_mode' => $this->config->getAppValue('core', 'backgroundjobs_mode', 'ajax'),
			'lastcron' => $this->config->getAppValue('core', 'lastcron', 'never'),
		];
	}

	private function getIntegrityResults(): string {
		if (!$this->checker->isCodeCheckEnforced()) {
			return 'Integrity checker has been disabled. Integrity cannot be verified.';
		}
		return print_r(json_encode($this->checker->getResults(), JSON_PRETTY_PRINT), true);
	}

	private function getInstallMethod(): string {
		$base = \OC::$SERVERROOT;
		if (file_exists($base . '/.git')) {
			return 'git';
		}
		return 'unknown';
	}

	private function renderAppList(): string {
		$apps = $this->getAppList();
		$result = "Enabled:\n";
		foreach ($apps['enabled'] as $name => $version) {
			$result .= ' - ' . $name . ': ' . $version . "\n";
		}

		$result .= "Disabled:\n";
		foreach ($apps['disabled'] as $name => $version) {
			if ($version) {
				$result .= ' - ' . $name . ': ' . $version . "\n";
			} else {
				$result .= ' - ' . $name . "\n";
			}
		}
		return $result;
	}

	/**
	 * @return string[][]
	 */
	private function getAppList(): array {
		$apps = \OC_App::getAllApps();
		$enabledApps = $disabledApps = [];
		$versions = \OC_App::getAppVersions();

		//sort enabled apps above disabled apps
		foreach ($apps as $app) {
			if ($this->appManager->isInstalled($app)) {
				$enabledApps[] = $app;
			} else {
				$disabledApps[] = $app;
			}
		}
		$apps = ['enabled' => [], 'disabled' => []];
		sort($enabledApps);
		foreach ($enabledApps as $app) {
			$apps['enabled'][$app] = $versions[$app] ?? true;
		}
		sort($disabledApps);
		foreach ($disabledApps as $app) {
			$apps['disabled'][$app] = $versions[$app] ?? false;
		}
		return $apps;
	}

	protected function getEncryptionInfo(): string {
		return $this->config->getAppValue('core', 'encryption_enabled', 'no');
	}

	protected function getExternalStorageInfo(): string {
		$globalService = \OC::$server->query(GlobalStoragesService::class);
		$mounts = $globalService->getStorageForAllUsers();

		// copy of OCA\Files_External\Command\ListCommand::listMounts
		if ($mounts === null || count($mounts) === 0) {
			return 'No mounts configured';
		}
		$headers = ['Mount ID', 'Mount Point', 'Storage', 'Authentication Type', 'Configuration', 'Options'];
		$headers[] = 'Applicable Users';
		$headers[] = 'Applicable Groups';
		$headers[] = 'Type';

		$hideKeys = ['password', 'refresh_token', 'token', 'client_secret', 'public_key', 'private_key', 'key', 'secret'];
		/** @var StorageConfig $mount */
		foreach ($mounts as $mount) {
			$config = $mount->getBackendOptions();
			foreach ($config as $key => $value) {
				if (in_array($key, $hideKeys)) {
					$mount->setBackendOption($key, '***');
				}
			}
		}

		$defaultMountOptions = [
			'encrypt' => true,
			'previews' => true,
			'filesystem_check_changes' => 1,
			'enable_sharing' => false,
			'encoding_compatibility' => false,
			'readonly' => false,
		];
		$rows = array_map(function (StorageConfig $config) use ($defaultMountOptions) {
			$storageConfig = $config->getBackendOptions();
			$keys = array_keys($storageConfig);
			$values = array_values($storageConfig);
			$configStrings = array_map(function ($key, $value) {
				return $key . ': ' . json_encode($value);
			}, $keys, $values);
			$configString = implode(', ', $configStrings);
			$mountOptions = $config->getMountOptions();
			// hide defaults
			foreach ($mountOptions as $key => $value) {
				if (isset($defaultMountOptions[$key]) && ($value === $defaultMountOptions[$key])) {
					unset($mountOptions[$key]);
				}
			}
			$keys = array_keys($mountOptions);
			$values = array_values($mountOptions);
			$optionsStrings = array_map(function ($key, $value) {
				return $key . ': ' . json_encode($value);
			}, $keys, $values);
			$optionsString = implode(', ', $optionsStrings);
			$values = [
				$config->getId(),
				$config->getMountPoint(),
				$config->getBackend()->getText(),
				$config->getAuthMechanism()->getText(),
				$configString,
				$optionsString
			];
			$applicableUsers = implode(', ', $config->getApplicableUsers());
			$applicableGroups = implode(', ', $config->getApplicableGroups());
			if ($applicableUsers === '' && $applicableGroups === '') {
				$applicableUsers = 'All';
			}
			$values[] = $applicableUsers;
			$values[] = $applicableGroups;
			$values[] = $config->getType() === StorageConfig::MOUNT_TYPE_ADMIN ? 'Admin' : 'Personal';

			return $values;
		}, $mounts);

		$output = new BufferedOutput();
		$table = new Table($output);
		$table->setHeaders($headers);
		$table->setRows($rows);
		$table->render();

		return $output->fetch();
	}

	private function getConfig(): array {
		$keys = $this->systemConfig->getKeys();
		$configs = [];
		foreach ($keys as $key) {
			$value = $this->systemConfig->getFilteredValue($key, serialize(null));
			if ($value !== 'N;') {
				$configs[$key] = $value;
			}
		}
		return $configs;
	}

	private function getBrowser(): string {
		return $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
	}

	private function getUserBackendInfo(): string {
		$backends = $this->userManager->getBackends();

		$output = PHP_EOL;
		foreach ($backends as $backend) {
			$output .= ' * ' . get_class($backend) . PHP_EOL;
		}

		return $output;
	}

	private function isLDAPEnabled(): bool {
		$backends = $this->userManager->getBackends();

		foreach ($backends as $backend) {
			if ($backend instanceof \OCA\User_LDAP\User_Proxy) {
				return true;
			}
		}

		return false;
	}

	private function isTalkEnabled(): bool {
		return $this->appManager->isEnabledForUser('spreed');
	}

	private function getTalkInfo(): string {
		$output = PHP_EOL;

		$config = $this->config->getAppValue('spreed', 'stun_servers');
		$servers = json_decode($config, true);

		$output .= PHP_EOL;
		$output .= 'STUN servers' . PHP_EOL;
		if (empty($servers)) {
			$output .= ' * no custom server configured' . PHP_EOL;
		} else {
			foreach ($servers as $server) {
				$output .= ' * ' . $server . PHP_EOL;
			}
		}

		$config = $this->config->getAppValue('spreed', 'turn_servers');
		$servers = json_decode($config, true);

		$output .= PHP_EOL;
		$output .= 'TURN servers' . PHP_EOL;
		if (empty($servers)) {
			$output .= ' * no custom server configured' . PHP_EOL;
		} else {
			foreach ($servers as $server) {
				$output .= ' * ' . ($server['schemes'] ?? 'turn') . ':' . $server['server'] . ' - ' . $server['protocols'] . PHP_EOL;
			}
		}

		$config = $this->config->getAppValue('spreed', 'signaling_mode', 'default');
		$output .= PHP_EOL;
		$output .= 'Signaling servers (mode: ' . $config . '):' . PHP_EOL;

		if ($this->config->getAppValue('spreed', 'sip_bridge_shared_secret') !== '') {
			$output .= ' * SIP dialin is enabled' . PHP_EOL;
		} else {
			$output .= ' * SIP dialin is disabled' . PHP_EOL;
		}
		if ($this->config->getAppValue('spreed', 'sip_dialout', 'no') !== 'no') {
			$output .= ' * SIP dialout is enabled' . PHP_EOL;
		} else {
			$output .= ' * SIP dialout is disabled' . PHP_EOL;
		}

		$config = $this->config->getAppValue('spreed', 'signaling_servers');
		$servers = json_decode($config, true);

		if (empty($servers['servers'])) {
			$output .= ' * no custom server configured' . PHP_EOL;
		} else {
			foreach ($servers['servers'] as $server) {
				$output .= ' * ' . $server['server'] . ' - ' . $this->getTalkComponentVersion($server['server']) . PHP_EOL;
			}
		}

		$output .= PHP_EOL;
		$output .= 'Recording servers:' . PHP_EOL;
		if ($this->config->getAppValue('spreed', 'call_recording', 'yes') !== 'yes') {
			$output .= ' * Recording is disabled' . PHP_EOL;
		} else {
			$output .= ' * Recording is enabled' . PHP_EOL;
		}
		$output .= ' * Recording consent is set to "' . $this->config->getAppValue('spreed', 'recording_consent', 'default') . '"' . PHP_EOL;

		$config = $this->config->getAppValue('spreed', 'recording_servers');
		$servers = json_decode($config, true);

		if (empty($servers['servers'])) {
			$output .= ' * no recording server configured' . PHP_EOL;
		} else {
			foreach ($servers['servers'] as $server) {
				$output .= ' * ' . $server['server'] . ' - ' . $this->getTalkComponentVersion($server['server']) . PHP_EOL;
			}
		}

		return $output;
	}

	private function getTalkComponentVersion(string $url): string {
		$url = rtrim($url, '/');

		if (strpos($url, 'wss://') === 0) {
			$url = 'https://' . substr($url, 6);
		}

		if (strpos($url, 'ws://') === 0) {
			$url = 'http://' . substr($url, 5);
		}

		$client = $this->clientService->newClient();
		try {
			$response = $client->get($url . '/api/v1/welcome', [
				'verify' => false,
				'nextcloud' => [
					'allow_local_address' => true,
				],
			]);

			$body = $response->getBody();

			$data = json_decode($body, true);
			if (!is_array($data) || !isset($data['version'])) {
				return 'error';
			}

			return (string) $data['version'];
		} catch (\Exception $e) {
			return 'error: ' . $e->getMessage();
		}
	}

	private function getLDAPInfo(): string {
		/** @var Helper $helper */
		$helper = \OC::$server->query(Helper::class);

		$output = new BufferedOutput();

		// copy of OCA\User_LDAP\Command\ShowConfig::renderConfigs
		$configIDs = $helper->getServerConfigurationPrefixes();
		foreach ($configIDs as $id) {
			$configHolder = new Configuration($id);
			$configuration = $configHolder->getConfiguration();
			ksort($configuration);

			$table = new Table($output);
			$table->setHeaders(['Configuration', $id]);
			$rows = [];
			foreach ($configuration as $key => $value) {
				if ($key === 'ldapAgentPassword') {
					$value = '***';
				}
				if (is_array($value)) {
					$value = implode(';', $value);
				}
				$rows[] = [$key, $value];
			}
			$table->setRows($rows);
			$table->render();
		}

		return $output->fetch();
	}
}
