<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'doctor_id' => 71,
            'patient_id' => 1,
            'date' => '2020-03-22',
            'medication_id' => 1,
            'amount' => '1 tablet',
            'recommendation' => '1 tablet every morning for 10 days',
        ];
    }
}
