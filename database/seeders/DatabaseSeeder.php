<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Service::factory()
            ->count(7)
            ->state(new Sequence(
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/general_care.png?v=1',
                    'name' => 'General Care',
                    'type' => 'general',
                    'price' => '400.000',
                    'duration' => '1 hour',
                ],
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/dentistry.png?v=1',
                    'name' => 'Dental Care',
                    'type' => 'dentist',
                    'price' => '400.000',
                    'duration' => '1 hour',
                ],
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/eye_care.png?v=1',
                    'name' => 'Eye Care',
                    'type' => 'eye',
                    'price' => '500.000',
                    'duration' => '30 minutes',
                ],
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/ear_nose_throat.png?v=1',
                    'name' => 'Ear Nose Throat',
                    'type' => 'ENT',
                    'price' => '450.000',
                    'duration' => '20 minutes',
                ],
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/cardiology.png?v=1',
                    'name' => 'Cardiology',
                    'type' => 'cardiologist',
                    'price' => '500.000',
                    'duration' => '1 hour',
                ],
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/gastroenterology.png?v=1',
                    'name' => 'Gastroenterology',
                    'type' => 'gastroenterologist',
                    'price' => '500.000',
                    'duration' => '30 minutes',
                ],
                [
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/neurology.png?v=1',
                    'name' => 'Neurology',
                    'type' => 'neurologist',
                    'price' => '500.000',
                    'duration' => '1 hour',
                ],
            ))
            ->hasDoctors(10)
            ->create();

        \App\Models\Medication::factory()
            ->count(5)
            ->state(new Sequence(
                [
                    'medication_name' => 'Antenolol',
                    'dose' => '200mg',
                    'type' => 'tablet',
                ],
                [
                    'medication_name' => 'Aciclovir',
                    'dose' => '100mg',
                    'type' => 'capsule',
                ],
                [
                    'medication_name' => 'Alogliptin',
                    'dose' => '200mg',
                    'type' => 'capsule',
                ],
                [
                    'medication_name' => 'Haloperidol',
                    'dose' => '100ml',
                    'type' => 'liquid',
                ],
                [
                    'medication_name' => 'Tramadol',
                    'dose' => '500mg',
                    'type' => 'tablet',
                ],
            ))
            ->create();

        \App\Models\Doctor::factory()
            ->count(1)
            ->state(new Sequence(
                [
                    'service_id' => 1,
                    'avatar' => 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
                    'phone' => '331-405-7420',
                    'email' => 'doctor71@example.com',
                    'password' => Hash::make('password'),
                    'age' => fake()->numberBetween(25, 50),
                    'sex' => 'M',
                    'name' => fake()->name('male'),
                ],
            ))
            ->create();

        \App\Models\Patient::factory()
            ->count(1)
            ->state(new Sequence(
                [
                    'address' => '63835 Obie Extension Reichertland, VT 81218',
                    'avatar' => 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
                    'phone' => '012-345-6789',
                    'email' => 'patient@example.com',
                    'password' => Hash::make('password'),
                    'age' => fake()->numberBetween(25, 50),
                    'date_of_birth' => '1996-11-15',
                    'last_visit' => '2016-03-29',
                    'sex' => 'M',
                    'name' => fake()->name('male'),
                ],
            ))
            ->hasAllergies(1)
            ->create();

        \App\Models\Patient::factory(50)->create();
        \App\Models\Appointment::factory(1)->create();
        \App\Models\Schedule::factory(1)->create();
        \App\Models\Icd::factory()
            ->count(5)
            ->state(new Sequence(
                [
                    'icd_code' => 'I50.9',
                    'icd_name' => 'Heart failure',
                    'severity' => 'Critical',
                    'color' => '#DE5031',
                ],
                [
                    'icd_code' => 'I70.231',
                    'icd_name' => 'Atherosclerosis',
                    'severity' => 'Stable',
                    'color' => '#1366DE',
                ],
                [
                    'icd_code' => 'J00',
                    'icd_name' => 'Common cold',
                    'severity' => 'Stable',
                    'color' => '#1366DE',
                ],
                [
                    'icd_code' => 'K59.1',
                    'icd_name' => 'Functional diarrhea',
                    'severity' => 'Fair',
                    'color' => '#AF8CFA',
                ],
                [
                    'icd_code' => 'T78.2',
                    'icd_name' => 'Anaphylactic shock',
                    'severity' => 'Serious',
                    'color' => '#F09E45',
                ],
            ))
            ->create();
        \App\Models\Prescription::factory(1)->create();
        \App\Models\Diagnosis::factory(1)->create();
    }
}
