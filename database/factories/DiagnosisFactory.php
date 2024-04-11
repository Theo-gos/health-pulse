<?php

namespace Database\Factories;

use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Diagnosis>
 */
class DiagnosisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');
        $faker = new Faker();

        return [
            //
            'doctor_id' => 71,
            'patient_id' => 1,
            'icd_code' => 'J00',
            'date' => date('Y-m-d'),
        ];
    }
}
