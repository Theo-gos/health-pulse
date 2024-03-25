<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Patient extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'google_id',
        'address',
        'phone',
        'email',
        'date_of_birth',
        'sex',
        'age',
        'last_visit',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function allergies(): HasMany
    {
        return $this->hasMany(Allergy::class);
    }

    public function insurances(): HasMany
    {
        return $this->hasMany(Insurance::class);
    }

    public function appointed_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'appointments')
            ->using(Appointment::class)
            ->as('appointments')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'start_time', 'end_time')
            ->orderByPivot('date', 'asc')
            ->orderByPivot('start_time', 'asc');
    }

    public function diagnose_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'diagnoses')
            ->using(Diagnosis::class)
            ->as('diagnoses')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'icd_code', 'icd_name', 'severity', 'color')
            ->orderByPivot('date', 'asc');
    }

    public function prescribe_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'prescriptions')
            ->using(Prescription::class)
            ->as('prescriptions')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'medication_name', 'dose', 'pill_per_day', 'duration')
            ->orderByPivot('date', 'asc');
    }

    public function test_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class)->using(Test::class);
    }
}
