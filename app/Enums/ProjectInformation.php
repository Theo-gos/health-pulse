<?php

declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ProjectInformation extends Enum
{
    const PROJECT_NAME = 'Health Pulse';

    const ADDRESS_NUMBER = '39';

    const ADDRESS_STREET = 'Le Duan';

    const ADDRESS_WARD = 'Ben Nghe Ward';

    const ADDRESS_DISTRICT = 'District 1';

    const ADDRESS_CITY = 'Ho Chi Minh City';

    const ADDRESS_COUNTRY = 'Viet Nam';

    const ADDRESS_NSWD = ProjectInformation::ADDRESS_NUMBER.', '
        .ProjectInformation::ADDRESS_STREET.', '
        .ProjectInformation::ADDRESS_WARD.', '
        .ProjectInformation::ADDRESS_DISTRICT;

    const ADDRESS_CC = ProjectInformation::ADDRESS_CITY.', '
        .ProjectInformation::ADDRESS_COUNTRY;
}
