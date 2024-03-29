<?php

namespace App\Services;

use App\Models\Diagnosis;

class DiagnosisService extends BaseService
{
    public function getModel()
    {
        return Diagnosis::class;
    }

    public function insertDiagnoses($data)
    {
        $this->model->insert($data);

        return $data;
    }
}
