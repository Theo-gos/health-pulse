<?php

namespace Tests\Feature;

use App\Models\Patient;
use Database\Seeders\TestSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PatientControllerTest extends TestCase
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
    }

    public function testLogin(): void
    {
        $patient = Patient::find(1);
        $response = $this->post(route('patient.login'), [
            'email' => $patient->email,
            'password' => 'password',
        ]);

        $response->assertRedirect();
    }

    public function testRegister(): void
    {
        $response = $this->post(route('patient.register'), [
            'address' => '63835 Obie Extension Reichertland, VT 81218',
            'phone' => '012-345-6789',
            'email' => 'patient2@test.com',
            'password' => 'password',
            'confirm_password' => 'password',
            'dob' => '1996-11-15',
            'gender' => 'M',
            'first_name' => 'Patient',
            'last_name' => 'Patient',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas(
            'message',
            [
                'message' => 'Registered successfully',
                'type' => 'success',
            ]
        );
    }
}
