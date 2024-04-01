<?php

namespace Database\Factories;

use App\Enums\GenderType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

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
        $gender = fake()->randomElement(['male', 'female']);
        $sex = $gender === 'male' ? GenderType::MALE : GenderType::FEMALE;

        return [
            'name' => fake()->name($gender),
            'google_id' => null,
            'address' => fake()->address(),
            'phone' => fake()->phoneNumber(),
            'password' => static::$password ??= Hash::make('password'),
            'email' => fake()->email(),
            'date_of_birth' => fake()->date('Y-m-d'),
            'sex' => $sex,
            'age' => fake()->numberBetween(13, 90),
            'last_visit' => '2016-03-29',
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
