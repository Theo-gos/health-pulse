<?php

namespace App\Services;

use App\Enums\CurrentTimeZone;
use App\Models\Doctor;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

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

    public function getAllTodayAppointedPatientsIdByDoctorId($doctor_id)
    {
        date_default_timezone_set(CurrentTimeZone::TIMEZONE);

        $doctor = $this->model
            ->where('id', $doctor_id)
            ->with('appointedPatients')
            ->firstOrFail();

        $patientsList = [];

        foreach ($doctor->appointedPatients as $appointed_patient) {
            if (strtotime($appointed_patient->appointments->date) === strtotime(date('Y-m-d'))
                && $appointed_patient->appointments->status !== 'canceled'
            ) {
                array_push($patientsList, $appointed_patient->id);
            }
        }

        return array_values(array_unique($patientsList));
    }

    public function getAllWithAppointedPatients()
    {
        return $this->model
            ->with(['appointedPatients', 'service'])
            ->get();
    }

    public function updateAvatarForDoctor(Doctor $doctor, $data)
    {
        $url = Cloudinary::upload($data['avatar']->getRealPath())->getSecurePath();

        $data['avatar'] = $url;

        return $doctor->update($data);
    }

    public function getAllDoctorNotifications($doctor)
    {
        $notifications = $doctor->notifications->all();
        $unreadNotifications = $doctor->unreadNotifications->all();

        return [
            'notifications' => $notifications,
            'unreadNotifications' => $unreadNotifications,
        ];
    }

    public function markNotificationAsRead($notification)
    {
        $notification->update(['read_at' => now()]);
    }

    public function markAllNotificationsAsRead($doctor_id)
    {
        $doctor = $this->model->findOrFail($doctor_id);
        $doctor->unreadNotifications->markAsRead();
    }
}
