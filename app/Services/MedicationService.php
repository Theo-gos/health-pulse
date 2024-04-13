<?php

namespace App\Services;

use App\Models\Medication;

class MedicationService extends BaseService
{
    public function getModel()
    {
        return Medication::class;
    }

    public function getAll()
    {
        return $this->model->all();
    }

    public function getByMedicationId($id)
    {
        return $this->model->where('id', $id)->get();
    }
}
