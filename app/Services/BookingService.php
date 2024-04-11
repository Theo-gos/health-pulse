<?php

namespace App\Services;

use App\Enums\CurrentTimeZone;
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

    public function storeAppointment($patient_id, $data)
    {
        date_default_timezone_set(CurrentTimeZone::TIMEZONE);

        if (strtotime($data['date']) < strtotime(date('Y-m-d'))) {
            return [
                'message' => 'Invalid date selected',
                'type' => 'error',
            ];
        } elseif (strtotime($data['date']) == strtotime(date('Y-m-d'))) {
            if (
                strtotime($data['time']['start_time']) < strtotime(date('H:i:s')) ||
                strtotime('-30 minutes', strtotime($data['time']['start_time'])) <= strtotime(date('H:i:s'))
            ) {
                dd('Invalid time selected');

                return [
                    'message' => 'Invalid time selected',
                    'type' => 'error',
                ];
            }
        }

        $nextBookedAppointment = $this->appointmentService->getNextBookedAppointmentFromHour($data['time']['start_time'], $data['date'], $data['doctor'], null)->all();

        if ($nextBookedAppointment && strtotime($data['time']['start_time']) == strtotime($nextBookedAppointment[0]->start_time)) {
            return [
                'message' => 'Appointment Is Already Booked!',
                'type' => 'error',
            ];
        } else {
            $appointment = $this->appointmentService->store([
                'doctor_id' => $data['doctor'],
                'patient_id' => $patient_id,
                'date' => $data['date'],
                'start_time' => $data['time']['start_time'],
                'end_time' => $data['time']['end_time'],
            ]);

            return [
                'message' => 'Booked appointment successfully!',
                'type' => 'success',
                'appointment' => $appointment,
            ];
        }
    }
}
