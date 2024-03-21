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
        $doctors = $this->doctorService->getAllWithAppointments();
        foreach ($doctors as $doctor) {
            $doctor['type'] = $doctor->service->type;
        }

        $appointments = [];
        foreach ($doctors as $doctor) {
            $appointments[$doctor['id']] = $doctor->appointments->sortBy('start_time');
        }

        $bookedAppointments = [];
        foreach ($appointments as $key => $appointment) {
            foreach ($appointment as $val) {
                $bookedAppointments[$key][$val['date']][] = $val;
            }
        }

        return [
            'services' => $services,
            'doctors' => $doctors,
            'appointments' => $appointments,
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
