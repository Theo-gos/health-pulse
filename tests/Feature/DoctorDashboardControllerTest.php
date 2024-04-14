<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Schedule;
use Database\Seeders\TestSeeder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DoctorDashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $doctor;

    protected $appointments;

    protected $schedules;

    protected $diagnoses;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(TestSeeder::class);

        $this->doctor = Doctor::factory()->state(['id' => 1])->create();

        $this->appointments = \App\Models\Appointment::factory()
            ->count(4)
            ->state([
                'doctor_id' => 1,
            ])
            ->create()
            ->toArray();

        $this->schedules = \App\Models\Schedule::factory()
            ->count(4)
            ->state(['doctor_id' => 1])
            ->create();

        $this->diagnoses = \App\Models\Diagnosis::factory()
            ->count(1)
            ->state(['doctor_id' => 1])
            ->create();

        $this->actingAs($this->doctor);
    }

    public function test_the_application_returns_a_successful_response(): void
    {
        $appointmentList = array_map(function ($appointment) {
            return [
                'id' => $appointment['id'],
                'doctor_id' => $appointment['doctor_id'],
                'patient_id' => $appointment['patient_id'],
                'date' => $appointment['date'],
                'start_time' => $appointment['start_time'],
                'end_time' => $appointment['end_time'],
                'patient' => Patient::find($appointment['patient_id'])->toArray(),
                'status' => 'active',
            ];
        }, $this->appointments);

        $schedulesList = [];
        foreach ($this->schedules as $schedule) {
            $schedulesList[$schedule['date']][] = $schedule->only('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time');
        }

        $diagnosis = $this->diagnoses->all()[0];
        $icd = $diagnosis->all()[0]->icd;

        $diagnosis_test = [
            [
                'patient_id' => $diagnosis->patient_id,
                'icd_code' => $icd->icd_code,
                'severity' => $icd->severity,
                'color' => $icd->color,
                'latest_date' => $diagnosis->date,
            ],
        ];

        $illness_test = [
            [
                'icd_code' => $icd->icd_code,
                'icd_name' => $icd->icd_name,
                'color' => $icd->color,
                'count' => 1,
            ],
        ];

        $malePatientStatistic = [
            '14-17' => '0',
            '18-24' => '1',
            '25-34' => '0',
            '35-44' => '0',
            '45-54' => '0',
            '55-64' => '0',
            '65-74' => '0',
            '75-90' => '0',
        ];

        $femalePatientStatistic = [
            '14-17' => '0',
            '18-24' => '0',
            '25-34' => '0',
            '35-44' => '0',
            '45-54' => '0',
            '55-64' => '0',
            '65-74' => '0',
            '75-90' => '0',
        ];

        $response = $this->get(route('doctor.dashboard'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/Dashboard')
                ->where('appointments', $appointmentList)
                ->where('schedules', $schedulesList)
                ->where('diagnosisStatistic', $diagnosis_test)
                ->where('commonIllnessStatistic', $illness_test)
                ->where('malePatientStatistic', $malePatientStatistic)
                ->where('femalePatientStatistic', $femalePatientStatistic)
        );
    }

    public function testGetAppointmentByDate(): void
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $current = [];

        $appointmentList = array_map(function ($appointment) use (&$current) {
            if ($appointment['start_time'] < date('H:i:s') && $appointment['end_time'] > date('H:i:s')) {
                array_push(
                    $current,
                    Appointment::select('id', 'doctor_id', 'date', 'patient_id', 'start_time', 'end_time', 'status')
                        ->with('patient')
                        ->where('id', $appointment['id'])
                        ->where('status', '!=', 'canceled')
                        ->get()[0]
                );
            }

            return [
                'id' => $appointment['id'],
                'doctor_id' => $appointment['doctor_id'],
                'patient_id' => $appointment['patient_id'],
                'date' => $appointment['date'],
                'start_time' => $appointment['start_time'],
                'end_time' => $appointment['end_time'],
                'patient' => Patient::find($appointment['patient_id'])->toArray(),
                'status' => $appointment['status'],
            ];
        }, $this->appointments);

        $currentList = Collection::make($current);

        $response = $this->get(route('doctor.dashboard.appointment', ['date' => date('Y-m-d')]));

        $response->assertRedirect();
        $response->assertSessionHas(
            'appointment',
            [
                'list' => $appointmentList,
                'current' => $currentList,
            ]
        );
    }

    public function testGetScheduleByDates(): void
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        $schedulesList = [];
        foreach ($this->schedules as $schedule) {
            $schedulesList[$schedule['date']][] = Schedule::select('doctor_id', 'id', 'task', 'location', 'date', 'start_time', 'end_time')
                ->where('id', $schedule->id)
                ->get()[0];
        }

        $response = $this->get(route('doctor.dashboard.schedule', [
            'start_date' => '2024-04-01',
            'end_date' => '2024-04-30',
        ]));

        $response->assertRedirect();
        $response->assertSessionHas(
            'schedule',
            [
                'list' => $schedulesList,
            ]
        );
    }
}
