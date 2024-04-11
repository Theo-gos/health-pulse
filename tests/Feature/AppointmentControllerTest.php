<?php

namespace Tests\Feature;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Icd;
use App\Models\Patient;
use Database\Seeders\TestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AppointmentControllerTest extends TestCase
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

    public function testAppointmentIndex(): void
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $appointmentList = [];

        foreach ($this->appointments as $appointment) {
            $appointmentFields = $appointment;
            $appointmentFields['patient'] = Patient::find($appointment['patient_id'])->toArray();
            $appointmentList[date('l', strtotime($appointment['date']))][] = $appointmentFields;
        }

        $response = $this->get(route('doctor.appointments'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/Appointments')
                ->where('appointments', $appointmentList)
        );
    }

    public function testShowAppointmentNote()
    {
        $icd = Icd::all();
        $appointment = Appointment::find($this->appointments[0]['id']);

        $response = $this->get(route('appointment.note', ['appointment' => $this->appointments[0]['id']]));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/AppointmentNote')
                ->where('appointment', $appointment)
                ->where('icd', $icd)
                ->where('note', [])
        );
    }

    public function testAppointmentShow()
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $appointmentList = [];

        foreach ($this->appointments as $appointment) {
            $appointmentList[date('l', strtotime($appointment['date']))][] = Appointment::select('id', 'doctor_id', 'date', 'patient_id', 'start_time', 'end_time')
                ->with('patient')
                ->where('id', $appointment['id'])
                ->get()[0];
        }

        $response = $this->get(route('appointment.show', [
            'date_start' => '2024-04-08',
            'date_end' => '2024-04-14',
        ]));

        $response->assertRedirect();
        $response->assertSessionHas(
            'appointment',
            [
                'list' => $appointmentList,
            ]
        );
    }
}
