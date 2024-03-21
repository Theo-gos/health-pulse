<?php

namespace App\Services;

use App\Models\Doctor;

class DoctorService extends BaseService
{
    public function getModel()
    {
        return Doctor::class;
    }

    public function getAll()
    {
        return $this->model->select('doctors.id', 'service_id', 'doctors.name', 'avatar', 'services.type')
            ->join('services', 'doctors.service_id', '=', 'services.id')
            ->get();
    }

    public function getAllWithAppointments()
    {
        return $this->model
            ->with(['appointments', 'service'])
            ->get();
    }
}
