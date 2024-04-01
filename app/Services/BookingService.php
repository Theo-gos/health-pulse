<?php

namespace App\Services;

use App\Models\Service;

class BookingService extends BaseService
{
    private $doctorService;

    private $appointmentService;

    public function __construct(DoctorService $doctorService, AppointmentService $appointmentService)
    {
        parent::__construct();
        $this->doctorService = $doctorService;
        $this->appointmentService = $appointmentService;
    }

    public function getModel()
    {
        return Service::class;
    }

    public function getBookingData()
    {
        $today = date('Y-m-d', strtotime('today'));

        $services = $this->model->all();
        $doctors = $this->doctorService->getAllWithAppointedPatients();
        foreach ($doctors as $doctor) {
            $doctor['type'] = $doctor->service->type;
        }

        $bookedAppointments = [];
        foreach ($doctors as $doctor) {
            foreach ($doctor->appointed_patients as $patient) {
                $bookedAppointments[$doctor['id']][$patient->appointments->date][] = $patient->appointments;
            }
        }

        return [
            'services' => $services,
            'doctors' => $doctors,
            'bookedAppointments' => $bookedAppointments,
        ];
    }

    public function store($data)
    {
        return $this->appointmentService->store([
            'doctor_id' => $data['doctor'],
            'patient_name' => 'Theo Lee',
            'date' => $data['date'],
            'start_time' => $data['time']['start_time'],
            'end_time' => $data['time']['end_time'],
        ]);
    }
}
