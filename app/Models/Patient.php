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
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'created_at',
        'updated_at',
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

    public function appointed_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'appointments')
            ->using(Appointment::class)
            ->as('appointments')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'start_time', 'end_time', 'status')
            ->orderByPivot('date', 'desc')
            ->orderByPivot('start_time', 'asc')
            ->limit(20);
    }

    public function diagnose_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'diagnoses')
            ->using(Diagnosis::class)
            ->as('diagnoses')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'icd_code')
            ->orderByPivot('date', 'desc');
    }

    public function prescribe_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'prescriptions')
            ->using(Prescription::class)
            ->as('prescriptions')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'medication_name', 'dose', 'pill_per_day', 'recommendation')
            ->orderByPivot('date', 'desc');
    }

    public function test_doctors(): BelongsToMany
    {
        return $this->belongsToMany(Doctor::class, 'tests')
            ->using(Test::class)
            ->as('test_results')
            ->withPivot('id', 'doctor_id', 'patient_id', 'name', 'date', 'result_url')
            ->orderByPivot('date', 'desc');
    }
}
