<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class PatientFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'date_of_birth' => fake()->dateTimeInInterval('-50 years', '-20 years'),
            'age' => fake()->numberBetween(25, 50),
            'last_visit' => fake()->dateTimeInInterval('-3 months', '-1 weeks'),
            'type' => 'Cardiologist',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
