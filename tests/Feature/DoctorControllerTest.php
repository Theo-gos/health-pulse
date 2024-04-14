<?php

namespace Tests\Feature;

use App\Models\Doctor;
use Database\Seeders\TestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DoctorControllerTest extends TestCase
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

        $this->doctor = Doctor::factory()->state(['id' => 1, 'email' => 'doctor@example.com'])->create();

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

    public function testShowLoginPage(): void
    {
        $response = $this->get(route('doctor.login.create'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/Login')
        );
    }

    public function testShowNotification(): void
    {
        $response = $this->get(route('doctor.notifications'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Auth/Doctor/Notification')
                ->where('notifications', $this->doctor->notifications->all())
                ->where('unreadNotifications', $this->doctor->unreadNotifications->all())
        );
    }

    public function testMarkAllNotificationsAsRead(): void
    {
        $response = $this->get(route('doctor.notifications.all-read'));

        $response->assertRedirect();
    }

    public function testLogin(): void
    {
        $response = $this->post(route('login'), [
            'email' => $this->doctor->email,
            'password' => 'password',
        ]);

        $response->assertRedirect();
    }

    public function testLogout(): void
    {
        $response = $this->post(route('logout'));

        $response->assertRedirect();
    }
}
