<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestSeeder extends Seeder
{
    public function run(): void
    {
        $services = \App\Models\Service::factory()
            ->count(7)
            ->state(new Sequence(
                [
                    'id' => 1,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/general_care.png?v=1',
                    'name' => 'General Care',
                    'type' => 'general',
                    'price' => '400.000',
                    'duration' => '1 hour',
                ],
                [
                    'id' => 2,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/dentistry.png?v=1',
                    'name' => 'Dental Care',
                    'type' => 'dentist',
                    'price' => '400.000',
                    'duration' => '1 hour',
                ],
                [
                    'id' => 3,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/eye_care.png?v=1',
                    'name' => 'Eye Care',
                    'type' => 'eye',
                    'price' => '500.000',
                    'duration' => '30 minutes',
                ],
                [
                    'id' => 4,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/ear_nose_throat.png?v=1',
                    'name' => 'Ear Nose Throat',
                    'type' => 'ENT',
                    'price' => '450.000',
                    'duration' => '20 minutes',
                ],
                [
                    'id' => 5,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/cardiology.png?v=1',
                    'name' => 'Cardiology',
                    'type' => 'cardiologist',
                    'price' => '500.000',
                    'duration' => '1 hour',
                ],
                [
                    'id' => 6,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/gastroenterology.png?v=1',
                    'name' => 'Gastroenterology',
                    'type' => 'gastroenterologist',
                    'price' => '500.000',
                    'duration' => '30 minutes',
                ],
                [
                    'id' => 7,
                    'image' => 'https://cdn.jiohealth.com/jio-website/home-page/jio-website-v2.2/assets/images/care-service-preview/neurology.png?v=1',
                    'name' => 'Neurology',
                    'type' => 'neurologist',
                    'price' => '500.000',
                    'duration' => '1 hour',
                ],
            ))
            ->create();

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

        \App\Models\Patient::factory()
            ->count(1)
            ->state([
                'id' => 1,
                'address' => '63835 Obie Extension Reichertland, VT 81218',
                'avatar' => 'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
                'phone' => '012-345-6789',
                'email' => 'patient@test.com',
                'password' => Hash::make('password'),
                'age' => 20,
                'date_of_birth' => '1996-11-15',
                'last_visit' => '2016-03-29',
                'sex' => 'M',
                'name' => fake()->name('male'),
            ])
            ->hasAllergies(1)
            ->create();
    }
}
