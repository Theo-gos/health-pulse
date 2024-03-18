<?php

namespace App\Services;

use App\Models\Doctor;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoctorService
{
    public function getAllDoctors()
    {
        return Doctor::select('doctors.id', 'service_id', 'doctors.name', 'avatar', 'services.type')
            ->join('services', 'doctors.service_id', '=', 'services.id')
            ->get();
    }

    public function getDoctorById(string $id)
    {
        return Doctor::findOrFail($id);
    }
}
