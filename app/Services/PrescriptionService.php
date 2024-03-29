<?php

namespace App\Services;

use App\Models\Prescription;

class PrescriptionService extends BaseService
{
    public function getModel()
    {
        return Prescription::class;
    }
}
