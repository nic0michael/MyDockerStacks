<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2024 Robin Appelman <robin@icewind.nl>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OC\DB\QueryBuilder\Sharded;

use OCP\DB\QueryBuilder\Sharded\IShardMapper;

/**
 * Map string key to an int-range by hashing the key
 */
class RoundRobinShardMapper implements IShardMapper {
	public function getShardForKey(int $key, int $count): int {
		return $key % $count;
	}
}