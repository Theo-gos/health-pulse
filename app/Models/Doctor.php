<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Doctor extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'phone',
        'email',
        'password',
        'sex',
        'age',
        'service_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    public function appointed_patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class, 'appointments')
            ->using(Appointment::class)
            ->as('appointments')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'start_time', 'end_time')
            ->orderByPivot('date', 'asc')
            ->orderByPivot('start_time', 'asc');
    }

    public function diagnosed_patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class, 'diagnoses')
            ->using(Diagnosis::class)
            ->as('diagnoses')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'icd_code', 'icd_name', 'severity', 'color')
            ->orderByPivot('date', 'asc');
    }

    public function prescribed_patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class, 'prescriptions')
            ->using(Diagnosis::class)
            ->as('prescriptions')
            ->withPivot('id', 'doctor_id', 'patient_id', 'date', 'medication_name', 'dose', 'pill_per_day', 'recommendation')
            ->orderByPivot('date', 'asc');
    }

    public function tested_patients(): BelongsToMany
    {
        return $this->belongsToMany(Patient::class)->using(Test::class);
    }
}
