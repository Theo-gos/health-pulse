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
        return $this->model->all();
    }

    public function getByIcdCode($icdCode)
    {
        return $this->model->where('icd_code', $icdCode)->get();
    }
}
