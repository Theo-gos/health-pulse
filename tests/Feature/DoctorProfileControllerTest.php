<?php

namespace Tests\Feature;

use App\Models\Doctor;
use Database\Seeders\TestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DoctorProfileControllerTest extends TestCase
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

    public function testIndex(): void
    {
        $response = $this->get(route('doctor.profile'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/DoctorProfile')
        );
    }
}
