<?php

namespace App\Services;

use App\Models\Appointment;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Auth;

class AppointmentService extends BaseService
{
    private $appointmentNoteService;

    private $prescriptionService;

    private $diagnosisService;

    public function __construct(
        AppointmentNoteService $appointmentNoteService,
        PrescriptionService $prescriptionService,
        DiagnosisService $diagnosisService
    ) {
        parent::__construct();
        $this->appointmentNoteService = $appointmentNoteService;
        $this->prescriptionService = $prescriptionService;
        $this->diagnosisService = $diagnosisService;
    }

    public function getModel()
    {
        return Appointment::class;
    }

    protected function roleCheck(?int $doctor_id, ?int $patient_id)
    {
        $query_string = 'doctor_id';
        $query_param = $doctor_id;
        if ($patient_id) {
            $query_string = 'patient_id';
            $query_param = $patient_id;
        }

        return [
            'query_string' => $query_string,
            'query_param' => $query_param,
        ];
    }

    // Get all appointments between two given dates
    public function getAllBetweenDates(string $date_start, string $date_end, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointments = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('id', 'doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->havingBetween('date', [$date_start, $date_end])
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->with('patient')
            ->get();

        $appointmentList = [];

        foreach ($appointments as $appointment) {
            $appointmentList[date('l', strtotime($appointment['date']))][] = $appointment;
        }

        return $appointmentList;
    }

    // Get all appointments of a single day
    public function getAllByDate(string $date, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointments = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('id', 'doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->where('date', $date)
            ->orderBy('start_time', 'asc')
            ->with('patient')
            ->get();

        return $appointments;
    }

    // Get the current ongoing appointment of the day
    public function getOngoingAppointment(string $hour, string $date, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointment = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('id', 'doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->where('date', $date)
            ->where('start_time', '<', $hour)
            ->where('end_time', '>', $hour)
            ->with('patient')
            ->get();

        return $appointment;
    }

    // Get all appointments of this week
    public function getAllOfThisWeek()
    {
        $doctor_id = Auth::user()->id;
        $first_day_this_week = date('Y-m-d', strtotime('monday this week'));
        $last_day_this_week = date('Y-m-d', strtotime('sunday this week'));

        return $this->getAllBetweenDates($first_day_this_week, $last_day_this_week, $doctor_id, null);
    }

    public function getNextBookedAppointmentFromHour(string $hour, string $date, ?int $doctor_id, ?int $patient_id)
    {
        $query_info = $this->roleCheck($doctor_id, $patient_id);

        $appointment = $this->model->where($query_info['query_string'], $query_info['query_param'])
            ->select('id', 'doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
            ->where('date', $date)
            ->where('start_time', '>=', $hour)
            ->orderBy('start_time', 'asc')
            ->limit(1)
            ->with('patient')
            ->get();

        return $appointment;
    }

    public function getAllByDoctorId(int $doctor_id)
    {
        return $this->model->where('doctor_id', $doctor_id)
            ->orderBy('date')
            ->orderBy('start_time')
            ->get();
    }

    public function getAppointmentNoteById(int $appointment_id)
    {
        return $this->appointmentNoteService->getByAppointmentId($appointment_id);
    }

    public function getAllToday()
    {
        $today = date('Y-m-d');

        $appointments = $this->model->where('date', $today)
            ->orderBy('start_time', 'asc')
            ->with(['patient', 'doctor'])
            ->get();

        return $appointments->all();
    }

    public function storeAppointmentNote($data)
    {
        $payload = $data;

        $urlList = array_map(function ($file) {
            $url = Cloudinary::upload($file->getRealPath())->getSecurePath();

            return $url;
        }, $data['files']);
        unset($payload['files']);
        $payload['image_url'] = $urlList;

        $payload['test_results'] = $data['tests'];

        return $this->appointmentNoteService->store($payload);
    }

    public function storePrescription($data)
    {
        $payload = array_map(function ($prescription) {
            $prescription['created_at'] = date('Y-m-d H:i:s');
            $prescription['updated_at'] = date('Y-m-d H:i:s');

            return $prescription;
        }, $data);

        return $this->prescriptionService->insert($payload);
    }

    public function storeDiagnoses(int $doctor_id, int $patient_id, $data)
    {
        $payload = array_map(function ($diagnosis) use ($doctor_id, $patient_id) {
            $diagnosis['doctor_id'] = $doctor_id;
            $diagnosis['patient_id'] = $patient_id;
            $diagnosis['created_at'] = date('Y-m-d H:i:s');
            $diagnosis['updated_at'] = date('Y-m-d H:i:s');

            return $diagnosis;
        }, $data);

        return $this->diagnosisService->insert($payload);
    }
}
