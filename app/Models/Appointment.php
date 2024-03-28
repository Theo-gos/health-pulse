<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Appointment extends Pivot
{
    use HasFactory;

    protected $table = 'appointments';

    protected $fillable = [
        'doctor_id',
        'patient_id',
        'date',
        'start_time',
        'end_time',
    ];

    protected $attributes = [
        'doctor_id' => '1',
        'patient_id' => '1',
        'date' => '2024-03-22',
        'start_time' => '08:00:00',
        'end_time' => '09:00:00',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}
