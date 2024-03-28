<?php

namespace App\Services;

use App\Models\Allergy;

class AllergyService extends BaseService
{
    public function getModel()
    {
        return Allergy::class;
    }

    public function getAll()
    {
    }
}
