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

    public function getAllAppointedPatientsIdByDoctorId($doctor_id)
    {
        $doctor = $this->model
            ->where('id', $doctor_id)
            ->with('appointed_patients')
            ->firstOrFail();

        $patientsList = $doctor->appointed_patients->pluck('id')->toArray();

        return array_values(array_unique($patientsList));
    }

    public function getAllWithAppointedPatients()
    {
        return $this->model
            ->with(['appointed_patients', 'service'])
            ->get();
    }
}
