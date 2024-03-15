<?php

namespace Database\Factories;

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
        return [
            //
            'date' => fake()->date(),
            'icd_code' => 'I70.231',
            'icd_name' => 'Atherosclerosis of native arteries of right leg with ulceration of thigh',
        ];
    }
}
