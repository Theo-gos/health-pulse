<?php

namespace App\Services;

use App\Models\Icd;

class IcdService extends BaseService
{
    public function getModel()
    {
        return Icd::class;
    }

    public function getAll()
    {
        return Icd::all();
    }
}
