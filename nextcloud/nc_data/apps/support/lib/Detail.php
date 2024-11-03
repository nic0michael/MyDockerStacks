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

namespace OCA\Support;

class Detail implements IDetail {
	public function __construct(
		private readonly string $section,
		private readonly string $title,
		private readonly string $information,
		private readonly int $type,
	) {
	}

	public function getTitle(): string {
		return $this->title;
	}

	public function getSection(): string {
		return $this->section;
	}

	public function getInformation(): string {
		return $this->information;
	}

	public function getType(): int {
		return $this->type;
	}
}
